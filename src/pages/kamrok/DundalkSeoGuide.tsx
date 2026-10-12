import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Search,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import ResponsiveImage from "@/components/kamrok/ResponsiveImage";
import { seoGuideImages } from "@/assets/blog/seoGuideImages";
import "@/styles/seo-guide.css";

const STEPS = [
  {
    id: "claim",
    label: "Claim your profile",
    done: "My profile is claimed and verified.",
  },
  {
    id: "details",
    label: "Get the details right",
    done: "My name, category, hours, phone and website are correct.",
  },
  {
    id: "photos",
    label: "Show the real business",
    done: "My photos show the real place, people or work.",
  },
  {
    id: "reviews",
    label: "Ask for honest reviews",
    done: "I have a review link and a fair way to ask customers.",
  },
  {
    id: "website",
    label: "Make your website clear",
    done: "My website explains my services, location and how to get in touch.",
  },
  {
    id: "measure",
    label: "Check what works",
    done: "I know where to check activity and record enquiries.",
  },
];
const REVIEW_REQUEST =
  "Hi [name], thanks for choosing [business]. If you’d like to share your experience, you can leave an honest Google review here: [review link]. Thank you for your time.";
const GOOGLE_IMAGES = "https://business.google.com/us/business-profile/";

function ClickPath({ children }: { children: ReactNode }) {
  return (
    <div className="seo-click-path">
      <span>Where to click</span>
      <p>{children}</p>
    </div>
  );
}
function Done({ children }: { children: ReactNode }) {
  return (
    <p className="seo-done">
      <Check size={17} aria-hidden="true" />
      <span>
        <strong>Done when:</strong> {children}
      </span>
    </p>
  );
}
function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="seo-source" href={href}>
      {children} <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
