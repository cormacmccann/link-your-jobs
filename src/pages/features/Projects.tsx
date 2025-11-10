import { FolderKanban, CheckSquare, FileText, Calendar, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Projects = () => {
  const capabilities = [
    {
      icon: CheckSquare,
      title: "To-Dos & Tasks",
      description: "Create task lists with assignees, due dates, and subtasks"
    },
    {
      icon: FileText,
      title: "Project Docs",
      description: "Collaborative documents and notes for each project"
    },
    {
      icon: Calendar,
      title: "Schedule & Milestones",
      description: "Visual timeline with milestones and important dates"
    },
    {
      icon: MessageCircle,
      title: "Project Messages",
      description: "Team discussions and updates organized by project"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Assign team members and track who's working on what"
    },
    {
      icon: FolderKanban,
      title: "Project Overview",
      description: "Dashboard view of progress, activity, and deadlines"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </a>
            <Button size="sm" className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6" onClick={() => window.location.href = '/auth'}>
              Try Projects
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Project Management
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Basecamp-style project management. Keep everything organized: todos, docs, schedules, and team discussions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlowCard key={index} glowColor="orange" customSize className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {item.title}
                  </h3>
                  <p className="text-text-2">
                    {item.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
