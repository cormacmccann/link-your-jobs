import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import NotFound from "./pages/NotFound";
import SeoRouteSync from "./components/SeoRouteSync";
import StudioShell from "./components/kamrok/StudioShell";
import { StudioThemeProvider } from "./components/kamrok/StudioTheme";
import StudioHome from "./pages/kamrok/StudioHome";

// Retry a dynamic import once, then hard-reload to recover from stale chunk
// hashes after a new deploy (the old index.js references chunks that no longer exist).
const lazyRetry = <T,>(factory: () => Promise<T>) =>
  lazy(() =>
    (factory() as Promise<any>).catch((err) => {
      const msg = String(err?.message || err);
      const stale = /Importing a module script failed|Failed to fetch dynamically imported module|Unable to preload CSS|ChunkLoadError/i.test(msg);
      if (stale && typeof window !== "undefined" && !sessionStorage.getItem("__chunk_reloaded")) {
        sessionStorage.setItem("__chunk_reloaded", "1");
        window.location.reload();
        return new Promise(() => {}) as any;
      }
      throw err;
    }),
  );

// The playground only downloads after a visitor chooses FUN.
const MoonHome = lazyRetry(() => import("./pages/kamrok/MoonHome"));

const About = lazyRetry(() => import("./pages/kamrok/About"));
const Work = lazyRetry(() => import("./pages/kamrok/Work"));
const TakeawayHub = lazyRetry(() => import("./pages/kamrok/TakeawayHub"));
const Templates = lazyRetry(() => import("./pages/kamrok/Templates"));
const CaseStudy = lazyRetry(() => import("./pages/kamrok/CaseStudy"));
const Skills = lazyRetry(() => import("./pages/kamrok/Skills"));
const Blog = lazyRetry(() => import("./pages/kamrok/Blog"));
const DundalkSeoGuide = lazyRetry(() => import("./pages/kamrok/DundalkSeoGuide"));
const Contact = lazyRetry(() => import("./pages/kamrok/Contact"));

// Tools Hub — every tool is its own chunk
const ToolsHub = lazyRetry(() => import("./pages/tools/ToolsHub"));
const QRCodeGenerator = lazyRetry(() => import("./pages/tools/QRCodeGenerator"));
const PasswordGenerator = lazyRetry(() => import("./pages/tools/PasswordGenerator"));
const UTMBuilder = lazyRetry(() => import("./pages/tools/UTMBuilder"));
const VATCalculator = lazyRetry(() => import("./pages/tools/VATCalculator"));
const EmailSignatureGenerator = lazyRetry(() => import("./pages/tools/EmailSignatureGenerator"));
const InvoiceCreator = lazyRetry(() => import("./pages/tools/InvoiceCreator"));
const QuotationMaker = lazyRetry(() => import("./pages/tools/QuotationMaker"));
const BusinessNameGenerator = lazyRetry(() => import("./pages/tools/BusinessNameGenerator"));
const SocialMediaSizeChecker = lazyRetry(() => import("./pages/tools/SocialMediaSizeChecker"));
const OpenGraphPreview = lazyRetry(() => import("./pages/tools/OpenGraphPreview"));
const HashtagSuggester = lazyRetry(() => import("./pages/tools/HashtagSuggester"));

const PrivacyPolicyBuilder = lazyRetry(() => import("./pages/PrivacyPolicyBuilder"));
const TermsGenerator = lazyRetry(() => import("./pages/TermsGenerator"));
const CookieConsentManager = lazyRetry(() => import("./pages/CookieConsentManager"));
const ChatLeadCapture = lazyRetry(() => import("./pages/ChatLeadCapture"));
const PopupOfferEngine = lazyRetry(() => import("./pages/PopupOfferEngine"));
const BookingsDemos = lazyRetry(() => import("./pages/BookingsDemos"));
const ReviewWidget = lazyRetry(() => import("./pages/ReviewWidget"));
const SocialWall = lazyRetry(() => import("./pages/SocialWall"));
const TrustpilotIntegration = lazyRetry(() => import("./pages/TrustpilotIntegration"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div style={{ minHeight: "100vh", background: "#0c1a1d" }} aria-hidden />
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <StudioThemeProvider>
          <SeoRouteSync />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/fun" element={<MoonHome />} />
              <Route element={<StudioShell />}>
                <Route path="/" element={<StudioHome />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/templates/takeaway-hub" element={<TakeawayHub />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/skills" element={<Skills />} />
<Route path="/blog" element={<Blog />} />
                <Route path="/blog/dundalk-seo-guide" element={<DundalkSeoGuide />} />
                <Route path="/contact" element={<Contact />} />

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
              </Route>
            </Routes>
          </Suspense>
        </StudioThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
