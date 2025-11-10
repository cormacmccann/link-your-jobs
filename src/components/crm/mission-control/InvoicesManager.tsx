import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, DollarSign, TrendingUp, AlertCircle, ExternalLink, Send, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InvoiceFormDialog } from "./InvoiceFormDialog";

export function InvoicesManager() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingInvoice, setSendingInvoice] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: orgs } = await supabase.rpc('get_user_organizations', {
        _user_id: user.id
      });

      if (orgs && orgs.length > 0) {
        const { data, error } = await supabase
          .from('invoices')
          .select('*, invoice_items(*)')
          .eq('organization_id', orgs[0].id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setInvoices(data || []);
      }
    } catch (error: any) {
      console.error('Error loading invoices:', error);
      toast({
        title: "Error",
        description: "Failed to load invoices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendInvoice = async (invoiceId: string) => {
    setSendingInvoice(invoiceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-invoice', {
        body: { invoiceId }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Invoice sent successfully. Payment link created.",
      });

      loadInvoices();
    } catch (error: any) {
      console.error('Error sending invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invoice",
        variant: "destructive",
      });
    } finally {
      setSendingInvoice(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateSummary = () => {
    const outstanding = invoices
      .filter(i => i.status === 'sent' || i.status === 'overdue')
      .reduce((sum, i) => sum + parseFloat(i.total_amount), 0);
    
    const paidThisMonth = invoices
      .filter(i => i.status === 'paid' && new Date(i.paid_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .reduce((sum, i) => sum + parseFloat(i.total_amount), 0);
    
    const overdue = invoices
      .filter(i => i.status === 'overdue')
      .reduce((sum, i) => sum + parseFloat(i.total_amount), 0);

    return { outstanding, paidThisMonth, overdue };
  };

  const summary = calculateSummary();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Invoices & Payments</h3>
          <p className="text-sm text-muted-foreground">
            Manage invoices and receive payments via Stripe
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">${summary.outstanding.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid This Month</p>
              <p className="text-2xl font-bold">${summary.paidThisMonth.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold">${summary.overdue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {invoices.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No invoices yet. Create your first invoice!</p>
          </Card>
        ) : (
          invoices.map((invoice) => (
            <Card key={invoice.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold">{invoice.invoice_number}</p>
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer_name} • {invoice.customer_email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(invoice.due_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">${parseFloat(invoice.total_amount).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{invoice.currency}</p>
                  </div>

                  {invoice.status === 'draft' ? (
                    <Button 
                      size="sm" 
                      onClick={() => sendInvoice(invoice.id)}
                      disabled={sendingInvoice === invoice.id}
                    >
                      {sendingInvoice === invoice.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </>
                      )}
                    </Button>
                  ) : invoice.payment_link ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(invoice.payment_link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <InvoiceFormDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={loadInvoices}
      />
    </div>
  );
}
