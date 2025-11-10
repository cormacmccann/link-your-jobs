import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Zap, Mail, Bell, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AutomationsBuilder() {
  const [automations] = useState([
    {
      id: 1,
      name: "New Lead Email Notification",
      trigger: "New contact created",
      action: "Send email to sales team",
      enabled: true,
      runs: 147,
    },
    {
      id: 2,
      name: "Deal Stage Change Alert",
      trigger: "Deal moves to 'Negotiation'",
      action: "Notify account manager",
      enabled: true,
      runs: 89,
    },
    {
      id: 3,
      name: "Overdue Task Reminder",
      trigger: "Task becomes overdue",
      action: "Send reminder notification",
      enabled: false,
      runs: 0,
    },
  ]);

  const recipes = [
    {
      name: "Lead Nurture Sequence",
      description: "Automatically send follow-up emails to new leads over 7 days",
      icon: Mail,
    },
    {
      name: "Support Ticket Escalation",
      description: "Escalate high-priority tickets after 4 hours without response",
      icon: Bell,
    },
    {
      name: "Deal Win Celebration",
      description: "Send congratulations message to team when deal is won",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Automation Workflows</h3>
          <p className="text-sm text-muted-foreground">
            Automate repetitive tasks with triggers and actions
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Automation
        </Button>
      </div>

      <div className="space-y-3">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{automation.name}</p>
                    {automation.enabled ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                        Paused
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{automation.trigger}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>{automation.action}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {automation.runs} runs this month
                  </p>
                </div>
              </div>

              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Recipe Library</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Pre-built automation templates you can customize
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <recipe.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground">{recipe.description}</p>
                  <Button size="sm" variant="link" className="px-0 h-auto mt-2">
                    Use Recipe
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
