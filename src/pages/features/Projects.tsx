import { FolderKanban, CheckSquare, FileText, Calendar, MessageCircle, Users } from "lucide-react";
import FeaturePageLayout from "@/components/FeaturePageLayout";

const Projects = () => (
  <FeaturePageLayout
    eyebrow="Collaboration"
    titlePrefix="Project"
    titleAccent="Management"
    description="Basecamp-style project management. Keep everything organised: todos, docs, schedules, and team discussions."
    glowColor="orange"
    ctaLabel="Try Projects"
    capabilities={[
      { icon: CheckSquare, title: "To-Dos & Tasks", description: "Create task lists with assignees, due dates, and subtasks" },
      { icon: FileText, title: "Project Docs", description: "Collaborative documents and notes for each project" },
      { icon: Calendar, title: "Schedule & Milestones", description: "Visual timeline with milestones and important dates" },
      { icon: MessageCircle, title: "Project Messages", description: "Team discussions and updates organised by project" },
      { icon: Users, title: "Team Collaboration", description: "Assign team members and track who's working on what" },
      { icon: FolderKanban, title: "Project Overview", description: "Dashboard view of progress, activity, and deadlines" },
    ]}
  />
);

export default Projects;
