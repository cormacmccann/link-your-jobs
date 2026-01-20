import { Link } from "react-router-dom";
import { Search, ChevronDown, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import kamrokLogo from "@/assets/kamrok-logo.png";
import { useState } from "react";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "tips" | "announcements" | "showcase";
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Neon Design",
      excerpt: "Exploring the intersection of high-contrast aesthetics and modern digital marketing strategies for the next generation of tech giants.",
      category: "showcase",
      date: "March 14, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format",
      featured: true
    },
    {
      id: "2",
      title: "5 Tips for Digital Growth",
      excerpt: "Learn how to scale your brand with these proven digital strategies used by top tech startups.",
      category: "tips",
      date: "March 12, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format"
    },
    {
      id: "3",
      title: "New Studio Launch",
      excerpt: "We are moving! Check out our new high-tech workspace in the heart of the city designed for creativity.",
      category: "announcements",
      date: "March 08, 2024",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format"
    },
    {
      id: "4",
      title: "Client Showcase: X-Tech",
      excerpt: "A deep dive into our latest design overhaul for the global tech giant X-Tech.",
      category: "showcase",
      date: "March 01, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format"
    },
    {
      id: "5",
      title: "Color Theory in Dark Mode",
      excerpt: "Why high-contrast palettes are dominating the 2024 UI/UX landscape.",
      category: "tips",
      date: "Feb 24, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format"
    },
    {
      id: "6",
      title: "We're Hiring Designers",
      excerpt: "Join our mission to redefine the digital experience. We are looking for bold creators.",
      category: "announcements",
      date: "Feb 15, 2024",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format"
    },
  ];

  const filters = [
    { id: "all", label: "All", color: "bg-accent-pink" },
    { id: "announcements", label: "Announcements", color: "bg-accent-pink" },
    { id: "tips", label: "Tips", color: "bg-accent-cyan" },
    { id: "showcase", label: "Showcase", color: "bg-accent-violet" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tips": return "bg-accent-cyan text-background";
      case "announcements": return "bg-accent-pink text-white";
      case "showcase": return "bg-accent-violet text-white";
      default: return "bg-accent-pink text-white";
    }
  };

  const getCategoryHoverColor = (category: string) => {
    switch (category) {
      case "tips": return "group-hover:text-accent-cyan";
      case "announcements": return "group-hover:text-accent-pink";
      case "showcase": return "group-hover:text-accent-violet";
      default: return "group-hover:text-accent-pink";
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    activeFilter === "all" || post.category === activeFilter
  );

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-lg bg-background/80">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3">
              <img src={kamrokLogo} alt="KAMROK" className="h-8" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/clients" className="text-sm font-semibold hover:text-accent-pink transition-colors">Work</Link>
              <Link to="/blog" className="text-sm font-semibold text-accent-pink">Blog</Link>
              <Link to="/services/web-design" className="text-sm font-semibold hover:text-accent-pink transition-colors">Services</Link>
              <Link to="/tools" className="text-sm font-semibold hover:text-accent-pink transition-colors">Tools</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search insights..." 
                className="bg-card border-border pl-10 w-64 focus:border-accent-pink"
              />
            </div>
            <Button asChild className="bg-accent-pink hover:bg-accent-pink/90 text-white font-bold transform hover:scale-105 transition-all">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Hero Section: Featured Post */}
        {featuredPost && (
          <section className="mb-20">
            <motion.div 
              className="relative group overflow-hidden rounded-xl aspect-[21/9]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(7, 9, 14, 0.95) 30%, rgba(7, 9, 14, 0.2) 100%), url("${featuredPost.image}")`
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-accent-pink text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Featured</span>
                  <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">{featuredPost.date}</span>
                </div>
                <h1 className="text-white text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-6 uppercase">
                  The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan">Neon Design</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <Button className="bg-foreground text-background hover:bg-accent-pink hover:text-white px-8 py-6 rounded-lg font-bold text-sm uppercase tracking-widest transition-all">
                    Read Insight
                  </Button>
                  <span className="text-muted-foreground text-sm font-medium italic">{featuredPost.readTime}</span>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Category Filters */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "ghost"}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
                  activeFilter === filter.id 
                    ? "bg-accent-pink text-white" 
                    : "bg-card hover:bg-accent-pink/20 hover:text-accent-pink"
                }`}
              >
                {filter.id !== "all" && (
                  <span className={`size-2 rounded-full ${filter.color}`}></span>
                )}
                {filter.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Article Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured).map((post, index) => (
            <motion.article 
              key={post.id}
              className="flex flex-col group border border-transparent hover:border-accent-violet/50 hover:shadow-[0_0_20px_rgba(124,92,255,0.1)] transition-all rounded-xl p-2 bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg mb-6 relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${getCategoryColor(post.category)} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm`}>
                    {post.category}
                  </span>
                </div>
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${post.image}")` }}
                />
              </div>
              <div className="px-4 pb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{post.date}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    post.category === "tips" ? "text-accent-cyan" : 
                    post.category === "announcements" ? "text-accent-pink" : "text-accent-violet"
                  }`}>
                    {post.readTime}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${getCategoryHoverColor(post.category)} transition-colors uppercase tracking-tight`}>
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Pagination */}
        <div className="mt-20 flex justify-center">
          <Button variant="outline" className="group flex items-center gap-4 border-border px-12 py-6 rounded-lg hover:border-accent-pink transition-all">
            <span className="text-sm font-black uppercase tracking-[0.2em] group-hover:text-accent-pink">Load More Insights</span>
            <ChevronDown className="w-5 h-5 text-accent-pink group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border py-12 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={kamrokLogo} alt="KAMROK" className="h-6" />
          </Link>
          <div className="flex gap-12">
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-accent-cyan transition-colors flex items-center gap-2">
              <Twitter className="w-4 h-4" /> Twitter
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-accent-cyan transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-accent-cyan transition-colors flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            © 2024 KAMROK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
