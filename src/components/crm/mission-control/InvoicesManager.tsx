import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, DollarSign, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InvoicesManager() {
  const [invoices] = useState([
    {
      id: "INV-001",
      client: "Acme Corp",
      amount: 5000,
      status: "paid",
      dueDate: "2025-01-15",
    },
    {
      id: "INV-002",
      client: "TechStart Inc",
      amount: 3500,
      status: "pending",
      dueDate: "2025-01-20",
    },
    {
      id: "INV-003",
      client: "Global Solutions",
      amount: 7200,
      status: "overdue",
      dueDate: "2025-01-05",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Invoice Management</h3>
          <p className="text-sm text-muted-foreground">
            Create quotes, convert to invoices, and accept payments
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">$10,700</p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Paid This Month</p>
              <p className="text-2xl font-bold">$5,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold">$7,200</p>
            </div>
            <DollarSign className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                </div>
                
                <Badge variant="outline" className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>

                <Button size="sm" variant="outline">
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted/50">
        <h3 className="font-semibold mb-2">Stripe Integration</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Connect your Stripe account to accept payments directly through invoices
        </p>
        <Button variant="outline">
          Connect Stripe Account
        </Button>
      </Card>
    </div>
  );
}
