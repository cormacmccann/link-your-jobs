import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WebDesign from "./pages/services/WebDesign";
import AppDevelopment from "./pages/services/AppDevelopment";
import GraphicDesign from "./pages/services/GraphicDesign";
import VideoDesign from "./pages/services/VideoDesign";
import Branding from "./pages/services/Branding";
import WidgetView from "./pages/WidgetView";
import EmbedWidget from "./pages/EmbedWidget";
import NotFound from "./pages/NotFound";
import { Auth } from "./components/Auth";
import CRMLayout from "./pages/crm/CRMLayout";
import TodayModern from "./pages/crm/TodayModern";
import Dashboard from "./pages/crm/Dashboard";
import Stream from "./pages/crm/Stream";
import Contacts from "./pages/crm/Contacts";
import Companies from "./pages/crm/Companies";
import Conversations from "./pages/crm/Conversations";
import Deals from "./pages/crm/Deals";
import Invoices from "./pages/crm/Invoices";
import Calendar from "./pages/crm/Calendar";
import Tasks from "./pages/crm/Tasks";
import Projects from "./pages/crm/Projects";
import Automations from "./pages/crm/Automations";
import Insights from "./pages/crm/Insights";
import Extras from "./pages/crm/Extras";
import Settings from "./pages/crm/Settings";
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
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-design" element={<WebDesign />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/graphic-design" element={<GraphicDesign />} />
            <Route path="/services/video-design" element={<VideoDesign />} />
            <Route path="/services/branding" element={<Branding />} />
            
            {/* CRM Routes */}
            <Route path="/crm" element={session ? <CRMLayout /> : <Navigate to="/auth" />}>
              <Route index element={<Navigate to="/crm/today" />} />
              <Route path="today" element={<TodayModern />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="companies" element={<Companies />} />
              <Route path="conversations" element={<Conversations />} />
              <Route path="deals" element={<Deals />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="projects" element={<Projects />} />
              <Route path="automations" element={<Automations />} />
              <Route path="insights" element={<Insights />} />
              <Route path="extras" element={<Extras />} />
              <Route path="settings" element={<Settings />} />
              {/* Legacy routes */}
              <Route path="stream" element={<Stream />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            {/* Legacy Routes */}
            <Route path="/dashboard" element={session ? <Navigate to="/crm/today" /> : <Navigate to="/auth" />} />
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
