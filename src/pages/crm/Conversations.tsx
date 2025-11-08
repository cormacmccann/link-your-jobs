import { GlowCard } from "@/components/ui/GlowCard";
import { MessageSquare, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Conversations() {
  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">Conversations</h1>
          <p className="text-text-2">Unified inbox for all your customer communications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard glowColor="blue" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-cyan/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-acc-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Site Chat</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
            <p className="text-text-2 text-sm mb-4">
              Live chat widget for your website
            </p>
            <Button disabled className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Configure Chat
            </Button>
          </GlowCard>

          <GlowCard glowColor="purple" customSize className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-acc-violet/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-acc-violet" />
              </div>
              <div>
                <h3 className="font-semibold text-text-1">Email</h3>
                <p className="text-sm text-text-2">Coming soon</p>
              </div>
            </div>
            <p className="text-text-2 text-sm mb-4">
              Send and receive emails directly
            </p>
            <Button disabled className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Connect Email
            </Button>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
