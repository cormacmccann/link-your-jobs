import { Zap, BarChart3, Calendar, Bell, Cookie, Shield, Gauge, Star } from "lucide-react";
import FeaturePageLayout from "@/components/FeaturePageLayout";

const Tools = () => (
  <FeaturePageLayout
    eyebrow="Extras"
    titlePrefix="All Tools &"
    titleAccent="Extras"
    description="Powerful tools to automate, analyse, and optimise your business. All included, no extra fees."
    glowColor="blue"
    ctaLabel="Get Started"
    capabilities={[
      { icon: Zap, title: "Automations", description: "Create workflow automations with triggers and actions. Save hours of manual work." },
      { icon: BarChart3, title: "Analytics", description: "Track pipeline value, revenue, conversion rates, and team performance." },
      { icon: Calendar, title: "Calendar & Bookings", description: "Schedule meetings, accept bookings, and sync with your calendar." },
      { icon: Bell, title: "Notifications", description: "Real-time alerts for important events and customer interactions." },
      { icon: Cookie, title: "Cookie Consent", description: "GDPR-compliant cookie banner with consent management built-in." },
      { icon: Shield, title: "Privacy Builder", description: "Generate privacy policies and terms of service automatically." },
      { icon: Gauge, title: "Performance Tools", description: "Site speed monitoring and optimisation recommendations." },
      { icon: Star, title: "Review Widget", description: "Collect and display customer reviews on your website." },
    ]}
  />
);

export default Tools;
