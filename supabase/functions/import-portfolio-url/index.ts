import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!FIRECRAWL_API_KEY) {
      return new Response(JSON.stringify({ error: "Firecrawl API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Scraping URL:", url);

    // Step 1: Scrape website with Firecrawl for branding, screenshot, and content
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "screenshot", "branding"],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    if (!scrapeResponse.ok) {
      const errorText = await scrapeResponse.text();
      console.error("Firecrawl error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to scrape website" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const scrapeData = await scrapeResponse.json();
    console.log("Scrape successful, generating brief...");

    // Extract data from scrape
    const markdown = scrapeData.data?.markdown || "";
    const screenshot = scrapeData.data?.screenshot || null;
    const branding = scrapeData.data?.branding || {};
    const metadata = scrapeData.data?.metadata || {};
    
    // Get logo from branding or metadata
    const logoUrl = branding?.images?.logo || branding?.logo || metadata?.ogImage || null;
    const siteName = metadata?.title || new URL(url).hostname;

    // Step 2: Generate AI brief using Lovable AI
    let brief = "";
    if (LOVABLE_API_KEY && markdown) {
      try {
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content: "You are a creative agency copywriter. Write concise, professional portfolio descriptions. Focus on what the business does, their industry, and key offerings. Keep it under 100 words."
              },
              {
                role: "user",
                content: `Write a brief portfolio description for this website. Company name: ${siteName}\nWebsite URL: ${url}\n\nWebsite content:\n${markdown.slice(0, 3000)}`
              }
            ],
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          brief = aiData.choices?.[0]?.message?.content || "";
        }
      } catch (aiError) {
        console.error("AI brief generation error:", aiError);
      }
    }

    // Extract colors if available
    const colors = branding?.colors || {};
    const industry = detectIndustry(markdown, metadata);

    return new Response(JSON.stringify({
      success: true,
      data: {
        client_name: siteName,
        client_url: url,
        logo_url: logoUrl,
        screenshot: screenshot,
        description: brief,
        industry,
        colors,
        branding,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Import error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function detectIndustry(content: string, metadata: any): string {
  const text = `${content} ${metadata?.description || ""} ${metadata?.title || ""}`.toLowerCase();
  
  const industries: Record<string, string[]> = {
    "Technology": ["software", "tech", "app", "saas", "digital", "platform", "ai", "cloud"],
    "E-commerce": ["shop", "store", "buy", "cart", "product", "price", "shipping"],
    "Healthcare": ["health", "medical", "doctor", "patient", "clinic", "hospital", "care"],
    "Finance": ["bank", "financial", "investment", "money", "loan", "insurance", "trading"],
    "Education": ["learn", "course", "school", "university", "training", "education", "student"],
    "Real Estate": ["property", "real estate", "home", "house", "rent", "apartment"],
    "Food & Beverage": ["restaurant", "food", "menu", "dining", "cafe", "delivery"],
    "Hospitality": ["hotel", "resort", "booking", "accommodation", "travel", "vacation"],
    "Construction": ["construction", "building", "contractor", "engineering", "architecture"],
    "Retail": ["retail", "fashion", "clothing", "accessories", "brand", "style"],
  };

  for (const [industry, keywords] of Object.entries(industries)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return industry;
    }
  }
  
  return "Services";
}
