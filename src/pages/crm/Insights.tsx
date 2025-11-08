import { GlowCard } from "@/components/ui/GlowCard";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export default function Insights() {
  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">Insights</h1>
          <p className="text-text-2">Analytics and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard glowColor="blue" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-cyan/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-acc-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Pipeline Value</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glowColor="green" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Win Rate</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glowColor="purple" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-violet/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-acc-violet" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Revenue MTD</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
