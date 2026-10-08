import { useEffect, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudioThemeProvider } from "@/components/kamrok/StudioTheme";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { DEFAULT_SHARE_IMAGE } from "@/lib/seo";
import appCss from "../styles.css?url";

const SITE_TITLE = "KAMROK · Lovable Expert & Award-Winning WordPress Designer";
const SITE_DESCRIPTION =
  "Certified Lovable expert and award-winning WordPress designer in Dundalk, Ireland. Thoughtful websites, custom apps, branding and practical AI.";

const SITE_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://kamrok.com/#org",
      name: "KAMROK",
      legalName: "Candy Shop Digital Ltd",
      url: "https://kamrok.com/",
      logo: "https://kamrok.com/kamrok-logo.png",
      email: "cormac@kamrok.com",
      address: { "@type": "PostalAddress", addressLocality: "Dundalk", addressRegion: "Louth", addressCountry: "IE" },
      areaServed: "Ireland",
    },
    {
      "@type": "WebSite",
      "@id": "https://kamrok.com/#website",
      url: "https://kamrok.com/",
      name: "KAMROK",
      publisher: { "@id": "https://kamrok.com/#org" },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" },
      { name: "theme-color", content: "#03060d" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "KAMROK" },
      { name: "google-site-verification", content: "aRA5RiI6wtevxCHZyNWacC45czjv0D2WfLmcVBuQGM0" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: DEFAULT_SHARE_IMAGE },
      { property: "og:image:alt", content: "KAMROK logo with our astronaut chimp in space" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_SHARE_IMAGE },
      { name: "twitter:image:alt", content: "KAMROK logo with our astronaut chimp in space" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap",
      },
      { rel: "apple-touch-icon", href: "/kamrok-logo.png" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(SITE_LD) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <StudioThemeProvider>
          <Outlet />
        </StudioThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <main className="min-h-screen grid place-items-center bg-background text-foreground p-6">
      <div className="max-w-md text-center">
        <h1 className="no-fancy-heading text-2xl font-semibold mb-3">This page didn't load</h1>
        <p className="text-muted-foreground mb-6">Something went wrong on our end. Try again, or head back home.</p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="rounded-md bg-primary text-primary-foreground px-4 py-2"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className="rounded-md border border-border px-4 py-2">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
