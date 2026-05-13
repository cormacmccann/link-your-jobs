import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";

// Tools Hub
import ToolsHub from "./pages/tools/ToolsHub";
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

// Legacy tool pages (mounted under /tools/*)
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/tools" replace />} />

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
