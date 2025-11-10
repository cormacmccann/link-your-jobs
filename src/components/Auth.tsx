import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { DotMap } from "@/components/ui/dot-map";
import { useState, useRef, useEffect } from "react";
import kamrokLogo from "@/assets/kamrok-logo.png";
export const Auth = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5
    }} className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-card text-foreground shadow-2xl border border-border">
        {/* Left side - Map */}
        <div className="hidden md:block w-1/2 h-[600px] relative overflow-hidden border-r border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted">
            {/* Video Background */}
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
              <source src="/kamrok-login-video.mp4" type="video/mp4" />
            </video>
            <DotMap />
            
            {/* Logo and text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
              <motion.div initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6,
              duration: 0.5
            }} className="mb-6">
                
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7,
              duration: 0.5
            }} className="mb-2 flex justify-center">
                <img src={kamrokLogo} alt="Kamrok Logo" className="h-16 w-auto" />
              </motion.div>
              <motion.p initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8,
              duration: 0.5
            }} className="text-sm text-center text-muted-foreground max-w-xs">
                Sign in to access your career dashboard and manage your widgets
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-card">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mb-8">Sign in to your account</p>
            
            <div className="[&_.supabase-auth-ui_button]:w-full [&_.supabase-auth-ui_button]:transition-all [&_.supabase-auth-ui_button]:duration-300 [&_.supabase-auth-ui_button]:bg-gradient-to-r [&_.supabase-auth-ui_button]:from-orange-500 [&_.supabase-auth-ui_button]:via-red-500 [&_.supabase-auth-ui_button]:to-amber-600 [&_.supabase-auth-ui_button]:hover:from-orange-600 [&_.supabase-auth-ui_button]:hover:via-red-600 [&_.supabase-auth-ui_button]:hover:to-amber-700 [&_.supabase-auth-ui_button]:shadow-lg [&_.supabase-auth-ui_button]:shadow-orange-500/30 [&_.supabase-auth-ui_button]:hover:shadow-xl [&_.supabase-auth-ui_button]:hover:shadow-red-500/40 [&_.supabase-auth-ui_button]:border-0">
              <SupabaseAuth supabaseClient={supabase} appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(25 95% 53%)',
                    brandAccent: 'hsl(0 84% 60%)',
                    inputBackground: 'hsl(var(--card))',
                    inputText: 'hsl(var(--foreground))',
                    inputBorder: 'hsl(var(--border))',
                    inputBorderFocus: 'hsl(25 95% 53%)',
                    inputBorderHover: 'hsl(var(--border))'
                  }
                }
              },
              className: {
                button: 'text-white font-semibold',
                input: 'bg-card border-border text-foreground',
                label: 'text-foreground'
              }
            }} providers={['google']} redirectTo={window.location.origin} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>;
};