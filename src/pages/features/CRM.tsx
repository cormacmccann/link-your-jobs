import { Users, Building2, Tag, Clock, Filter, Star } from "lucide-react";
import FeaturePageLayout from "@/components/FeaturePageLayout";

const CRM = () => (
  <FeaturePageLayout
    eyebrow="Platform"
    titlePrefix="CRM that"
    titleAccent="Works"
    description="Manage contacts, companies, and relationships in one clean interface. No bloat, just what you need."
    glowColor="purple"
    ctaLabel="Try CRM"
    capabilities={[
      { icon: Users, title: "Contact Management", description: "Store and organize all your contacts with custom fields, tags, and notes" },
      { icon: Building2, title: "Company Profiles", description: "Link contacts to companies with enriched data and relationship tracking" },
      { icon: Tag, title: "Smart Tagging", description: "Organize with tags, segments, and custom categories for easy filtering" },
      { icon: Clock, title: "Activity Timeline", description: "See all interactions, emails, calls, and notes in one chronological view" },
      { icon: Filter, title: "Advanced Filters", description: "Create saved views with complex filters to find exactly what you need" },
      { icon: Star, title: "Lead Scoring", description: "AI-powered lead scoring to prioritize your hottest prospects" },
    ]}
  />
);

export default CRM;
