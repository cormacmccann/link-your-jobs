import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Auth } from "./components/Auth";
import Clients from "./pages/Clients";
import ToolsHub from "./pages/tools/ToolsHub";
import Features from "./pages/Features";
import PortfolioDetail from "./pages/PortfolioDetail";
import WidgetView from "./pages/WidgetView";
import EmbedWidget from "./pages/EmbedWidget";

// Service Pages
import WebDesign from "./pages/services/WebDesign";
import AppDevelopment from "./pages/services/AppDevelopment";
import GraphicDesign from "./pages/services/GraphicDesign";
import VideoDesign from "./pages/services/VideoDesign";
import Branding from "./pages/services/Branding";

// Feature Pages
import CRM from "./pages/features/CRM";
import Chat from "./pages/features/Chat";
import ProjectsFeature from "./pages/features/Projects";
import Invoicing from "./pages/features/Invoicing";
import Tools from "./pages/features/Tools";

// Help Pages
import HelpCenter from "./pages/help/HelpCenter";
import GettingStarted from "./pages/help/GettingStarted";
import StreamGuide from "./pages/help/StreamGuide";
import TodayGuide from "./pages/help/TodayGuide";
import PeopleGuide from "./pages/help/PeopleGuide";
import ProjectsGuide from "./pages/help/ProjectsGuide";
import DealsGuide from "./pages/help/DealsGuide";
import TasksGuide from "./pages/help/TasksGuide";
import InvoicingGuide from "./pages/help/InvoicingGuide";
import LiveChatGuide from "./pages/help/LiveChatGuide";
import AutomationsGuide from "./pages/help/AutomationsGuide";
import ClientPortalsGuide from "./pages/help/ClientPortalsGuide";
import SettingsGuide from "./pages/help/SettingsGuide";
import FreeToolsGuide from "./pages/help/FreeToolsGuide";
import SuperAdminGuide from "./pages/help/SuperAdminGuide";
import FAQ from "./pages/help/FAQ";

// CRM Pages
import CRMLayout from "./pages/crm/CRMLayout";
import TodayModern from "./pages/crm/TodayModern";
import Stream from "./pages/crm/Stream";
import People from "./pages/crm/People";
import Settings from "./pages/crm/Settings";
import MissionControl from "./pages/crm/MissionControl";
import SuperAdmin from "./pages/crm/SuperAdmin";
import Client from "./pages/crm/Client";
import Quotes from "./pages/crm/Quotes";
import QuoteBuilder from "./pages/crm/QuoteBuilder";
import Contracts from "./pages/crm/Contracts";
import ContractBuilder from "./pages/crm/ContractBuilder";
import CRMCalendar from "./pages/crm/Calendar";
import TimeTracking from "./pages/crm/TimeTracking";

// Public Pages
import QuoteView from "./pages/public/QuoteView";
import ContractSign from "./pages/public/ContractSign";

