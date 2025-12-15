import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Plus, Trash2, Save, Send, Eye, 
  Copy, Receipt, Calendar
} from "lucide-react";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  tax_rate: number;
}

export default function QuoteBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  
  const currentOrgId = localStorage.getItem("currentOrgId");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    related_contact_id: searchParams.get("contact") || "",
    related_company_id: searchParams.get("company") || "",
    valid_until: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    currency: "EUR",
  });
  
  const [items, setItems] = useState<QuoteItem[]>([
    { id: crypto.randomUUID(), description: "", quantity: 1, unit_price: 0, amount: 0, tax_rate: 0 }
  ]);

  // Fetch contacts
  const { data: contacts } = useQuery({
    queryKey: ["contacts", currentOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("contacts")
        .select("id, first_name, last_name")
        .eq("organization_id", currentOrgId!);
      return data || [];
    },
    enabled: !!currentOrgId,
  });

  // Fetch companies
  const { data: companies } = useQuery({
    queryKey: ["companies", currentOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("companies")
        .select("id, name")
        .eq("organization_id", currentOrgId!);
      return data || [];
    },
    enabled: !!currentOrgId,
  });

  // Fetch existing quote if editing
  const { data: existingQuote } = useQuery({
    queryKey: ["quote", id],
    queryFn: async () => {
      if (!id) return null;
      const { data: quote } = await supabase
        .from("quotes")
        .select("*")
        .eq("id", id)
        .single();
      
      const { data: quoteItems } = await supabase
        .from("quote_items")
        .select("*")
        .eq("quote_id", id)
        .order("display_order");
      
      return { quote, items: quoteItems || [] };
    },
    enabled: !!id,
  });

  // Load existing data
  useEffect(() => {
    if (existingQuote?.quote) {
      setFormData({
        title: existingQuote.quote.title,
        description: existingQuote.quote.description || "",
        related_contact_id: existingQuote.quote.related_contact_id || "",
        related_company_id: existingQuote.quote.related_company_id || "",
        valid_until: existingQuote.quote.valid_until 
          ? format(new Date(existingQuote.quote.valid_until), "yyyy-MM-dd")
          : format(addDays(new Date(), 30), "yyyy-MM-dd"),
        currency: existingQuote.quote.currency || "EUR",
      });
      if (existingQuote.items.length > 0) {
        setItems(existingQuote.items.map(item => ({
          id: item.id,
          description: item.description,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          amount: Number(item.amount),
          tax_rate: Number(item.tax_rate) || 0,
        })));
      }
    }
  }, [existingQuote]);

  // Generate quote number
  const generateQuoteNumber = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `QT-${year}-${random}`;
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = items.reduce((sum, item) => sum + (item.amount * item.tax_rate / 100), 0);
  const total = subtotal + taxAmount;

  // Update item
  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'quantity' || field === 'unit_price') {
        updated.amount = updated.quantity * updated.unit_price;
      }
      return updated;
    }));
  };

  // Add item
  const addItem = () => {
    setItems(prev => [...prev, {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unit_price: 0,
      amount: 0,
      tax_rate: 0,
    }]);
  };

  // Remove item
  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (status: string = "draft") => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !currentOrgId) throw new Error("Not authenticated");

      const quoteData = {
        organization_id: currentOrgId,
        title: formData.title,
        description: formData.description || null,
        related_contact_id: formData.related_contact_id || null,
        related_company_id: formData.related_company_id || null,
        valid_until: formData.valid_until ? new Date(formData.valid_until).toISOString() : null,
        currency: formData.currency,
        subtotal,
        tax_amount: taxAmount,
        total_amount: total,
        status,
        created_by: user.id,
        ...(status === "sent" ? { sent_at: new Date().toISOString() } : {}),
      };

      let quoteId = id;

      if (isEditing) {
        const { error } = await supabase
          .from("quotes")
          .update(quoteData)
          .eq("id", id);
        if (error) throw error;

        // Delete existing items and re-insert
        await supabase.from("quote_items").delete().eq("quote_id", id);
      } else {
        const { data, error } = await supabase
          .from("quotes")
          .insert({ ...quoteData, quote_number: generateQuoteNumber() })
          .select()
          .single();
        if (error) throw error;
        quoteId = data.id;
      }

      // Insert items
      const itemsToInsert = items.map((item, index) => ({
        quote_id: quoteId,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount,
        tax_rate: item.tax_rate,
        display_order: index,
      }));

      const { error: itemsError } = await supabase
        .from("quote_items")
        .insert(itemsToInsert);
      if (itemsError) throw itemsError;

      return quoteId;
    },
    onSuccess: (quoteId, status) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success(status === "sent" ? "Quote sent!" : "Quote saved!");
      navigate("/crm/quotes");
    },
    onError: (error) => {
      toast.error("Failed to save quote");
      console.error(error);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/crm/quotes")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{isEditing ? "Edit Quote" : "New Quote"}</h1>
            {existingQuote?.quote?.quote_number && (
              <Badge variant="outline" className="mt-1">{existingQuote.quote.quote_number}</Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => saveMutation.mutate("draft")} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => saveMutation.mutate("sent")} disabled={saveMutation.isPending}>
            <Send className="h-4 w-4 mr-2" />
            Send Quote
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Basic Info */}
        <Card className="p-6">
          <h2 className="font-medium mb-4">Quote Details</h2>
          <div className="grid gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Website Redesign Proposal"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the quote..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact</Label>
                <Select
                  value={formData.related_contact_id}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, related_contact_id: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {contacts?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.first_name} {c.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Company</Label>
                <Select
                  value={formData.related_company_id}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, related_company_id: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {companies?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valid Until</Label>
                <Input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, currency: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Line Items</h2>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-1">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items */}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) => updateItem(item.id, 'unit_price', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    value={`€${item.amount.toFixed(2)}`}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>€{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        {isEditing && existingQuote?.quote?.status === "accepted" && (
          <Card className="p-6">
            <h2 className="font-medium mb-4">Quick Actions</h2>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Receipt className="h-4 w-4" />
                Convert to Invoice
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Create Project
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
