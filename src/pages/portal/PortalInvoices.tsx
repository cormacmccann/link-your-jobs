import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { FileText, ArrowRight, CheckCircle2, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'paid':
      return { label: 'Paid', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
    case 'sent':
    case 'pending':
      return { label: 'Awaiting Payment', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
    case 'overdue':
      return { label: 'Overdue', color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: AlertCircle };
    case 'draft':
      return { label: 'Draft', color: 'bg-muted text-muted-foreground', icon: Clock };
    default:
      return { label: status, color: 'bg-muted text-muted-foreground', icon: Clock };
  }
};

export default function PortalInvoices() {
  const navigate = useNavigate();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["portal-invoices"],
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
        .from("invoices")
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

  const isEmpty = !invoices || invoices.length === 0;

  // Calculate totals
  const totalPaid = invoices?.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0;
  const totalPending = invoices?.filter(i => i.status !== 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-1">
          View and pay your invoices
        </p>
      </div>

      {/* Summary Cards */}
      {!isEmpty && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-green-500">€{totalPaid.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="text-2xl font-bold text-yellow-500">€{totalPending.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Invoices will appear here once your projects are underway
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => {
            const statusConfig = getStatusConfig(invoice.status);
            const StatusIcon = statusConfig.icon;
            const isPending = invoice.status !== 'paid' && invoice.status !== 'draft';

            return (
              <Card 
                key={invoice.id} 
                className="hover:border-acc-violet/50 transition-colors cursor-pointer group"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-green-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold group-hover:text-acc-violet transition-colors">
                        Invoice {invoice.invoice_number}
                      </h3>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{invoice.customer_name}</span>
                      <span>•</span>
                      <span>{format(parseISO(invoice.created_at || new Date().toISOString()), "MMM d, yyyy")}</span>
                      {invoice.due_date && (
                        <>
                          <span>•</span>
                          <span>Due {format(parseISO(invoice.due_date), "MMM d")}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold">€{(invoice.total_amount || 0).toLocaleString()}</p>
                    {isPending && invoice.payment_link && (
                      <Button 
                        size="sm" 
                        className="mt-2 bg-acc-violet hover:bg-acc-violet/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(invoice.payment_link, '_blank');
                        }}
                      >
                        Pay Now
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
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
