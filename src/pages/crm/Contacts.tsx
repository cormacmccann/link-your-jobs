import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Mail, Phone, Building2, Sparkles, Brain } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AIEmailComposer } from "@/components/crm/AIEmailComposer";
import { ContactInsightsPanel } from "@/components/crm/ContactInsightsPanel";

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
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
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("contacts").insert({
      organization_id: currentOrgId,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      title: formData.get("title") as string,
      created_by: user.id,
    });

    if (error) {
      toast.error("Failed to add contact");
      console.error(error);
    } else {
      toast.success("Contact added successfully");
      setIsAddDialogOpen(false);
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Contacts</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input id="last_name" name="last_name" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" name="title" />
              </div>
              <Button type="submit" className="w-full">Add Contact</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts?.map((contact) => (
          <Card key={contact.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                  {contact.first_name?.charAt(0)}{contact.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg truncate">
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
                  <p className="text-sm text-muted-foreground truncate">{contact.title}</p>
                )}
                {contact.companies && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate">{contact.companies.name}</span>
                  </div>
                )}
                <div className="flex flex-col gap-1 mt-3">
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-pink-500 hover:underline truncate">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="text-pink-500 hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEmailClick(contact)}
                    className="flex-1"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleInsightsClick(contact)}
                    className="flex-1"
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

      {selectedContact && (
        <>
          <AIEmailComposer
            open={isEmailComposerOpen}
            onOpenChange={setIsEmailComposerOpen}
            contactName={`${selectedContact.first_name} ${selectedContact.last_name}`}
            companyName={selectedContact.companies?.name}
          />

          <Sheet open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
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
