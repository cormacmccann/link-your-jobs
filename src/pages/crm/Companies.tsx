import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Building2, Users, DollarSign, Globe } from "lucide-react";
import { toast } from "sonner";

export default function Companies() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
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
    const formData = new FormData(e.currentTarget);

    if (!currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("companies").insert([{
      organization_id: currentOrgId,
      name: formData.get("name") as string,
      website: formData.get("website") as string || null,
      industry: formData.get("industry") as string || null,
    }]);

    if (error) {
      toast.error("Failed to add company");
      console.error(error);
    } else {
      toast.success("Company added successfully");
      setIsAddDialogOpen(false);
      refetch();
    }
  };

  const selectedCompanyData = companies?.find(c => c.id === selectedCompany);
  const totalDealValue = companyDeals?.reduce((sum, deal) => sum + (Number(deal.value) || 0), 0) || 0;

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-gobold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization to continue.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Companies</h1>
          <p className="text-muted-foreground">Manage your business relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCompany} className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" placeholder="https://example.com" />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" placeholder="e.g., Technology, Finance" />
              </div>
              <Button type="submit" className="w-full">Add Company</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">All Companies</h3>
            <div className="space-y-2">
              {companies?.map((company) => (
                <div
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedCompany === company.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{company.name}</h4>
                      {company.industry && (
                        <p className="text-xs text-muted-foreground truncate">{company.industry}</p>
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
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-gobold mb-2">{selectedCompanyData.name}</h2>
                    {selectedCompanyData.industry && (
                      <Badge variant="secondary">{selectedCompanyData.industry}</Badge>
                    )}
                  </div>
                  {selectedCompanyData.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedCompanyData.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contacts</p>
                        <p className="text-2xl font-bold">{companyContacts?.length || 0}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Deal Value</p>
                        <p className="text-2xl font-bold">${totalDealValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>

              <Tabs defaultValue="contacts" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="deals">Deals</TabsTrigger>
                </TabsList>

                <TabsContent value="contacts">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Company Contacts</h3>
                    <div className="space-y-3">
                      {companyContacts?.map((contact) => (
                        <div key={contact.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{contact.first_name} {contact.last_name}</h4>
                              {contact.title && (
                                <p className="text-sm text-muted-foreground">{contact.title}</p>
                              )}
                            </div>
                            <div className="text-right text-sm">
                              {contact.email && <p className="text-muted-foreground">{contact.email}</p>}
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
                    <h3 className="font-semibold mb-4">Company Deals</h3>
                    <div className="space-y-3">
                      {companyDeals?.map((deal) => (
                        <div key={deal.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{deal.title}</h4>
                              <Badge variant="secondary" className="capitalize">{deal.stage.replace('_', ' ')}</Badge>
                            </div>
                            {deal.value && (
                              <div className="text-right">
                                <p className="text-lg font-semibold text-green-600">${Number(deal.value).toLocaleString()}</p>
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
              <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Select a Company</h3>
              <p className="text-muted-foreground">Choose a company from the list to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