// Legacy/Tool Pages
import PrivacyPolicyBuilder from "./pages/PrivacyPolicyBuilder";
import TermsGenerator from "./pages/TermsGenerator";
import CookieConsentManager from "./pages/CookieConsentManager";
import ChatLeadCapture from "./pages/ChatLeadCapture";
import PopupOfferEngine from "./pages/PopupOfferEngine";
import BookingsDemos from "./pages/BookingsDemos";
import ReviewWidget from "./pages/ReviewWidget";
import SocialWall from "./pages/SocialWall";
import TrustpilotIntegration from "./pages/TrustpilotIntegration";
import QRCodeGenerator from "./pages/tools/QRCodeGenerator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import UTMBuilder from "./pages/tools/UTMBuilder";
import VATCalculator from "./pages/tools/VATCalculator";
import EmailSignatureGenerator from "./pages/tools/EmailSignatureGenerator";
import InvoiceCreator from "./pages/tools/InvoiceCreator";
import QuotationMaker from "./pages/tools/QuotationMaker";
import BusinessNameGenerator from "./pages/tools/BusinessNameGenerator";
import SocialMediaSizeChecker from "./pages/tools/SocialMediaSizeChecker";
import OpenGraphPreview from "./pages/tools/OpenGraphPreview";
import HashtagSuggester from "./pages/tools/HashtagSuggester";

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
            <Route path="/features" element={<Features />} />
            <Route path="/features/crm" element={<CRM />} />
            <Route path="/features/chat" element={<Chat />} />
            <Route path="/features/projects" element={<ProjectsFeature />} />
            <Route path="/features/invoicing" element={<Invoicing />} />
            <Route path="/features/tools" element={<Tools />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<PortfolioDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Help Center Routes */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/help/getting-started" element={<GettingStarted />} />
            <Route path="/help/stream" element={<StreamGuide />} />
            <Route path="/help/today" element={<TodayGuide />} />
            <Route path="/help/people" element={<PeopleGuide />} />
            <Route path="/help/projects" element={<ProjectsGuide />} />
            <Route path="/help/deals" element={<DealsGuide />} />
            <Route path="/help/tasks" element={<TasksGuide />} />
            <Route path="/help/invoicing" element={<InvoicingGuide />} />
            <Route path="/help/live-chat" element={<LiveChatGuide />} />
            <Route path="/help/automations" element={<AutomationsGuide />} />
            <Route path="/help/client-portals" element={<ClientPortalsGuide />} />
            <Route path="/help/settings" element={<SettingsGuide />} />
            <Route path="/help/free-tools" element={<FreeToolsGuide />} />
            <Route path="/help/super-admin" element={<SuperAdminGuide />} />
            <Route path="/help/faq" element={<FAQ />} />
            
            {/* CRM Routes - Simplified Basecamp-style */}
            <Route path="/crm" element={session ? <CRMLayout /> : <Navigate to="/auth" />}>
              <Route index element={<Navigate to="/crm/stream" />} />
              <Route path="stream" element={<Stream />} />
              <Route path="today" element={<TodayModern />} />
              <Route path="people" element={<People />} />
              <Route path="settings" element={<Settings />} />
              <Route path="mission-control" element={<MissionControl />} />
              <Route path="super-admin" element={<SuperAdmin />} />
              {/* Legacy redirects */}
              <Route path="contacts" element={<Navigate to="/crm/people" />} />
              <Route path="companies" element={<Navigate to="/crm/people" />} />
              <Route path="tasks" element={<Navigate to="/crm/stream" />} />
              <Route path="projects" element={<Navigate to="/crm/stream" />} />
              <Route path="deals" element={<Navigate to="/crm/stream" />} />
              <Route path="dashboard" element={<Navigate to="/crm/stream" />} />
            </Route>

            {/* Legacy Routes */}
            <Route path="/dashboard" element={session ? <Navigate to="/crm/today" /> : <Navigate to="/auth" />} />
            <Route path="/widget/:id" element={session ? <WidgetView /> : <Navigate to="/auth" />} />
            <Route path="/embed/:id" element={<EmbedWidget />} />
            
            {/* Tools Hub */}
            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/utm-builder" element={<UTMBuilder />} />
            <Route path="/tools/vat-calculator" element={<VATCalculator />} />
            <Route path="/tools/email-signature" element={<EmailSignatureGenerator />} />
            <Route path="/tools/invoice-creator" element={<InvoiceCreator />} />
            <Route path="/tools/quotation-maker" element={<QuotationMaker />} />
            <Route path="/tools/business-name-generator" element={<BusinessNameGenerator />} />
            <Route path="/tools/social-post-sizes" element={<SocialMediaSizeChecker />} />
            <Route path="/tools/opengraph-preview" element={<OpenGraphPreview />} />
            <Route path="/tools/hashtag-suggester" element={<HashtagSuggester />} />
            
            {/* Legacy Toolkit Pages */}
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
