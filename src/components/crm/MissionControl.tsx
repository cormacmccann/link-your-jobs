import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Zap, BarChart3, Sparkles } from "lucide-react";
import { LiveChatWidget } from "./mission-control/LiveChatWidget";
import { LiveChatDashboard } from "./mission-control/LiveChatDashboard";
import { InvoicesManager } from "./mission-control/InvoicesManager";
import { AutomationsBuilder } from "./mission-control/AutomationsBuilder";
import { AutomationCanvas } from "./mission-control/AutomationCanvas";
import { AnalyticsDashboard } from "./mission-control/AnalyticsDashboard";

export function MissionControl() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Mission Control Center</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Manage your business tools and integrations in one place
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Widget Setup
          </TabsTrigger>
          <TabsTrigger value="chatDash" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat Dashboard
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="automations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Automations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Live Chat Widget</CardTitle>
              <CardDescription>
                Configure and embed live chat on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LiveChatWidget />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatDash">
          <Card>
            <CardHeader>
              <CardTitle>Chat Dashboard</CardTitle>
              <CardDescription>
                Manage active conversations with visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LiveChatDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices & Payments</CardTitle>
              <CardDescription>
                Quotes → invoices → payment links with Stripe integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoicesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations">
          <Card>
            <CardHeader>
              <CardTitle>Automations</CardTitle>
              <CardDescription>
                Trigger → Action flows with visual builder and recipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationsBuilder />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Pipeline value, revenue tracking, and conversion metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsDashboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
