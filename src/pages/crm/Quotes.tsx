import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, FileText, Send, Eye, CheckCircle2, 
  XCircle, Clock, MoreHorizontal, ArrowUpRight
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LegacyFAB } from "@/components/crm/FloatingActionButton";

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  draft: { label: "Draft", icon: FileText, color: "bg-muted text-muted-foreground" },
  sent: { label: "Sent", icon: Send, color: "bg-blue-500/10 text-blue-500" },
  viewed: { label: "Viewed", icon: Eye, color: "bg-yellow-500/10 text-yellow-500" },
  accepted: { label: "Accepted", icon: CheckCircle2, color: "bg-green-500/10 text-green-500" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/10 text-red-500" },
  expired: { label: "Expired", icon: Clock, color: "bg-muted text-muted-foreground" },
};

export default function Quotes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: quotes } = useQuery({
    queryKey: ["quotes", currentOrgId, statusFilter],
    queryFn: async () => {
      if (!currentOrgId) return [];
      let query = supabase
        .from("quotes")
        .select(`
          *,
          contacts:related_contact_id(id, first_name, last_name),
          companies:related_company_id(id, name)
        `)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });
      
      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const filteredQuotes = quotes?.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.quote_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: quotes?.length || 0,
    draft: quotes?.filter(q => q.status === 'draft').length || 0,
    sent: quotes?.filter(q => q.status === 'sent').length || 0,
    accepted: quotes?.filter(q => q.status === 'accepted').length || 0,
    totalValue: quotes?.reduce((sum, q) => sum + (Number(q.total_amount) || 0), 0) || 0,
  };

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Please select an organization</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quotes</h1>
          <p className="text-sm text-muted-foreground">Create and manage proposals</p>
        </div>
        <Button onClick={() => navigate("/crm/quotes/new")} className="gap-2 hidden md:flex">
          <Plus className="h-4 w-4" />
          New Quote
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Quotes</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="text-2xl font-bold">{stats.draft}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold">{stats.sent}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold">€{stats.totalValue.toLocaleString()}</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          {Object.entries(statusConfig).slice(0, 4).map(([key, config]) => (
            <Button
              key={key}
              variant={statusFilter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(key)}
            >
              {config.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Quotes List */}
      <div className="space-y-3">
        {filteredQuotes?.map((quote) => {
          const status = statusConfig[quote.status] || statusConfig.draft;
          const StatusIcon = status.icon;
          const clientName = quote.contacts 
            ? `${quote.contacts.first_name} ${quote.contacts.last_name}`
            : quote.companies?.name || "No client";

          return (
            <Card
              key={quote.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/crm/quotes/${quote.id}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-mono">
                      {quote.quote_number}
                    </Badge>
                    <Badge className={cn("text-xs", status.color)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <h3 className="font-medium truncate">{quote.title}</h3>
                  <p className="text-sm text-muted-foreground">{clientName}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">€{Number(quote.total_amount).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(quote.created_at), "MMM d, yyyy")}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/crm/quotes/${quote.id}`); }}>
                      Edit Quote
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(`/quote/${quote.id}`, '_blank'); }}>
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      View Public Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          );
        })}

        {filteredQuotes?.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No quotes found</p>
            <Button onClick={() => navigate("/crm/quotes/new")} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Quote
            </Button>
          </Card>
        )}
      </div>

      <LegacyFAB onClick={() => navigate("/crm/quotes/new")} label="New Quote" />
    </div>
  );
}
