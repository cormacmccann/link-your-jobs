import { GlowCard } from "@/components/ui/GlowCard";
import { Shield, Cookie, FileText, Star, Grid, BarChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const extras = [
  {
    title: "Privacy & Policy Builder",
    description: "GDPR/CCPA compliant privacy policies",
    icon: Shield,
    color: "blue" as const,
    path: "/tools/privacy-policy-builder",
  },
  {
    title: "Cookie Banner",
    description: "Consent management & geo rules",
    icon: Cookie,
    color: "purple" as const,
    path: "/tools/cookie-consent-manager",
  },
  {
    title: "T&Cs Generator",
    description: "Terms of service templates",
    icon: FileText,
    color: "green" as const,
    path: "/tools/terms-generator",
  },
  {
    title: "Reviews Widget",
    description: "Google/FB/Trustpilot integration",
    icon: Star,
    color: "orange" as const,
    path: "/tools/review-widget",
  },
  {
    title: "Social Wall",
    description: "Aggregate social feeds",
    icon: Grid,
    color: "blue" as const,
    path: "/tools/social-wall",
  },
  {
    title: "Analytics",
    description: "GA4 & Clarity overview",
    icon: BarChart,
    color: "purple" as const,
    path: "/crm/insights",
  },
];

export default function Extras() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">Extras</h1>
          <p className="text-text-2">Free tools included with your plan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {extras.map((extra) => (
            <GlowCard key={extra.title} glowColor={extra.color} customSize className="w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${
                  extra.color === 'blue' ? 'bg-acc-cyan/20' :
                  extra.color === 'purple' ? 'bg-acc-violet/20' :
                  extra.color === 'green' ? 'bg-green-500/20' :
                  'bg-acc-pink/20'
                } flex items-center justify-center`}>
                  <extra.icon className={`w-5 h-5 ${
                    extra.color === 'blue' ? 'text-acc-cyan' :
                    extra.color === 'purple' ? 'text-acc-violet' :
                    extra.color === 'green' ? 'text-green-500' :
                    'text-acc-pink'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-1">{extra.title}</h3>
                </div>
              </div>
              <p className="text-text-2 text-sm mb-4">{extra.description}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(extra.path)}
              >
                Open Tool
              </Button>
            </GlowCard>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-bg-1/50 border border-white/5">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-acc-violet mt-1" />
            <div>
              <h3 className="font-semibold text-text-1 mb-2">Included to save you money</h3>
              <p className="text-text-2 text-sm">
                All these tools are included with your plan at no extra cost. 
                No need to pay for separate subscriptions to Iubenda, CookieYes, or other services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
