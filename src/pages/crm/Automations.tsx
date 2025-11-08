import { GlowCard } from "@/components/ui/GlowCard";
import { Workflow, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Automations() {
  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">Automations</h1>
          <p className="text-text-2">Build workflows that run on autopilot</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard glowColor="purple" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-violet/20 flex items-center justify-center">
                <Workflow className="w-5 h-5 text-acc-violet" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Visual Builder</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
            <p className="text-text-2 text-sm mb-4">
              Trigger → Filters → Actions. No code required.
            </p>
            <Button disabled className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
