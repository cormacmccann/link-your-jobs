import type { Plugin } from "vite";

/** Emit route-specific metadata so share previews work without executing JavaScript. */
export function takeawaySeo(): Plugin {
  return {
    name: "takeaway-landing-metadata",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const title = "Commission-Free Takeaway Website Template | KAMROK";
      const description = "Launch your own takeaway website with Takeaway Hub. Free DIY Lovable template, no KAMROK design fee and 0% order commission. Explore the demo and calculate savings.";
      const url = "https://kamrok.com/templates/takeaway-hub";
      const image = "https://kamrok.com/templates/takeaway-hub/preview.webp";
      let html = String(index.source).replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
      html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`);
      html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`);
      for (const [property, value] of [["og:title", title], ["og:description", description], ["og:url", url], ["og:image", image]]) {
        html = html.replace(new RegExp(`<meta property="${property}"[^>]*>`), `<meta property="${property}" content="${value}">`);
      }
      html = html.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}">`);
      this.emitFile({ type: "asset", fileName: "templates/takeaway-hub/index.html", source: html });
    },
  };
}
