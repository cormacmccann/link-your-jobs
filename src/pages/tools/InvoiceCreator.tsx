import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Download } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { toast } from "sonner";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceCreator() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    fromName: "",
    fromAddress: "",
    toName: "",
    toAddress: "",
    notes: "",
    vatRate: 23,
  });

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const vatAmount = subtotal * (invoiceData.vatRate / 100);
  const total = subtotal + vatAmount;

  const generatePrintableHTML = () => {
    const itemsHTML = items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.description}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">€${item.price.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">€${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join("");

    return `
<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${invoiceData.invoiceNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
    <div>
      <h1 style="margin: 0; color: #FF3D9A;">INVOICE</h1>
      <p style="color: #666;">${invoiceData.invoiceNumber}</p>
    </div>
    <div style="text-align: right;">
      <p style="margin: 4px 0;"><strong>Date:</strong> ${invoiceData.date}</p>
      ${invoiceData.dueDate ? `<p style="margin: 4px 0;"><strong>Due:</strong> ${invoiceData.dueDate}</p>` : ""}
    </div>
  </div>
  
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
    <div>
      <h3 style="margin: 0 0 8px 0; color: #666; font-size: 12px; text-transform: uppercase;">From</h3>
      <p style="margin: 0; white-space: pre-line;">${invoiceData.fromName}\n${invoiceData.fromAddress}</p>
    </div>
    <div style="text-align: right;">
      <h3 style="margin: 0 0 8px 0; color: #666; font-size: 12px; text-transform: uppercase;">Bill To</h3>
      <p style="margin: 0; white-space: pre-line;">${invoiceData.toName}\n${invoiceData.toAddress}</p>
    </div>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
    <thead>
      <tr style="background: #f8f8f8;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Description</th>
        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHTML}
    </tbody>
  </table>

  <div style="display: flex; justify-content: flex-end;">
    <table style="width: 250px;">
      <tr>
        <td style="padding: 8px 0;">Subtotal</td>
        <td style="padding: 8px 0; text-align: right;">€${subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">VAT (${invoiceData.vatRate}%)</td>
        <td style="padding: 8px 0; text-align: right;">€${vatAmount.toFixed(2)}</td>
      </tr>
      <tr style="font-weight: bold; font-size: 18px;">
        <td style="padding: 12px 0; border-top: 2px solid #333;">Total</td>
        <td style="padding: 12px 0; border-top: 2px solid #333; text-align: right;">€${total.toFixed(2)}</td>
      </tr>
    </table>
  </div>

  ${invoiceData.notes ? `
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
    <h3 style="margin: 0 0 8px 0; color: #666; font-size: 12px; text-transform: uppercase;">Notes</h3>
    <p style="margin: 0; color: #666;">${invoiceData.notes}</p>
  </div>
  ` : ""}
</body>
</html>`;
  };

  const downloadInvoice = () => {
    const html = generatePrintableHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoiceData.invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded! Open in browser and print to PDF.");
  };

  const printInvoice = () => {
    const html = generatePrintableHTML();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Link>

        <div className="w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Invoice Creator</h1>
            <p className="text-muted-foreground">Create professional invoices for free</p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Invoice Number</Label>
                      <Input
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>VAT Rate (%)</Label>
                      <Input
                        type="number"
                        value={invoiceData.vatRate}
                        onChange={(e) => setInvoiceData({ ...invoiceData, vatRate: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Invoice Date</Label>
                      <Input
                        type="date"
                        value={invoiceData.date}
                        onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={invoiceData.dueDate}
                        onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input
                      value={invoiceData.fromName}
                      onChange={(e) => setInvoiceData({ ...invoiceData, fromName: e.target.value })}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea
                      value={invoiceData.fromAddress}
                      onChange={(e) => setInvoiceData({ ...invoiceData, fromAddress: e.target.value })}
                      placeholder="123 Main St&#10;Dublin, Ireland"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bill To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={invoiceData.toName}
                      onChange={(e) => setInvoiceData({ ...invoiceData, toName: e.target.value })}
                      placeholder="Client Business Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Address</Label>
                    <Textarea
                      value={invoiceData.toAddress}
                      onChange={(e) => setInvoiceData({ ...invoiceData, toAddress: e.target.value })}
                      placeholder="456 Client St&#10;Cork, Ireland"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Items</CardTitle>
                <CardDescription>Add services or products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-5 space-y-2">
                      {index === 0 && <Label>Description</Label>}
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Website Design"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      {index === 0 && <Label>Qty</Label>}
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      {index === 0 && <Label>Price (€)</Label>}
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      {index === 0 && <Label>Amount</Label>}
                      <div className="h-10 flex items-center font-medium">
                        €{(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Line Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1 mr-8">
                    <Label>Notes (optional)</Label>
                    <Textarea
                      value={invoiceData.notes}
                      onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                      placeholder="Payment terms, bank details, thank you message..."
                      rows={3}
                    />
                  </div>
                  <div className="text-right space-y-2 min-w-[200px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VAT ({invoiceData.vatRate}%):</span>
                      <span>€{vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={printInvoice} size="lg">
                Print Invoice
              </Button>
              <Button onClick={downloadInvoice} variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