function Step({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="seo-step"
      id={STEPS[index]!.id}
      aria-labelledby={`${STEPS[index]!.id}-title`}
    >
      <div className="seo-step-heading">
        <span className="seo-step-number">0{index + 1}</span>
        <h2 id={`${STEPS[index]!.id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function DundalkSeoGuide() {
  const [copyStatus, setCopyStatus] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  async function copyReviewRequest() {
    try {
      await navigator.clipboard.writeText(REVIEW_REQUEST);
      setCopyStatus("Copied. Replace the bracketed details before sending.");
    } catch {
      setCopyStatus("Select the message above and copy it manually.");
    }
  }
  return (
    <article className="seo-guide studio-container">
      <header className="seo-hero">
        <div>
          <Link className="seo-back" to="/blog">
            ← Field notes
          </Link>
          <p className="seo-eyebrow">THE PRACTICAL GUIDE / DUNDALK & LOUTH</p>
          <h1>How to get found on Google in Dundalk.</h1>
          <p className="seo-intro">
            Make it easier for nearby customers to find you, understand what you
            do and get in touch. Six steps, real examples and a checklist you
            can work through yourself.
          </p>
          <p className="seo-byline">
            By Cormac McCann · Updated{" "}
            <time dateTime="2026-10-12">12 October 2026</time>
          </p>
          <a className="seo-button" href="#claim">
            Start with your profile <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <figure className="seo-hero-figure">
          <div className="seo-image-stage">
            <ResponsiveImage
              variants={seoGuideImages.profile}
              mobileMax={480}
              sizes="(max-width: 760px) 92vw, 46vw"
              width={1774}
              height={1274}
              fetchPriority="high"
              alt="Google’s example of a business listing beside a map pin, with photos, contact details and opening hours."
            />
          </div>
          <figcaption>
            A Business Profile is the listing people see in Search and Maps.{" "}
            <a href={GOOGLE_IMAGES}>Illustrative example by Google.</a>
          </figcaption>
        </figure>
      </header>

      <nav className="seo-contents" aria-label="In this guide">
        <span>YOUR SIX STEPS</span>
        <ol>
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <a href={`#${step.id}`}>
                <span>0{index + 1}</span>
                {step.label}
              </a>
            </li>
          ))}
        </ol>
        <a className="seo-checklist-link" href="#checklist">
          Jump to the checklist ↗
        </a>
      </nav>

      <div className="seo-foundations">
        <div>
          <MapPin aria-hidden="true" />
          <h2>Your Google profile</h2>
          <p>
            Your business listing on Maps and in Search. Customers can find your
            hours, call or get directions.
          </p>
        </div>
        <div>
          <Search aria-hidden="true" />
          <h2>Your website</h2>
          <p>
            Your own pages explain your services in detail. They can appear as
            website links in search results.
          </p>
        </div>
        <p className="seo-foundations-note">
          Local SEO simply means helping your business appear in relevant nearby
          searches. Work on both of these. Neither guarantees a particular
          position.
        </p>
      </div>

      <div className="seo-reading-note">
        Before you start: sign in to the Google account you want to use for the
        business. Google’s buttons can vary between Search, Maps and devices;
        the paths below use the Search version.
      </div>

      <Step index={0} title="Claim it. Then verify it.">
        <div className="seo-step-grid">
          <div className="seo-copy">
            <p>
              Search Google Maps for your business name and town. Check for an
              existing listing before creating another one.
            </p>
            <ol>
              <li>
                <strong>Already listed?</strong> Open it and choose{" "}
                <strong>Claim this business → Manage now</strong>, if available.
              </li>
              <li>
                <strong>No listing?</strong> Go to{" "}
                <a href="https://business.google.com/add">
                  Google’s add-business page
                </a>{" "}
                and follow the setup steps.
              </li>
              <li>
                <strong>Someone else manages it?</strong> Request ownership
                through Google instead of making a duplicate.
              </li>
            </ol>
            <p>
              Google chooses the verification options available to you. Complete
              the method it offers; you cannot always choose a different one.
            </p>
            <Done>
              you can manage the profile and Google confirms verification.
            </Done>
            <Source href="https://support.google.com/business/answer/2911778?hl=en">
              Google: add or claim a profile
            </Source>
            <Source href="https://support.google.com/business/answer/7107242?hl=en">
              Google: verification
            </Source>
          </div>
          <aside className="seo-example seo-eligibility">
            <span className="seo-example-label">CHECK THIS FIRST</span>
            <h3>Does your business qualify?</h3>
            <div>
              <span className="seo-signal">01</span>
              <p>
                <strong>Customers visit you</strong>
                <br />
                Use your genuine, eligible business location.
              </p>
            </div>
            <div>
              <span className="seo-signal">02</span>
              <p>
                <strong>You visit or deliver to customers</strong>
                <br />A qualifying service-area business can hide its home
                address and list the areas it serves.
              </p>
            </div>
            <div>
              <span className="seo-signal">03</span>
              <p>
                <strong>You operate entirely online</strong>
                <br />
                Online-only businesses are not eligible for a Business Profile.
                Focus on your website instead.
              </p>
            </div>
            <Source href="https://support.google.com/business/answer/3038177?hl=en">
              Google: eligibility and address rules
            </Source>
          </aside>
        </div>
      </Step>

      <Step index={1} title="Tell people exactly what you do.">
        <div className="seo-step-grid">
          <div className="seo-copy">
            <ClickPath>
              Your Business Profile → <strong>Edit profile</strong> → make
              changes → <strong>Save</strong>
            </ClickPath>
            <p>
              Use the business name customers recognise from your signage and
              branding. Adding “best in Dundalk” to the name field is not a
              shortcut.
            </p>
            <ul>
              <li>
                <strong>Category:</strong> choose the most specific category
                that describes your main business.
              </li>
              <li>
                <strong>Phone and website:</strong> check both yourself. Do they
                reach the right place?
              </li>
              <li>
                <strong>Hours:</strong> include special hours for holidays and
                closures.
              </li>
              <li>
                <strong>Location:</strong> show the correct address or the towns
                you actually travel to or deliver in.
              </li>
            </ul>
            <p>
              For the description, say what you do, where you do it and who you
              help. Keep it factual; Google allows up to 750 characters and no
              links.
            </p>
            <Done>
              a customer can understand the business and contact you without
              guessing.
            </Done>
            <Source href="https://support.google.com/business/answer/3039617?hl=en">
              Google: edit your business information
            </Source>
          </div>
          <div className="seo-example seo-before-after">
            <span className="seo-example-label">
              DESCRIPTION / WORKED EXAMPLE
            </span>
            <div>
              <span className="seo-example-label">TOO VAGUE</span>
              <p>
                “Innovative digital solutions that help your business reach the
                next level.”
              </p>
            </div>
            <div>
              <span className="seo-example-label">
                SAY WHAT YOU ACTUALLY DO
              </span>
              <p>
                “KAMROK is a design studio based in Dundalk, Co. Louth. We
                design and build WordPress websites, custom apps and brand
                identities for businesses in Louth and beyond.”
              </p>
            </div>
            <p className="seo-example-note">
              Service + location + audience. Use your own details, in your own
              words.
            </p>
          </div>
        </div>
      </Step>

      <Step index={2} title="Show the place. Show the work.">
        <div className="seo-step-grid seo-photo-grid">
          <div className="seo-copy">
            <ClickPath>
              Your Business Profile → <strong>Photos</strong> → add your images
            </ClickPath>
            <p>
              Help someone recognise you before they arrive, or understand the
              work before they enquire. Start with three useful subjects:
            </p>
            <ol>
              <li>
                <strong>The outside:</strong> entrance, sign or shopfront. What
                should they look for?
              </li>
              <li>
                <strong>The people or space:</strong> your team, workshop, salon
                or counter.
              </li>
              <li>
                <strong>The finished work:</strong> a recent job, product or
                service in action.
              </li>
            </ol>
            <p>
              A clear phone photo is fine. Use images of the actual business,
              with permission from anyone featured. Stock photos and invented
              premises do not help someone recognise you.
            </p>
            <Done>
              the photos answer “is this the right place or business for me?”
            </Done>
            <Source href="https://support.google.com/business/answer/3039617?hl=en">
              Google: business photos and profile details
            </Source>
          </div>
          <figure className="seo-real-photo">
            <ResponsiveImage
              variants={seoGuideImages.sign}
              mobileMax={480}
              sizes="(max-width: 760px) 85vw, 32vw"
              width={800}
              height={1067}
              loading="lazy"
              decoding="async"
              alt="McKevitt’s stag logo and hotel, restaurant and bar lettering installed on the purple exterior wall at night."
            />
            <figcaption>
              <strong>A useful photo has a job to do.</strong> This sign helps a
              visitor recognise McKevitt’s when they arrive. Photo from our{" "}
              <Link to="/work/mckevitts">McKevitt’s branding project</Link>;
              shown here as a photography example.
            </figcaption>
          </figure>
        </div>
      </Step>

      <Step index={3} title="Make an honest review easy.">
        <div className="seo-step-grid">
          <div className="seo-copy">
            <ClickPath>
              Your Business Profile → <strong>Read reviews</strong> →{" "}
              <strong>Get more reviews</strong> → <strong>Copy</strong>
            </ClickPath>
            <p>
              That gives you a direct review link. Include it in a normal
              follow-up or receipt so customers do not have to hunt for your
              listing.
            </p>
            <p>
              Ask customers consistently for an honest account of their
              experience. Do not offer discounts or rewards, or ask only the
              people you expect to give five stars.
            </p>
            <div className="seo-message">
              <span className="seo-example-label">A MESSAGE YOU CAN ADAPT</span>
              <blockquote>{REVIEW_REQUEST}</blockquote>
              <button
                className="seo-button seo-button-small"
                type="button"
                onClick={copyReviewRequest}
              >
                Copy message <Copy size={15} aria-hidden="true" />
              </button>
              <p className="seo-copy-status" role="status">
                {copyStatus}
              </p>
            </div>
            <p>
              Reply briefly and personally. Thank the customer, acknowledge
              specific feedback and offer a useful next step when something went
              wrong.
            </p>
            <Done>
              you have tested your review link and have a fair way to ask
              customers.
            </Done>
            <Source href="https://support.google.com/business/answer/16816815">
              Google: find your review link
            </Source>
            <Source href="https://support.google.com/business/answer/3474122?hl=en">
              Google: reviews and replies
            </Source>
          </div>
          <figure className="seo-demo-figure">
            <div className="seo-image-stage">
              <ResponsiveImage
                variants={seoGuideImages.reviews}
                mobileMax={480}
                sizes="(max-width: 760px) 92vw, 43vw"
                width={1774}
                height={1274}
                loading="lazy"
                decoding="async"
                alt="Google’s illustrative customer review card with a short reply from the business owner."
              />
            </div>
            <figcaption>
              A review and an owner reply.{" "}
              <a href={GOOGLE_IMAGES}>Google’s example</a>, not a KAMROK
              customer review.
            </figcaption>
          </figure>
        </div>
      </Step>

      <Step index={4} title="Make the website just as clear.">
        <div className="seo-step-grid">
          <div className="seo-copy">
            <p>
              Your website needs to explain the service and location in readable
              text. Someone arriving from Google should quickly know what you
              offer and how to contact you.
            </p>
            <ol>
              <li>
                <strong>Write a useful page title.</strong> Include the main
                service, the genuine location and your business name where it
                makes sense.
              </li>
              <li>
                <strong>Explain the service on the page.</strong> Add relevant
                work, areas covered, practical details and answers to customer
                questions.
              </li>
              <li>
                <strong>Make the next step obvious.</strong> Provide a working
                contact form or clickable phone number, with accurate business
                details.
              </li>
            </ol>
            <p>
              In WordPress, the search title and description are usually edited
              through your SEO plugin. Other builders have a page SEO panel. If
              you cannot find it, ask whoever manages your website.
            </p>
            <p>
              A useful local page has something to say about that service in
              that place. Swapping town names across otherwise identical pages
              is not a content strategy. See our{" "}
              <Link to="/web-design-dundalk">Dundalk web design page</Link> for
              an example.
            </p>
            <Done>
              the page title, heading, content and contact details tell a clear,
              consistent story.
            </Done>
            <Source href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">
              Google: website SEO basics
            </Source>
          </div>
          <div className="seo-example seo-search-example">
            <span className="seo-example-label">
              SEARCH TITLE / ILLUSTRATIVE PREVIEW
            </span>
            <div className="seo-search-result">
              <span>example.ie</span>
              <h3>Home | Your Business</h3>
              <p>
                Welcome to our website. We offer a wide range of professional
                solutions.
              </p>
            </div>
            <span className="seo-search-arrow">↓ Make it specific</span>
            <div className="seo-search-result">
              <span>example.ie</span>
              <h3>Electrician in Dundalk | Your Business</h3>
              <p>
                Electrical repairs and installations for homes in Dundalk and
                Blackrock. See our services and contact the team about your job.
              </p>
            </div>
            <p className="seo-example-note">
              A fictional example. Only describe services and areas you really
              cover. Google may choose a different title or snippet.
            </p>
          </div>
        </div>
        <details className="seo-disclosure">
          <summary>What if my website does not appear on Google?</summary>
          <p>
            Set up{" "}
            <a href="https://search.google.com/search-console">
              Google Search Console
            </a>{" "}
            and verify your website. Paste the full page URL into the inspection
            bar to see whether Google has indexed it. If the page is ready and
            accessible, you can request indexing. A request does not guarantee
            inclusion or a ranking.
          </p>
          <Source href="https://support.google.com/webmasters/answer/9012289?hl=en">
            Google: inspect a URL
          </Source>
        </details>
      </Step>

      <Step index={5} title="Look at enquiries, not just positions.">
        <div className="seo-step-grid">
          <div className="seo-copy">
            <ClickPath>
              Your verified Business Profile → <strong>Performance</strong> →
              choose a date range → <strong>Apply</strong>
            </ClickPath>
            <p>
              Check which interactions are available for your business and
              compare similar periods. Calls here means clicks on the call
              button; website clicks are not the same as bookings.
            </p>
            <p>
              Keep your own simple enquiry record too: date, service requested
              and how the person found you. That tells you more about business
              value than a search position checked on your own phone.
            </p>
            <h3>A sensible monthly routine</h3>
            <ul>
              <li>Check hours, contact details and website links.</li>
              <li>Reply to new reviews and add useful recent photos.</li>
              <li>Compare profile activity and actual enquiries.</li>
            </ul>
            <Done>
              you can tell whether people are contacting you, and keep the
              details current.
            </Done>
            <Source href="https://support.google.com/business/answer/9918094?hl=en">
              Google: understand performance metrics
            </Source>
          </div>
          <figure className="seo-demo-figure">
            <div className="seo-image-stage">
              <ResponsiveImage
                variants={seoGuideImages.performance}
                mobileMax={480}
                sizes="(max-width: 760px) 92vw, 43vw"
                width={1392}
                height={1005}
                loading="lazy"
                decoding="async"
                alt="Google’s sample Business Profile performance dashboard, showing a date range, chart and search activity."
              />
            </div>
            <figcaption>
              <a href={GOOGLE_IMAGES}>Google’s sample dashboard.</a> These are
              demonstration figures, not results from KAMROK or a client.
            </figcaption>
          </figure>
        </div>
        <div className="seo-ranking-note">
          <strong>About rankings:</strong> Google says local results mainly
          depend on relevance, distance and prominence. A complete profile helps
          explain your business; it does not remove the effect of location or
          competition. You cannot pay Google for a better organic local ranking.{" "}
          <a href="https://support.google.com/business/answer/7091?hl=en">
            Read Google’s local ranking guidance.
          </a>
        </div>
      </Step>

      <section
        className="seo-checklist"
        id="checklist"
        aria-labelledby="checklist-title"
      >
        <div>
          <p className="seo-eyebrow">PUT IT INTO PRACTICE</p>
          <h2 id="checklist-title">Your local search checklist.</h2>
          <p>
            Work through one thing at a time. Your ticks stay here while this
            page is open.
          </p>
          <p className="seo-progress" role="status">
            {completed.length} of {STEPS.length} complete
          </p>
          <progress
            value={completed.length}
            max={STEPS.length}
            aria-label="Checklist progress"
          />
        </div>
        <div className="seo-checklist-items">
          {STEPS.map((step) => (
            <div className="seo-checklist-row" key={step.id}>
              <label>
                <input
                  type="checkbox"
                  checked={completed.includes(step.id)}
                  onChange={(event) =>
                    setCompleted((current) =>
                      event.target.checked
                        ? [...current, step.id]
                        : current.filter((id) => id !== step.id),
                    )
                  }
                />
                <span>{step.done}</span>
              </label>
              <a href={`#${step.id}`} aria-label={`Revisit: ${step.label}`}>
                ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="seo-guide-footer">
        <p className="seo-eyebrow">NEED A HAND WITH THE WEBSITE?</p>
        <h2>Start with a clear foundation.</h2>
        <p>
          I’m Cormac, at KAMROK in Dundalk. We build websites, apps and brand
          identities. If your website needs clearer content, a better mobile
          experience or a rebuild, let’s talk through what it needs.
        </p>
        <div>
          <Link className="seo-button" to="/contact">
            Talk to Cormac <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link className="seo-text-link" to="/web-design-dundalk">
            Web design in Dundalk ↗
          </Link>
        </div>
      </footer>
    </article>
  );
}
