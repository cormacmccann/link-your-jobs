import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import WidgetView from "./pages/WidgetView";
import EmbedWidget from "./pages/EmbedWidget";
import NotFound from "./pages/NotFound";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import PrivacyPolicyBuilder from "./pages/PrivacyPolicyBuilder";
import TermsGenerator from "./pages/TermsGenerator";
import CookieConsentManager from "./pages/CookieConsentManager";
import ChatLeadCapture from "./pages/ChatLeadCapture";
import PopupOfferEngine from "./pages/PopupOfferEngine";
import BookingsDemos from "./pages/BookingsDemos";
import ReviewWidget from "./pages/ReviewWidget";
import SocialWall from "./pages/SocialWall";
import TrustpilotIntegration from "./pages/TrustpilotIntegration";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={session ? <Navigate to="/dashboard" /> : <Index />} />
            <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/widget/:id" element={session ? <WidgetView /> : <Navigate to="/auth" />} />
            <Route path="/embed/:id" element={<EmbedWidget />} />
            
            {/* Toolkit App Pages */}
            <Route path="/tools/privacy-policy-builder" element={<PrivacyPolicyBuilder />} />
            <Route path="/tools/terms-generator" element={<TermsGenerator />} />
            <Route path="/tools/cookie-consent-manager" element={<CookieConsentManager />} />
            <Route path="/tools/chat-lead-capture" element={<ChatLeadCapture />} />
            <Route path="/tools/popup-offer-engine" element={<PopupOfferEngine />} />
            <Route path="/tools/bookings-demos" element={<BookingsDemos />} />
            <Route path="/tools/review-widget" element={<ReviewWidget />} />
            <Route path="/tools/social-wall" element={<SocialWall />} />
            <Route path="/tools/trustpilot-integration" element={<TrustpilotIntegration />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
