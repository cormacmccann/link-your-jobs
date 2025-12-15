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
  ArrowLeft, Save, Send, Eye, FileSignature
} from "lucide-react";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

const contractTemplates = [
  {
    id: "service",
    name: "Service Agreement",
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of {{date}} by and between:

Provider: {{provider_name}}
Client: {{client_name}}

1. SERVICES
The Provider agrees to provide the following services:
{{services_description}}

2. COMPENSATION
Client agrees to pay Provider the sum of {{amount}} for the services described above.

3. TERM
This Agreement shall commence on {{start_date}} and continue until {{end_date}}.

4. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of any proprietary information.

5. TERMINATION
Either party may terminate this Agreement with 30 days written notice.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

Client Signature: _________________________
Date: _________________________`
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is made effective as of {{date}}.

BETWEEN:
Disclosing Party: {{provider_name}}
Receiving Party: {{client_name}}

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information that is proprietary to the Disclosing Party.

2. OBLIGATIONS
The Receiving Party agrees to hold and maintain the Confidential Information in strict confidence.

3. TERM
This Agreement shall remain in effect for a period of {{term_years}} years.

4. RETURN OF INFORMATION
Upon termination, the Receiving Party shall return all Confidential Information.

AGREED AND ACCEPTED:

Signature: _________________________
Name: {{client_name}}
Date: _________________________`
  },
  {
    id: "blank",
    name: "Blank Contract",
    content: ""
  }
];

export default function ContractBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  
  const currentOrgId = localStorage.getItem("currentOrgId");
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    related_contact_id: searchParams.get("contact") || "",
    related_company_id: searchParams.get("company") || "",
    expires_at: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    signature_type: "typed",
  });

  // Fetch contacts
  const { data: contacts } = useQuery({
    queryKey: ["contacts", currentOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("contacts")
        .select("id, first_name, last_name, email")
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

  // Fetch existing contract if editing
  const { data: existingContract } = useQuery({
    queryKey: ["contract", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Load existing data
  useEffect(() => {
    if (existingContract) {
      setFormData({
        title: existingContract.title,
        content: existingContract.content || "",
        related_contact_id: existingContract.related_contact_id || "",
        related_company_id: existingContract.related_company_id || "",
        expires_at: existingContract.expires_at 
          ? format(new Date(existingContract.expires_at), "yyyy-MM-dd")
          : format(addDays(new Date(), 30), "yyyy-MM-dd"),
        signature_type: existingContract.signature_type || "typed",
      });
    }
  }, [existingContract]);

  // Generate contract number
  const generateContractNumber = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CON-${year}-${random}`;
  };

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = contractTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({ ...prev, content: template.content }));
      if (!formData.title && template.name !== "Blank Contract") {
        setFormData(prev => ({ ...prev, title: template.name }));
      }
    }
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (status: string = "draft") => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !currentOrgId) throw new Error("Not authenticated");

      const selectedContact = contacts?.find(c => c.id === formData.related_contact_id);

      const contractData = {
        organization_id: currentOrgId,
        title: formData.title,
        content: formData.content,
        related_contact_id: formData.related_contact_id || null,
        related_company_id: formData.related_company_id || null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        signature_type: formData.signature_type,
        signer_email: selectedContact?.email || null,
        status,
        created_by: user.id,
        ...(status === "sent" ? { sent_at: new Date().toISOString() } : {}),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("contracts")
          .update(contractData)
          .eq("id", id);
        if (error) throw error;
        return id;
      } else {
        const { data, error } = await supabase
          .from("contracts")
          .insert({ ...contractData, contract_number: generateContractNumber() })
          .select()
          .single();
        if (error) throw error;
        return data.id;
      }
    },
    onSuccess: (contractId, status) => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success(status === "sent" ? "Contract sent!" : "Contract saved!");
      navigate("/crm/contracts");
    },
    onError: (error) => {
      toast.error("Failed to save contract");
      console.error(error);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/crm/contracts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{isEditing ? "Edit Contract" : "New Contract"}</h1>
            {existingContract?.contract_number && (
              <Badge variant="outline" className="mt-1">{existingContract.contract_number}</Badge>
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
            Send for Signature
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Template Selection */}
        {!isEditing && (
          <Card className="p-6">
            <h2 className="font-medium mb-4">Start from Template</h2>
            <div className="grid grid-cols-3 gap-3">
              {contractTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-1"
                  onClick={() => applyTemplate(template.id)}
                >
                  <FileSignature className="h-5 w-5" />
                  <span className="text-sm">{template.name}</span>
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Basic Info */}
        <Card className="p-6">
          <h2 className="font-medium mb-4">Contract Details</h2>
          <div className="grid gap-4">
            <div>
              <Label>Contract Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Service Agreement - Website Project"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact (Signer)</Label>
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
                <Label>Expires</Label>
                <Input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
                />
              </div>
              <div>
                <Label>Signature Type</Label>
                <Select
                  value={formData.signature_type}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, signature_type: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typed">Typed Name</SelectItem>
                    <SelectItem value="drawn">Drawn Signature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Contract Content */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Contract Content</h2>
            {id && (
              <Button variant="outline" size="sm" onClick={() => window.open(`/sign/${id}`, '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
          </div>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Enter the contract content here. Use {{variable}} placeholders that will be replaced with actual values."
            rows={20}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Available placeholders: {"{{client_name}}"}, {"{{date}}"}, {"{{amount}}"}, etc.
          </p>
        </Card>
      </div>
    </div>
  );
}
