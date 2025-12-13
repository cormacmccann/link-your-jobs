import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, Phone, Building2, Users, Globe, Plus, Sparkles, Brain, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AIEmailComposer } from "@/components/crm/AIEmailComposer";
import { ContactInsightsPanel } from "@/components/crm/ContactInsightsPanel";
import { LegacyFAB } from "@/components/crm/FloatingActionButton";
import { MobileOptimizedForm, MobileFormField, MobileFormInput, MobileFormButton } from "@/components/crm/MobileOptimizedForm";
import { cn } from "@/lib/utils";

type TabValue = "contacts" | "companies";

export default function People() {
  const [activeTab, setActiveTab] = useState<TabValue>("contacts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const [contactForm, setContactForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", title: "",
  });
  const [companyForm, setCompanyForm] = useState({
    name: "", website: "", industry: "",
  });

  const currentOrgId = localStorage.getItem("currentOrgId");

  // Contacts query
  const { data: contacts, refetch: refetchContacts } = useQuery({
    queryKey: ["contacts", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      const { data, error } = await supabase
        .from("contacts")
        .select(`*, companies (id, name), contact_scores (total_score)`)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  // Companies query
  const { data: companies, refetch: refetchCompanies } = useQuery({
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

  // Company details
  const { data: companyContacts } = useQuery({
    queryKey: ["company-contacts", selectedCompany],
    queryFn: async () => {
      if (!selectedCompany) return [];
      const { data, error } = await supabase.from("contacts").select("*").eq("company_id", selectedCompany);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedCompany,
  });

  const { data: companyDeals } = useQuery({
    queryKey: ["company-deals", selectedCompany],
    queryFn: async () => {
      if (!selectedCompany) return [];
      const { data, error } = await supabase.from("deals").select("*").eq("company_id", selectedCompany);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedCompany,
  });

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !currentOrgId) return toast.error("No organization selected");

    const { error } = await supabase.from("contacts").insert({
      organization_id: currentOrgId,
      first_name: contactForm.firstName,
      last_name: contactForm.lastName,
      email: contactForm.email,
      phone: contactForm.phone,
      title: contactForm.title,
    });

    if (error) {
      toast.error("Failed to add contact");
    } else {
      toast.success("Contact added");
      setIsAddContactOpen(false);
      setContactForm({ firstName: "", lastName: "", email: "", phone: "", title: "" });
      refetchContacts();
    }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrgId) return toast.error("No organization selected");

    const { error } = await supabase.from("companies").insert({
      organization_id: currentOrgId,
      name: companyForm.name,
      website: companyForm.website || null,
      industry: companyForm.industry || null,
    });

    if (error) {
      toast.error("Failed to add company");
    } else {
      toast.success("Company added");
      setIsAddCompanyOpen(false);
      setCompanyForm({ name: "", website: "", industry: "" });
      refetchCompanies();
    }
  };

  const filteredContacts = contacts?.filter(c =>
    `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = companies?.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCompanyData = companies?.find(c => c.id === selectedCompany);
  const totalDealValue = companyDeals?.reduce((sum, d) => sum + (Number(d.value) || 0), 0) || 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">People</h1>
        <p className="text-sm text-muted-foreground">Contacts & companies in one place</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="contacts" className="gap-2">
            <Users className="h-4 w-4" />
            Contacts ({contacts?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="companies" className="gap-2">
            <Building2 className="h-4 w-4" />
            Companies ({companies?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-3 mt-4">
          {filteredContacts?.map((contact) => (
            <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-sm font-medium">
                    {contact.first_name?.charAt(0)}{contact.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium truncate">
                      {contact.first_name} {contact.last_name}
                    </h3>
                    {contact.contact_scores?.[0] && (
                      <Badge variant="outline" className={cn("text-xs", getScoreColor(contact.contact_scores[0].total_score))}>
                        {contact.contact_scores[0].total_score}
                      </Badge>
                    )}
                  </div>
                  {contact.title && <p className="text-xs text-muted-foreground">{contact.title}</p>}
                  {contact.companies && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Building2 className="h-3 w-3" /> {contact.companies.name}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setSelectedContact(contact); setIsEmailComposerOpen(true); }}>
                      <Sparkles className="h-3 w-3 mr-1" /> Email
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setSelectedContact(contact); setIsInsightsOpen(true); }}>
                      <Brain className="h-3 w-3 mr-1" /> Insights
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredContacts?.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">No contacts found</Card>
          )}
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              {filteredCompanies?.map((company) => (
                <Card
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:shadow-md",
                    selectedCompany === company.id && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{company.name}</h4>
                      {company.industry && <p className="text-xs text-muted-foreground">{company.industry}</p>}
                    </div>
                  </div>
                </Card>
              ))}
              {filteredCompanies?.length === 0 && (
                <Card className="p-6 text-center text-muted-foreground text-sm">No companies</Card>
              )}
            </div>

            <div className="lg:col-span-2">
              {selectedCompanyData ? (
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedCompanyData.name}</h2>
                      {selectedCompanyData.industry && (
                        <Badge variant="secondary" className="mt-1">{selectedCompanyData.industry}</Badge>
                      )}
                    </div>
                    {selectedCompanyData.website && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={selectedCompanyData.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" /> Website
                        </a>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm">{companyContacts?.length || 0} contacts</span>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm">${totalDealValue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {companyContacts?.map((c) => (
                      <div key={c.id} className="p-3 border rounded-lg text-sm">
                        <span className="font-medium">{c.first_name} {c.last_name}</span>
                        {c.title && <span className="text-muted-foreground"> · {c.title}</span>}
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card className="p-12 text-center text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a company to view details</p>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* FAB */}
      <LegacyFAB
        onClick={() => activeTab === "contacts" ? setIsAddContactOpen(true) : setIsAddCompanyOpen(true)}
        label={activeTab === "contacts" ? "New Contact" : "New Company"}
      />

      {/* Add Contact Dialog */}
      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Contact</DialogTitle></DialogHeader>
          <MobileOptimizedForm onSubmit={handleAddContact}>
            <div className="grid grid-cols-2 gap-3">
              <MobileFormField label="First Name" required>
                <MobileFormInput value={contactForm.firstName} onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})} required />
              </MobileFormField>
              <MobileFormField label="Last Name" required>
                <MobileFormInput value={contactForm.lastName} onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})} required />
              </MobileFormField>
            </div>
            <MobileFormField label="Email">
              <MobileFormInput type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
            </MobileFormField>
            <MobileFormField label="Phone">
              <MobileFormInput type="tel" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} />
            </MobileFormField>
            <MobileFormField label="Title">
              <MobileFormInput value={contactForm.title} onChange={(e) => setContactForm({...contactForm, title: e.target.value})} />
            </MobileFormField>
            <MobileFormButton type="submit"><Plus className="h-4 w-4" /> Add Contact</MobileFormButton>
          </MobileOptimizedForm>
        </DialogContent>
      </Dialog>

      {/* Add Company Dialog */}
      <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Company</DialogTitle></DialogHeader>
          <MobileOptimizedForm onSubmit={handleAddCompany}>
            <MobileFormField label="Company Name" required>
              <MobileFormInput value={companyForm.name} onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})} required />
            </MobileFormField>
            <MobileFormField label="Website">
              <MobileFormInput type="url" value={companyForm.website} onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})} />
            </MobileFormField>
            <MobileFormField label="Industry">
              <MobileFormInput value={companyForm.industry} onChange={(e) => setCompanyForm({...companyForm, industry: e.target.value})} />
            </MobileFormField>
            <MobileFormButton type="submit"><Plus className="h-4 w-4" /> Add Company</MobileFormButton>
          </MobileOptimizedForm>
        </DialogContent>
      </Dialog>

      {/* AI Email Composer */}
      {selectedContact && (
        <>
          <AIEmailComposer
            open={isEmailComposerOpen}
            onOpenChange={setIsEmailComposerOpen}
            contactName={`${selectedContact.first_name} ${selectedContact.last_name}`}
            companyName={selectedContact.companies?.name}
          />
          <Sheet open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{selectedContact.first_name} {selectedContact.last_name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ContactInsightsPanel contactId={selectedContact.id} organizationId={currentOrgId!} />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
