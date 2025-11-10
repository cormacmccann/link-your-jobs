import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LineItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export function InvoiceFormDialog({ open, onOpenChange, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unit_price: 0 }
  ]);
  const { toast } = useToast();

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: orgs } = await supabase.rpc('get_user_organizations', {
        _user_id: user.id
      });

      if (!orgs || orgs.length === 0) throw new Error("No organization found");

      const orgId = orgs[0].id;

      // Generate invoice number
      const { data: invoiceNumber } = await supabase.rpc('generate_invoice_number', {
        org_id: orgId
      });

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          organization_id: orgId,
          invoice_number: invoiceNumber,
          customer_name: customerName,
          customer_email: customerEmail,
          total_amount: calculateTotal(),
          due_date: dueDate,
          notes: notes,
          status: 'draft',
          created_by: user.id,
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create line items
      const itemsToInsert = lineItems.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast({
        title: "Success!",
        description: "Invoice created successfully",
      });

      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setCustomerName("");
      setCustomerEmail("");
      setDueDate("");
      setNotes("");
      setLineItems([{ description: "", quantity: 1, unit_price: 0 }]);
    } catch (error: any) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create invoice",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Line Items</Label>
              <Button type="button" size="sm" variant="outline" onClick={addLineItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-[2fr,1fr,1fr,auto] gap-2 items-end">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    placeholder="Item description"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) => updateLineItem(index, 'unit_price', parseFloat(e.target.value))}
                    required
                  />
                </div>

                {lineItems.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeLineItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or payment terms..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Invoice'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
