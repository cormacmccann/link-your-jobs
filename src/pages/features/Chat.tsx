import { MessageSquare, Inbox, Globe, Zap, UserPlus, Bell } from "lucide-react";
import FeaturePageLayout from "@/components/FeaturePageLayout";

const Chat = () => (
  <FeaturePageLayout
    eyebrow="Conversations"
    titlePrefix="Chat &"
    titleAccent="Conversations"
    description="Talk to customers in real-time with live chat and a shared inbox. Capture leads automatically."
    glowColor="blue"
    ctaLabel="Try Chat"
    capabilities={[
      { icon: MessageSquare, title: "Live Chat Widget", description: "Embeddable chat widget for your website with custom branding and triggers" },
      { icon: Inbox, title: "Shared Inbox", description: "Team inbox where everyone sees conversations and can jump in to help" },
      { icon: Globe, title: "Multi-Channel", description: "Website chat, email, and social messages all in one unified view" },
      { icon: Zap, title: "Instant Notifications", description: "Real-time alerts so you never miss a customer message" },
      { icon: UserPlus, title: "Lead Capture", description: "Automatically create contacts from chat conversations" },
      { icon: Bell, title: "Typing Indicators", description: "See when customers are typing and when they're online" },
    ]}
  />
);

export default Chat;
