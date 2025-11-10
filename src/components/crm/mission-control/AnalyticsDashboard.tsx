import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Users } from "lucide-react";

export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Pipeline Value",
      value: "$342,500",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+3.2%",
      icon: Target,
      trend: "up",
    },
    {
      title: "Active Deals",
      value: "47",
      change: "+8",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "New Contacts",
      value: "128",
      change: "+23",
      icon: Users,
      trend: "up",
    },
  ];

  const deals = [
    { stage: "Lead", count: 23, value: "$115,000" },
    { stage: "Qualified", count: 15, value: "$97,500" },
    { stage: "Proposal", count: 6, value: "$78,000" },
    { stage: "Negotiation", count: 3, value: "$52,000" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                <span className={`text-xs font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.title}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pipeline Overview</h3>
        <Card className="p-6">
          <div className="space-y-4">
            {deals.map((deal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{deal.stage}</span>
                  <div className="text-right">
                    <span className="font-semibold">{deal.value}</span>
                    <span className="text-sm text-muted-foreground ml-2">({deal.count} deals)</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(deal.count / 47) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue Tracking</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="font-semibold">$89,400</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last Month</span>
              <span className="font-semibold text-muted-foreground">$76,200</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-sm font-semibold">Growth</span>
              <span className="font-semibold text-green-600">+17.3%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Team Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sarah Johnson</span>
              <span className="font-semibold">$52,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Michael Chen</span>
              <span className="font-semibold">$48,300</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Emily Rodriguez</span>
              <span className="font-semibold">$43,100</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
