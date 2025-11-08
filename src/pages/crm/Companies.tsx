import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Building2, Users, DollarSign, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LegacyFAB } from "@/components/crm/FloatingActionButton";
import { MobileOptimizedForm, MobileFormField, MobileFormInput, MobileFormButton } from "@/components/crm/MobileOptimizedForm";
import { cn } from "@/lib/utils";

export default function Companies() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "",
  });
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: companies, refetch } = useQuery({
    queryKey: ["companies", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const { data: companyContacts } = useQuery({
    queryKey: ["company-contacts", selectedCompany],
    queryFn: async () => {
      if (!selectedCompany) return [];
      
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("company_id", selectedCompany);

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCompany,
  });

  const { data: companyDeals } = useQuery({
    queryKey: ["company-deals", selectedCompany],
    queryFn: async () => {
      if (!selectedCompany) return [];
      
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("company_id", selectedCompany)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCompany,
  });

  const handleAddCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    // Auto-enrich company if website provided
    let enrichPromise = null;
    if (formData.website) {
      try {
        const domain = new URL(formData.website).hostname.replace('www.', '');
        enrichPromise = supabase.functions.invoke('enrich-company', {
          body: { domain, companyId: null }
        });
      } catch (e) {
        console.log('Invalid URL for enrichment');
      }
    }

    const { data: insertedCompany, error } = await supabase.from("companies").insert([{
      organization_id: currentOrgId,
      name: formData.name,
      website: formData.website || null,
      industry: formData.industry || null,
    }]).select().single();

    if (error) {
      toast.error("Failed to add company");
      console.error(error);
    } else {
      toast.success("Company added successfully");
      
      // Trigger enrichment in background
      if (enrichPromise && insertedCompany) {
        supabase.functions.invoke('enrich-company', {
          body: { 
            companyId: insertedCompany.id,
            domain: new URL(formData.website).hostname.replace('www.', '')
          }
        });
      }
      
      setIsAddDialogOpen(false);
      setFormData({ name: "", website: "", industry: "" });
      refetch();
    }
  };

  const selectedCompanyData = companies?.find(c => c.id === selectedCompany);
  const totalDealValue = companyDeals?.reduce((sum, deal) => sum + (Number(deal.value) || 0), 0) || 0;

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization to continue.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">Companies</h1>
        <p className="text-sm text-muted-foreground">Manage your business relationships</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-base">All Companies</h3>
            <div className="space-y-2">
              {companies?.map((company) => (
                <div
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all touch-manipulation animate-fade-in",
                    "hover:shadow-md active:scale-[0.98]",
                    selectedCompany === company.id 
                      ? "border-primary bg-primary/10 shadow-md" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate text-base">{company.name}</h4>
                      {company.industry && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{company.industry}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!companies || companies.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">No companies yet</p>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCompanyData ? (
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">{selectedCompanyData.name}</h2>
                    {selectedCompanyData.industry && (
                      <Badge variant="secondary" className="text-sm">{selectedCompanyData.industry}</Badge>
                    )}
                  </div>
                  {selectedCompanyData.website && (
                    <Button variant="outline" size="sm" asChild className="h-10 rounded-lg">
                      <a href={selectedCompanyData.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-5 bg-accent/50 border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contacts</p>
                        <p className="text-3xl font-bold">{companyContacts?.length || 0}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-5 bg-accent/50 border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Deal Value</p>
                        <p className="text-2xl md:text-3xl font-bold">${totalDealValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>

              <Tabs defaultValue="contacts" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="deals">Deals</TabsTrigger>
                </TabsList>

                <TabsContent value="contacts">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4 text-lg">Company Contacts</h3>
                    <div className="space-y-3">
                      {companyContacts?.map((contact) => (
                        <div key={contact.id} className="p-4 border rounded-xl hover:shadow-md transition-all touch-manipulation">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div>
                              <h4 className="font-semibold text-base">{contact.first_name} {contact.last_name}</h4>
                              {contact.title && (
                                <p className="text-sm text-muted-foreground mt-0.5">{contact.title}</p>
                              )}
                            </div>
                            <div className="text-sm space-y-0.5">
                              {contact.email && <p className="text-muted-foreground truncate">{contact.email}</p>}
                              {contact.phone && <p className="text-muted-foreground">{contact.phone}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!companyContacts || companyContacts.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-8">No contacts for this company</p>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="deals">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4 text-lg">Company Deals</h3>
                    <div className="space-y-3">
                      {companyDeals?.map((deal) => (
                        <div key={deal.id} className="p-4 border rounded-xl hover:shadow-md transition-all touch-manipulation">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2 text-base">{deal.title}</h4>
                              <Badge variant="secondary" className="capitalize text-xs">
                                {deal.stage.replace('_', ' ')}
                              </Badge>
                            </div>
                            {deal.value && (
                              <div className="text-right">
                                <p className="text-xl font-bold text-primary">${Number(deal.value).toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {(!companyDeals || companyDeals.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-8">No deals for this company</p>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Select a Company</h3>
              <p className="text-sm text-muted-foreground">Choose a company from the list to view details</p>
            </Card>
          )}
        </div>
      </div>

      <LegacyFAB
        onClick={() => setIsAddDialogOpen(true)}
        icon={<Plus className="h-6 w-6" />}
        label="New Company"
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Add New Company
            </DialogTitle>
          </DialogHeader>
          <MobileOptimizedForm onSubmit={handleAddCompany}>
            <MobileFormField label="Company Name" required>
              <MobileFormInput
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Acme Corporation"
                required
              />
            </MobileFormField>
            
            <MobileFormField label="Website">
              <div className="relative">
                <MobileFormInput
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="pr-10"
                />
                {formData.website && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2" title="AI Enrichment Active">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We'll automatically enrich company data from the website
              </p>
            </MobileFormField>

            <MobileFormField label="Industry">
              <MobileFormInput
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Technology, Finance, etc."
              />
            </MobileFormField>

            <MobileFormButton type="submit">
              <Plus className="h-5 w-5" />
              Add Company
            </MobileFormButton>
          </MobileOptimizedForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
