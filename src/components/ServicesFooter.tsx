import { Link } from "react-router-dom";
import { Monitor, Smartphone, Palette, Video, Target, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import kamrokLogo from "@/assets/kamrok-logo.png";

const ServicesFooter = () => {
  const services = [
    { name: "Web Design", path: "/services/web-design", icon: Monitor },
    { name: "App Development", path: "/services/app-development", icon: Smartphone },
    { name: "Graphic Design", path: "/services/graphic-design", icon: Palette },
    { name: "Video Design", path: "/services/video-design", icon: Video },
    { name: "Branding", path: "/services/branding", icon: Target },
  ];

  return (
    <footer className="border-t border-border/30 bg-bg-1/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            <p className="text-text-2 text-sm leading-relaxed">
              Creating exceptional digital experiences that drive business growth. Your trusted partner for web design, app development, and branding.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-gobold uppercase text-text-1 mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.path}>
                    <Link
                      to={service.path}
                      className="flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors text-sm group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-gobold uppercase text-text-1 mb-4">Pricing</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-text-2">
                <span>Free Consultation</span>
                <span className="text-accent-cyan font-medium">Free</span>
              </li>
              <li className="flex justify-between text-text-2">
                <span>Web Design</span>
                <span className="text-accent-cyan font-medium">€3,500</span>
              </li>
              <li className="flex justify-between text-text-2">
                <span>WordPress + eCommerce</span>
                <span className="text-accent-cyan font-medium">€4,500</span>
              </li>
              <li className="flex justify-between text-text-2">
                <span>Shopify Support & Build</span>
                <span className="text-accent-cyan font-medium">€3,500</span>
              </li>
              <li className="flex justify-between text-text-2">
                <span>Custom Projects</span>
                <span className="text-accent-cyan font-medium">From €5,500</span>
              </li>
            </ul>
            <p className="text-xs text-accent-pink mt-3 italic">Payment plans available</p>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="text-lg font-gobold uppercase text-text-1 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <a
                  href="mailto:hello@kamrok.com"
                  className="flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  hello@kamrok.com
                </a>
                <a
                  href="tel:+353123456789"
                  className="flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +353 12 345 6789
                </a>
              </div>
              <Link to="/contact">
                <Button className="w-full bg-accent-violet hover:bg-accent-violet/90 text-white rounded-full">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-2">
            <p>&copy; {new Date().getFullYear()} KAMROK. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent-violet transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent-violet transition-colors">
                Terms of Service
              </Link>
              <Link to="/services" className="hover:text-accent-violet transition-colors">
                All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ServicesFooter;
