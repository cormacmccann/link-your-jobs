import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Mail, Phone, Building2, Globe, 
  FileText, Receipt, Calendar, Clock, FileSignature,
  Plus, MoreHorizontal
} from "lucide-react";
import { ClientTimeline } from "@/components/crm/timeline/ClientTimeline";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Client() {
  const { contactId, companyId } = useParams();
  const navigate = useNavigate();
  const entityId = contactId || companyId;
  const entityType = contactId ? "contact" : "company";

  // Fetch contact details
  const { data: contact } = useQuery({
    queryKey: ["contact-detail", contactId],
    queryFn: async () => {
      if (!contactId) return null;
      const { data, error } = await supabase
        .from("contacts")
        .select("*, companies(id, name, website, industry)")
        .eq("id", contactId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!contactId,
  });

  // Fetch company details
  const { data: company } = useQuery({
    queryKey: ["company-detail", companyId],
    queryFn: async () => {
      if (!companyId) return null;
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", companyId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["client-stats", entityId, entityType],
    queryFn: async () => {
      const contactFilter = entityType === "contact" 
        ? { related_contact_id: entityId }
        : { related_company_id: entityId };
      
      const [cards, invoices, quotes, timeEntries] = await Promise.all([
        supabase.from("cards").select("id, status").or(`related_contact_id.eq.${entityId},related_company_id.eq.${entityId}`),
        supabase.from("invoices").select("id, total_amount, status").or(`related_contact_id.eq.${entityId},related_company_id.eq.${entityId}`),
        supabase.from("quotes").select("id, total_amount, status").or(`related_contact_id.eq.${entityId},related_company_id.eq.${entityId}`),
        supabase.from("time_entries").select("id, duration_minutes, total_amount").or(`related_contact_id.eq.${entityId},related_company_id.eq.${entityId}`),
      ]);

      const totalInvoiced = invoices.data?.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0) || 0;
      const totalQuoted = quotes.data?.reduce((sum, q) => sum + (Number(q.total_amount) || 0), 0) || 0;
      const totalTime = timeEntries.data?.reduce((sum, t) => sum + (Number(t.duration_minutes) || 0), 0) || 0;
      const activeProjects = cards.data?.filter(c => c.status === 'active').length || 0;

      return { totalInvoiced, totalQuoted, totalTime, activeProjects, projectCount: cards.data?.length || 0 };
    },
    enabled: !!entityId,
  });

  const entity = contact || company;
  const displayName = contact 
    ? `${contact.first_name} ${contact.last_name}`
    : company?.name || "Unknown";

  if (!entity) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate("/crm/people")} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to People
      </Button>

      {/* Client Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl font-semibold">
              {displayName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{displayName}</h1>
                {contact?.title && (
                  <p className="text-muted-foreground">{contact.title}</p>
                )}
                {contact?.companies && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3" />
                    {contact.companies.name}
                  </p>
                )}
                {company?.industry && (
                  <Badge variant="secondary" className="mt-2">{company.industry}</Badge>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/crm/quotes/new?${entityType}=${entityId}`)}>
                    <FileText className="h-4 w-4 mr-2" />
                    New Quote
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/crm/contracts/new?${entityType}=${entityId}`)}>
                    <FileSignature className="h-4 w-4 mr-2" />
                    New Contract
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/crm/calendar?${entityType}=${entityId}`)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mt-4">
              {(contact?.email) && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {(contact?.phone) && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              )}
              {(company?.website || contact?.companies?.website) && (
                <a 
                  href={company?.website || contact?.companies?.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Projects</span>
            </div>
            <p className="text-lg font-semibold">{stats?.activeProjects || 0} active</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Receipt className="h-4 w-4" />
              <span className="text-xs">Invoiced</span>
            </div>
            <p className="text-lg font-semibold">€{(stats?.totalInvoiced || 0).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Quoted</span>
            </div>
            <p className="text-lg font-semibold">€{(stats?.totalQuoted || 0).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Time Tracked</span>
            </div>
            <p className="text-lg font-semibold">{Math.round((stats?.totalTime || 0) / 60)}h</p>
          </div>
        </div>
      </Card>

      {/* Timeline with Filters */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>
          
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Activity
          </Button>
        </div>

        <TabsContent value="all">
          <ClientTimeline entityId={entityId!} entityType={entityType} />
        </TabsContent>
        <TabsContent value="invoices">
          <ClientTimeline entityId={entityId!} entityType={entityType} filter="invoice" />
        </TabsContent>
        <TabsContent value="quotes">
          <ClientTimeline entityId={entityId!} entityType={entityType} filter="quote" />
        </TabsContent>
        <TabsContent value="projects">
          <ClientTimeline entityId={entityId!} entityType={entityType} filter="card" />
        </TabsContent>
        <TabsContent value="time">
          <ClientTimeline entityId={entityId!} entityType={entityType} filter="time_entry" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
