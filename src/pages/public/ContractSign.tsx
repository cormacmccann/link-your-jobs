import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, FileSignature, Calendar, 
  Building2, User, AlertCircle, Pen
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContractSign() {
  const { id } = useParams();
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);
  const [signatureType, setSignatureType] = useState<"typed" | "drawn">("typed");
  const [typedSignature, setTypedSignature] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Fetch contract (and mark as viewed)
  const { data: contract, refetch } = useQuery({
    queryKey: ["public-contract", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          contacts:related_contact_id(first_name, last_name, email),
          companies:related_company_id(name)
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;

      // Mark as viewed if sent
      if (data.status === 'sent') {
        await supabase
          .from("contracts")
          .update({ status: 'viewed', viewed_at: new Date().toISOString() })
          .eq("id", id);
      }

      return data;
    },
    enabled: !!id,
  });

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Sign mutation
  const signMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("No contract ID");
      
      let signatureData = "";
      if (signatureType === "typed") {
        if (!typedSignature.trim()) throw new Error("Signature required");
        signatureData = typedSignature;
      } else {
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("No signature drawn");
        signatureData = canvas.toDataURL();
      }

      const { error } = await supabase
        .from("contracts")
        .update({
          status: 'signed',
          signed_at: new Date().toISOString(),
          signature_data: signatureData,
          signature_type: signatureType,
          signer_name: typedSignature || "Drawn Signature",
        })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Contract signed successfully!");
      setIsSignDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to sign contract");
    },
  });

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-xl font-semibold mb-2">Contract Not Found</h1>
          <p className="text-muted-foreground">
            This contract may have expired or been removed.
          </p>
        </Card>
      </div>
    );
  }

  const isExpired = contract.expires_at && new Date(contract.expires_at) < new Date();
  const canSign = (contract.status === 'sent' || contract.status === 'viewed') && !isExpired;

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">{contract.contract_number}</Badge>
              <h1 className="text-2xl font-bold">{contract.title}</h1>
            </div>
            <Badge className={
              contract.status === 'signed' ? 'bg-green-500' :
              contract.status === 'expired' || isExpired ? 'bg-muted text-muted-foreground' :
              contract.status === 'voided' ? 'bg-red-500' :
              'bg-blue-500'
            }>
              {isExpired && contract.status !== 'signed' ? 'Expired' : contract.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {contract.contacts && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{contract.contacts.first_name} {contract.contacts.last_name}</span>
              </div>
            )}
            {contract.companies && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{contract.companies.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Created {format(new Date(contract.created_at), "MMM d, yyyy")}</span>
            </div>
            {contract.expires_at && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className={isExpired ? 'text-red-500' : ''}>
                  Expires {format(new Date(contract.expires_at), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Contract Content */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FileSignature className="h-5 w-5" />
            Contract Document
          </h2>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <pre className="whitespace-pre-wrap font-sans text-sm bg-muted/50 p-4 rounded-lg">
              {contract.content}
            </pre>
          </div>
        </Card>

        {/* Sign Button */}
        {canSign && (
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Sign This Contract</h2>
            <Button 
              onClick={() => setIsSignDialogOpen(true)} 
              className="w-full gap-2"
              size="lg"
            >
              <Pen className="h-5 w-5" />
              Sign Contract
            </Button>
          </Card>
        )}

        {/* Signed State */}
        {contract.status === 'signed' && (
          <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="font-semibold text-green-800 dark:text-green-200">Contract Signed</h2>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Signed by {contract.signer_name} on {format(new Date(contract.signed_at), "MMM d, yyyy 'at' HH:mm")}
                </p>
              </div>
            </div>
            {contract.signature_type === 'typed' && (
              <div className="mt-4 p-4 bg-white dark:bg-background rounded-lg border">
                <p className="text-xs text-muted-foreground mb-1">Signature:</p>
                <p className="font-serif text-2xl italic">{contract.signature_data}</p>
              </div>
            )}
          </Card>
        )}

        {/* Sign Dialog */}
        <Dialog open={isSignDialogOpen} onOpenChange={setIsSignDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Sign Contract</DialogTitle>
              <DialogDescription>
                By signing, you agree to the terms outlined in this contract.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={signatureType} onValueChange={(v) => setSignatureType(v as "typed" | "drawn")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="typed">Type Name</TabsTrigger>
                <TabsTrigger value="drawn">Draw Signature</TabsTrigger>
              </TabsList>
              
              <TabsContent value="typed" className="space-y-4">
                <div>
                  <Label>Type your full name</Label>
                  <Input
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    placeholder="Your full legal name"
                    className="font-serif text-lg"
                  />
                </div>
                {typedSignature && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                    <p className="font-serif text-2xl italic">{typedSignature}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="drawn" className="space-y-4">
                <div>
                  <Label>Draw your signature</Label>
                  <div className="border rounded-lg bg-white overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={150}
                      className="w-full cursor-crosshair touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearCanvas} className="mt-2">
                    Clear
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={() => signMutation.mutate()} 
              className="w-full"
              disabled={signMutation.isPending || (signatureType === "typed" && !typedSignature.trim())}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sign Contract
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
