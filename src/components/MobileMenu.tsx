import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-bg-0 border-white/10">
        <nav className="flex flex-col gap-6 mt-8">
          {/* Features Section */}
          <div className="space-y-3">
            <h3 className="font-gobold uppercase text-sm text-text-2 mb-3">Features</h3>
            <a href="/features/crm" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              CRM
            </a>
            <a href="/features/chat" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Chat
            </a>
            <a href="/features/projects" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Projects
            </a>
            <a href="/features/invoicing" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Invoicing
            </a>
            <a href="/features/tools" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Tools
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full font-gobold uppercase"
              onClick={() => {
                closeMenu();
                window.location.href = '/auth';
              }}
            >
              Login
            </Button>
            <Button 
              variant="outline"
              className="w-full border-acc-cyan text-acc-cyan hover:bg-acc-cyan hover:text-bg-0 rounded-full font-gobold uppercase"
              onClick={() => {
                closeMenu();
                window.location.href = '/auth';
              }}
            >
              Sign Up
            </Button>
          </div>

          <Separator className="bg-white/10" />

          {/* Bottom Links */}
          <div className="space-y-3">
            <a href="/services" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Services
            </a>
            <a href="/clients" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Clients
            </a>
            <a href="/contact" onClick={closeMenu} className="block text-text-1 hover:text-acc-violet transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
