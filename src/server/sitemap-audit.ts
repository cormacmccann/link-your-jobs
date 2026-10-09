import { resolve4 } from "node:dns/promises";
import { request as httpsRequest } from "node:https";
import {
  auditSitemap,
  isPublicIPv4,
  publicSiteUrl,
  sameSite,
  type ReadPublicText,
} from "../lib/planner/sitemap";
import type { SitemapAudit } from "../lib/planner/model";

const MAX_BYTES = 600_000;
async function limitedText(response: Response, max: number) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  let size = 0,
    text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return text + decoder.decode();
      size += value.byteLength;
      if (size > max) throw new Error("Response too large.");
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    await reader.cancel();
  }
}

const readPublic: ReadPublicText = async (initial, site, signal) => {
  let url = initial;
  const timeout = AbortSignal.any([signal, AbortSignal.timeout(4000)]);
  for (let redirects = 0; redirects < 3; redirects++) {
    publicSiteUrl(url.href);
    if (!sameSite(url, site)) throw new Error("Off-site redirect blocked.");
    const addresses = await new Promise<string[]>((resolve, reject) => {
      const abort = () => reject(new Error("DNS lookup timed out."));
      if (timeout.aborted) return abort();
      timeout.addEventListener("abort", abort, { once: true });
      resolve4(url.hostname)
        .then(resolve, reject)
        .finally(() => timeout.removeEventListener("abort", abort));
    });
    if (!addresses.length || addresses.some((ip) => !isPublicIPv4(ip)))
      throw new Error("Not a public destination.");
    // Workers fetch cannot reach private networks; no VPC/service bindings are used.
    // On Node, pin the checked address to prevent DNS rebinding between lookup and connection.
    const isWorker =
      typeof navigator !== "undefined" &&
      navigator.userAgent === "Cloudflare-Workers";
    let status: number, location: string | null, body: string;
    if (isWorker) {
      const response = await fetch(url, {
        redirect: "manual",
        signal: timeout,
        headers: {
          Accept: "application/xml,text/xml,text/plain",
          "User-Agent": "KAMROK-SitemapPlanner/1.0",
        },
      });
      status = response.status;
      location = response.headers.get("location");
      body = status === 200 ? await limitedText(response, MAX_BYTES) : "";
      if (status !== 200) await response.body?.cancel();
    } else {
      const result = await new Promise<{
        status: number;
        location: string | null;
        body: string;
      }>((resolve, reject) => {
        const req = httpsRequest(
          url,
          {
            method: "GET",
            signal: timeout,
            agent: false,
            // Connect directly to the validated IP, retain TLS verification against hostname.
            hostname: addresses[0],
            servername: url.hostname,
            headers: {
              Host: url.host,
              Accept: "application/xml,text/xml,text/plain",
              "Accept-Encoding": "identity",
              "User-Agent": "KAMROK-SitemapPlanner/1.0",
            },
          },
          (res) => {
            const chunks: Buffer[] = [];
            let bytes = 0;
            res.on("data", (chunk: Buffer) => {
              bytes += chunk.length;
              if (bytes > MAX_BYTES) {
                res.destroy();
                req.destroy(new Error("Sitemap too large."));
                return;
              }
              chunks.push(chunk);
            });
            res.on("error", reject);
            res.on("end", () =>
              resolve({
                status: res.statusCode || 500,
                location: res.headers.location || null,
                body: Buffer.concat(chunks).toString("utf8"),
              }),
            );
          },
        );
        req.on("error", reject);
        req.end();
      });
      ({ status, location, body } = result);
    }
    if ([301, 302, 303, 307, 308].includes(status) && location) {
      url = new URL(location, url);
      continue;
    }
    if (status !== 200) throw new Error("Sitemap unavailable.");
    return body;
  }
  throw new Error("Too many redirects.");
};

// Small, short-lived caches contain only public sitemap inventories, never visitor details.
const cache = new Map<string, { expires: number; result: SitemapAudit }>();
let active = 0;
let windowStart = 0;
let requests = 0;
export async function handleSitemapAudit(request: Request) {
  const json = (body: unknown, status = 200) =>
    Response.json(body, {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json(
      { error: "Open the planner on this website to run a scan." },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ error: "JSON input required." }, 415);
  if (Date.now() - windowStart > 60000) {
    windowStart = Date.now();
    requests = 0;
  }
  if (active >= 3 || ++requests > 20)
    return json(
      {
        error:
          "The scanner is busy. Please try again in a minute, or use a manual page count.",
      },
      429,
    );
  active++;
  try {
    const data = JSON.parse(
      await limitedText(new Response(request.body), 4096),
    );
    if (!data || typeof data !== "object" || typeof data.url !== "string")
      return json({ error: "Enter your website address." }, 400);
    const url = publicSiteUrl(data.url);
    const cached = cache.get(url.href);
    if (cached && cached.expires > Date.now()) return json(cached.result);
    const result = await auditSitemap(
      url.href,
      readPublic,
      AbortSignal.any([request.signal, AbortSignal.timeout(18000)]),
    );
    if (cache.size >= 20) cache.delete(cache.keys().next().value!);
    cache.set(url.href, { expires: Date.now() + 120000, result });
    return json(result);
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error &&
          !/JSON|Unexpected|Abort/i.test(error.message)
            ? error.message
            : "The scan did not finish. Try again, or enter your page count manually.",
      },
      422,
    );
  } finally {
    active--;
  }
}
