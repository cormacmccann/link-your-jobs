import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { ScrollText, ArrowRight, CheckCircle2, Clock, PenTool, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'signed':
      return { label: 'Signed', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
    case 'sent':
      return { label: 'Awaiting Signature', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: PenTool };
    case 'viewed':
      return { label: 'Viewed', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Eye };
    case 'draft':
      return { label: 'Draft', color: 'bg-muted text-muted-foreground', icon: Clock };
    default:
      return { label: status, color: 'bg-muted text-muted-foreground', icon: Clock };
  }
};

export default function PortalContracts() {
  const navigate = useNavigate();

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["portal-contracts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: userRole } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (!userRole?.organization_id) return [];

      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("organization_id", userRole.organization_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = !contracts || contracts.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Contracts</h1>
        <p className="text-muted-foreground mt-1">
          View and sign your project contracts
        </p>
      </div>

      {isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <ScrollText className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No contracts yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Contracts will appear here when we're ready to formalize project agreements
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {contracts.map((contract) => {
            const statusConfig = getStatusConfig(contract.status);
            const StatusIcon = statusConfig.icon;
            const needsSignature = contract.status === 'sent' || contract.status === 'viewed';

            return (
              <Card 
                key={contract.id} 
                className="hover:border-acc-violet/50 transition-colors cursor-pointer group"
                onClick={() => {
                  if (needsSignature) {
                    navigate(`/sign/${contract.id}`);
                  }
                }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <ScrollText className="h-6 w-6 text-purple-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold group-hover:text-acc-violet transition-colors">
                        {contract.title}
                      </h3>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>Contract #{contract.contract_number}</span>
                      <span>•</span>
                      <span>{format(parseISO(contract.created_at || new Date().toISOString()), "MMM d, yyyy")}</span>
                      {contract.signed_at && (
                        <>
                          <span>•</span>
                          <span>Signed {format(parseISO(contract.signed_at), "MMM d")}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {needsSignature ? (
                      <Button 
                        size="sm" 
                        className="bg-acc-violet hover:bg-acc-violet/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/sign/${contract.id}`);
                        }}
                      >
                        <PenTool className="mr-1 h-3 w-3" />
                        Sign Now
                      </Button>
                    ) : contract.status === 'signed' && contract.signed_pdf_url ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(contract.signed_pdf_url, '_blank');
                        }}
                      >
                        Download PDF
                      </Button>
                    ) : (
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
