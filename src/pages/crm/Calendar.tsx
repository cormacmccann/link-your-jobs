import { GlowCard } from "@/components/ui/GlowCard";
import { Calendar as CalendarIcon, Clock, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Calendar() {
  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">Calendar</h1>
          <p className="text-text-2">Bookings and scheduling</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard glowColor="purple" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-violet/20 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-acc-violet" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Booking Slots</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
            <p className="text-text-2 text-sm mb-4">
              15/30/60 min slots with buffers
            </p>
            <Button disabled className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              Configure Slots
            </Button>
          </GlowCard>

          <GlowCard glowColor="blue" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-cyan/20 flex items-center justify-center">
                <Link className="w-5 h-5 text-acc-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Booking Widget</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
            <p className="text-text-2 text-sm mb-4">
              Embed on your website
            </p>
            <Button disabled className="w-full">
              <Link className="w-4 h-4 mr-2" />
              Get Widget Code
            </Button>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
