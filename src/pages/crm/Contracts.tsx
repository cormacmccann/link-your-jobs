import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, FileSignature, Send, Eye, CheckCircle2, 
  Clock, MoreHorizontal, ArrowUpRight, XCircle
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
  draft: { label: "Draft", icon: FileSignature, color: "bg-muted text-muted-foreground" },
  sent: { label: "Sent", icon: Send, color: "bg-blue-500/10 text-blue-500" },
  viewed: { label: "Viewed", icon: Eye, color: "bg-yellow-500/10 text-yellow-500" },
  signed: { label: "Signed", icon: CheckCircle2, color: "bg-green-500/10 text-green-500" },
  expired: { label: "Expired", icon: Clock, color: "bg-muted text-muted-foreground" },
  voided: { label: "Voided", icon: XCircle, color: "bg-red-500/10 text-red-500" },
};

export default function Contracts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: contracts } = useQuery({
    queryKey: ["contracts", currentOrgId, statusFilter],
    queryFn: async () => {
      if (!currentOrgId) return [];
      let query = supabase
        .from("contracts")
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

  const filteredContracts = contracts?.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contract_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: contracts?.length || 0,
    draft: contracts?.filter(c => c.status === 'draft').length || 0,
    pending: contracts?.filter(c => c.status === 'sent' || c.status === 'viewed').length || 0,
    signed: contracts?.filter(c => c.status === 'signed').length || 0,
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
          <h1 className="text-2xl font-semibold tracking-tight">Contracts</h1>
          <p className="text-sm text-muted-foreground">Digital contracts and e-signatures</p>
        </div>
        <Button onClick={() => navigate("/crm/contracts/new")} className="gap-2 hidden md:flex">
          <Plus className="h-4 w-4" />
          New Contract
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Contracts</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="text-2xl font-bold">{stats.draft}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Awaiting Signature</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Signed</p>
          <p className="text-2xl font-bold text-green-500">{stats.signed}</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contracts..."
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

      {/* Contracts List */}
      <div className="space-y-3">
        {filteredContracts?.map((contract) => {
          const status = statusConfig[contract.status] || statusConfig.draft;
          const StatusIcon = status.icon;
          const clientName = contract.contacts 
            ? `${contract.contacts.first_name} ${contract.contacts.last_name}`
            : contract.companies?.name || "No client";

          return (
            <Card
              key={contract.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/crm/contracts/${contract.id}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-mono">
                      {contract.contract_number}
                    </Badge>
                    <Badge className={cn("text-xs", status.color)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <h3 className="font-medium truncate">{contract.title}</h3>
                  <p className="text-sm text-muted-foreground">{clientName}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(contract.created_at), "MMM d, yyyy")}
                  </p>
                  {contract.signed_at && (
                    <p className="text-xs text-green-500">
                      Signed {format(new Date(contract.signed_at), "MMM d")}
                    </p>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/crm/contracts/${contract.id}`); }}>
                      Edit Contract
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(`/sign/${contract.id}`, '_blank'); }}>
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      View Signing Page
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          );
        })}

        {filteredContracts?.length === 0 && (
          <Card className="p-8 text-center">
            <FileSignature className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No contracts found</p>
            <Button onClick={() => navigate("/crm/contracts/new")} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Contract
            </Button>
          </Card>
        )}
      </div>

      <LegacyFAB onClick={() => navigate("/crm/contracts/new")} label="New Contract" />
    </div>
  );
}
