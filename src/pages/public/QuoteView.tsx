import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, XCircle, FileText, Calendar, 
  Building2, User, AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function QuoteView() {
  const { id } = useParams();
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [signature, setSignature] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  // Fetch quote (and mark as viewed)
  const { data: quote, refetch } = useQuery({
    queryKey: ["public-quote", id],
    queryFn: async () => {
      if (!id) return null;
      
      // Fetch quote
      const { data: quoteData, error } = await supabase
        .from("quotes")
        .select(`
          *,
          contacts:related_contact_id(first_name, last_name, email),
          companies:related_company_id(name),
          quote_items(*)
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;

      // Mark as viewed if sent
      if (quoteData.status === 'sent') {
        await supabase
          .from("quotes")
          .update({ status: 'viewed', viewed_at: new Date().toISOString() })
          .eq("id", id);
      }

      return quoteData;
    },
    enabled: !!id,
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async () => {
      if (!id || !signature.trim()) throw new Error("Signature required");
      
      const { error } = await supabase
        .from("quotes")
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
          client_signature: signature,
        })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Quote accepted! We'll be in touch soon.");
      setIsAcceptDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to accept quote");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("No quote ID");
      
      const { error } = await supabase
        .from("quotes")
        .update({
          status: 'rejected',
          rejected_at: new Date().toISOString(),
          client_notes: rejectReason,
        })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Quote declined");
      setIsRejectDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to decline quote");
    },
  });

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-xl font-semibold mb-2">Quote Not Found</h1>
          <p className="text-muted-foreground">
            This quote may have expired or been removed.
          </p>
        </Card>
      </div>
    );
  }

  const isExpired = quote.valid_until && new Date(quote.valid_until) < new Date();
  const canRespond = quote.status === 'sent' || quote.status === 'viewed';

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">{quote.quote_number}</Badge>
              <h1 className="text-2xl font-bold">{quote.title}</h1>
              {quote.description && (
                <p className="text-muted-foreground mt-2">{quote.description}</p>
              )}
            </div>
            <Badge className={
              quote.status === 'accepted' ? 'bg-green-500' :
              quote.status === 'rejected' ? 'bg-red-500' :
              quote.status === 'expired' || isExpired ? 'bg-muted text-muted-foreground' :
              'bg-blue-500'
            }>
              {isExpired && quote.status !== 'accepted' && quote.status !== 'rejected' ? 'Expired' : quote.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {quote.contacts && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{quote.contacts.first_name} {quote.contacts.last_name}</span>
              </div>
            )}
            {quote.companies && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{quote.companies.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Created {format(new Date(quote.created_at), "MMM d, yyyy")}</span>
            </div>
            {quote.valid_until && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className={isExpired ? 'text-red-500' : ''}>
                  Valid until {format(new Date(quote.valid_until), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Line Items */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quote Details
          </h2>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Description</th>
                  <th className="text-right p-3 text-sm font-medium">Qty</th>
                  <th className="text-right p-3 text-sm font-medium">Price</th>
                  <th className="text-right p-3 text-sm font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {quote.quote_items?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-right">{item.quantity}</td>
                    <td className="p-3 text-right">€{Number(item.unit_price).toFixed(2)}</td>
                    <td className="p-3 text-right font-medium">€{Number(item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{Number(quote.subtotal).toFixed(2)}</span>
                </div>
                {quote.tax_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>€{Number(quote.tax_amount).toFixed(2)}</span>
                  </div>
                )}
                {quote.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-€{Number(quote.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>€{Number(quote.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        {canRespond && !isExpired && (
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Your Response</h2>
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsAcceptDialogOpen(true)} 
                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Accept Quote
              </Button>
              <Button 
                onClick={() => setIsRejectDialogOpen(true)} 
                variant="outline" 
                className="flex-1 gap-2"
              >
                <XCircle className="h-5 w-5" />
                Decline
              </Button>
            </div>
          </Card>
        )}

        {/* Accepted State */}
        {quote.status === 'accepted' && (
          <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="font-semibold text-green-800 dark:text-green-200">Quote Accepted</h2>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Accepted on {format(new Date(quote.accepted_at), "MMM d, yyyy 'at' HH:mm")}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Rejected State */}
        {quote.status === 'rejected' && (
          <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <h2 className="font-semibold text-red-800 dark:text-red-200">Quote Declined</h2>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Declined on {format(new Date(quote.rejected_at), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Accept Dialog */}
        <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accept Quote</DialogTitle>
              <DialogDescription>
                By accepting this quote, you agree to the terms and pricing outlined above.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Your Signature (Type your full name)</Label>
                <Input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Enter your full name"
                  className="font-serif text-lg"
                />
              </div>
              <Button 
                onClick={() => acceptMutation.mutate()} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!signature.trim() || acceptMutation.isPending}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Acceptance
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Decline Quote</DialogTitle>
              <DialogDescription>
                Please let us know why you're declining so we can improve.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Reason (Optional)</Label>
                <Textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Budget constraints, timing, found another provider..."
                  rows={3}
                />
              </div>
              <Button 
                onClick={() => rejectMutation.mutate()} 
                variant="destructive"
                className="w-full"
                disabled={rejectMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline Quote
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
