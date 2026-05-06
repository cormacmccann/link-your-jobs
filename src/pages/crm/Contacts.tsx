import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Mail, Phone, Building2, Sparkles, Brain, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AIEmailComposer } from "@/components/crm/AIEmailComposer";
import { ContactInsightsPanel } from "@/components/crm/ContactInsightsPanel";
import { LegacyFAB } from "@/components/crm/FloatingActionButton";
import { MobileOptimizedForm, MobileFormField, MobileFormInput, MobileFormButton } from "@/components/crm/MobileOptimizedForm";

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
  });
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: contacts, refetch } = useQuery({
    queryKey: ["contacts", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("contacts")
        .select(`
          *,
          companies (
            id,
            name
          ),
          contact_scores (
            total_score,
            engagement_score,
            fit_score,
            activity_score
          )
        `)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const handleAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("contacts").insert({
      organization_id: currentOrgId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
    });

    if (error) {
      toast.error("Failed to add contact");
      console.error(error);
    } else {
      toast.success("Contact added successfully");
      setIsAddDialogOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", title: "" });
      refetch();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'A';
    if (score >= 60) return 'B';
    if (score >= 40) return 'C';
    return 'D';
  };

  const handleEmailClick = (contact: any) => {
    setSelectedContact(contact);
    setIsEmailComposerOpen(true);
  };

  const handleInsightsClick = (contact: any) => {
    setSelectedContact(contact);
    setIsInsightsOpen(true);
  };

  const filteredContacts = contacts?.filter(contact =>
    `${contact.first_name} ${contact.last_name} ${contact.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
    <div className="p-4 md:p-8 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-gobold uppercase tracking-tight mb-1">Contacts</h1>
        <p className="text-sm text-muted-foreground">Manage your customer relationships</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl text-base md:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts?.map((contact) => (
          <Card key={contact.id} className="p-6 hover:shadow-xl transition-all duration-200 animate-fade-in touch-manipulation">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-lg font-bold">
                  {contact.first_name?.charAt(0)}{contact.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg truncate">
                    {contact.first_name} {contact.last_name}
                  </h3>
                  {contact.contact_scores?.[0] && (
                    <Badge 
                      variant="outline" 
                      className={getScoreColor(contact.contact_scores[0].total_score)}
                    >
                      {getScoreBadge(contact.contact_scores[0].total_score)}
                    </Badge>
                  )}
                </div>
                {contact.title && (
                  <p className="text-sm text-muted-foreground truncate mb-1">{contact.title}</p>
                )}
                {contact.companies && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate">{contact.companies.name}</span>
                  </div>
                )}
                <div className="space-y-1.5 mb-4">
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline truncate">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEmailClick(contact)}
                    className="flex-1 h-9 text-xs rounded-lg"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleInsightsClick(contact)}
                    className="flex-1 h-9 text-xs rounded-lg"
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    Insights
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredContacts?.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No contacts found. Add your first contact to get started!</p>
        </Card>
      )}

      <LegacyFAB
        onClick={() => setIsAddDialogOpen(true)}
        label="New Contact"
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <MobileOptimizedForm onSubmit={handleAddContact}>
            <div className="grid grid-cols-2 gap-4">
              <MobileFormField label="First Name" required>
                <MobileFormInput
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </MobileFormField>
              <MobileFormField label="Last Name" required>
                <MobileFormInput
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  required
                />
              </MobileFormField>
            </div>
            <MobileFormField label="Email">
              <MobileFormInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
              />
            </MobileFormField>
            <MobileFormField label="Phone">
              <MobileFormInput
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </MobileFormField>
            <MobileFormField label="Job Title">
              <MobileFormInput
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VP of Sales"
              />
            </MobileFormField>
            <MobileFormButton type="submit">
              <Plus className="h-5 w-5" />
              Add Contact
            </MobileFormButton>
          </MobileOptimizedForm>
        </DialogContent>
      </Dialog>

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
                <SheetTitle>
                  {selectedContact.first_name} {selectedContact.last_name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ContactInsightsPanel
                  contactId={selectedContact.id}
                  organizationId={currentOrgId!}
                />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
