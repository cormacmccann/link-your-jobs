import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Database,
  Globe2,
  KeyRound,
  Server,
  Users,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import ResponsiveImage from "@/components/kamrok/ResponsiveImage";
import WebsiteBudget from "@/components/kamrok/WebsiteBudget";
import {
  WebsiteBusinessEmail,
  WebsiteCostOverview,
  WebsiteUptime,
} from "@/components/kamrok/WebsiteOwnershipExtras";
import { ownershipImages } from "@/assets/blog/website-ownership/images";
import {
  HANDOVER_QUESTIONS,
  OWNERSHIP_CHAPTERS,
} from "@/lib/website-ownership";
import "@/styles/website-ownership.css";

const CODO = "https://www.codo.digital/blog/what-to-ask-a-web-designer/";
function Chapter({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  const id = OWNERSHIP_CHAPTERS[index]![0];
  return (
    <section
      className="ownership-chapter"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <p className="ownership-label">
        {String(index + 1).padStart(2, "0")} / {OWNERSHIP_CHAPTERS[index]![1]}
      </p>
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}
function Practical({
  title = "Put it into practice",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="ownership-practical">
      <span className="ownership-label">
        <Check size={14} aria-hidden="true" /> {title}
      </span>
      {children}
    </aside>
  );
}
function Reference({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="ownership-reference" href={href}>
      {children} <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}

export default function WebsiteOwnershipGuide() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyQuestions() {
    try {
      await navigator.clipboard.writeText(HANDOVER_QUESTIONS);
      setCopyStatus(
        "Copied. Adapt the questions to your project before sending.",
      );
    } catch {
      setCopyStatus("Select and copy the questions below.");
    }
  }
  return (
    <article className="ownership-guide studio-container">
      <header className="ownership-hero">
        <div className="ownership-hero-copy">
          <Link className="ownership-back" to="/blog">
            ← Field notes
          </Link>
          <p className="ownership-label">
            RUNNING A WEBSITE / AN OWNER’S GUIDE
          </p>
          <h1>
            Your website.
            <br />
            Your business.
            <br />
            <em>Your keys.</em>
          </h1>
          <p className="ownership-deck">
            Buy your own domain. Know where the site lives. Trust the people
            building it. And agree how you keep control, without making the
            relationship a battle.
          </p>
          <p className="ownership-byline">
            By Cormac McCann ·{" "}
            <time dateTime="2026-10-22">22 October 2026</time> · 24 minute read
          </p>
          <a className="ownership-start" href="#website-costs">
            Let’s get into it <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <figure>
          <ResponsiveImage
            variants={ownershipImages.keys}
            mobileMax={480}
            sizes="(max-width: 760px) 92vw, 48vw"
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="The KAMROK astronaut chimp holding a silver key beside floating website panels."
          />
        </figure>
      </header>

      <div className="ownership-opening">
        <p>
          Before we talk about colours, layouts or who holds the passwords,
          there is something worth understanding: getting a website means paying
          for the build and budgeting for its life afterwards. Hosting, domain
          renewals, licences and business email are normal parts of the job.
          They should be explained at the beginning, so you can make a sensible
          decision about the whole investment.
        </p>
        <p>
          I’ve been building websites long enough to know that the conversation
          about the homepage is usually the easy one. The awkward conversations
          arrive later: who renews the domain, who can restore the site, what
          happens when a plugin licence expires, and whether another developer
          can pick things up.
        </p>
        <p>
          I’ve dealt with enough hosting headaches to have fairly strong
          opinions. I also know the other side of the desk: designers who have
          put serious work into a project, only for a client to disappear when
          the invoice lands. A good arrangement needs to protect both people.
        </p>
        <p>
          I loved{" "}
          <a href={CODO}>
            Mark Smith’s guide to what to ask a web designer at CODO Digital
          </a>
          . It prompted this longer take from my own experience: the choices I’d
          make, the access I’d insist on, and the things I’d stop spending three
          meetings arguing about.
        </p>
      </div>
      <WebsiteCostOverview />
      <WebsiteBusinessEmail />
      <blockquote className="ownership-pullquote">
        Keep control of your business.
        <br />
        <em>Give your designer room to do their job.</em>
      </blockquote>

      <div className="ownership-reading-layout">
        <aside className="ownership-sidebar">
          <nav aria-label="In this article">
            <p className="ownership-label">IN THIS GUIDE</p>
            <div className="ownership-sidebar-basics">
              <a href="#website-costs">The costs to expect ↗</a>
              <a href="#business-email">Branded business email ↗</a>
              <a href="#website-uptime">What downtime means ↗</a>
            </div>
            <ol>
              {OWNERSHIP_CHAPTERS.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
            <a className="ownership-sidebar-end" href="#questions">
              Copy the questions to ask ↗
            </a>
          </nav>
        </aside>
        <div className="ownership-body">
          <Chapter index={0} title="Start with the person who needs to use it.">
            <p>
              Before we talk about the account logins, work out what somebody is
              coming to the website to do. Book a table? Compare a service?
              Check whether you cover their area? Find the opening hours while
              standing outside?
            </p>
            <p>
              Yes, it needs to look sharp. I’m a designer; I care deeply about
              that. But the design should help the customer understand your
              offer and move forward. A beautiful page that hides the price, the
              location or the booking button still leaves them doing the work.
            </p>
            <p>
              Write down three important journeys before you commission
              anything. For a hotel, those might be checking rooms, seeing the
              food and finding availability. For a tradesperson, it might be
              checking the service area, seeing relevant work and requesting a
              quote. For a customer app, it might be signing in, completing a
              task and recovering an account.
            </p>
            <figure className="ownership-project-photo">
              <ResponsiveImage
                variants={ownershipImages.website}
                mobileMax={480}
                sizes="(max-width: 760px) 92vw, 64vw"
                width={1688}
                height={1125}
                loading="lazy"
                decoding="async"
                alt="The McKevitt’s hotel website shown on desktop and laptop, with the hotel identity and a route to checking availability."
              />
              <figcaption>
                <Link to="/work/mckevitts">
                  McKevitt’s: identity and WordPress website.
                </Link>{" "}
                The visual language matters; so does making rooms, dining and
                availability easy to find.
              </figcaption>
            </figure>
            <Practical title="An example brief">
              <p>
                “We need local customers to understand our three services, see
                evidence of the work and request a quote on their phone. We need
                to update those services ourselves. We also need to know who
                maintains the site after launch.”
              </p>
              <p>
                That gives a designer something useful to solve. “Make it
                modern” leaves an awful lot open.
              </p>
            </Practical>
            <p>
              Use those journeys when reviewing the finished work. Ask someone
              who was not in the design meetings to try them. Watch where they
              hesitate. That is often more useful than another round of personal
              preferences about the hero image.
            </p>
          </Chapter>

          <Chapter
            index={1}
            title="Buy your own domain. Keep it in your own account."
          >
            <p>
              The domain is the address people type to find you. Hosting is
              where the website runs. Your email may be a third service again.
              You can use different companies for each; buying a domain does not
              mean you must buy every extra offered at checkout.
            </p>
            <p>
              My preference is simple: you create the registrar account,
              register the domain to your business, pay the renewal and keep the
              recovery details. I help connect it. That way your address is not
              dependent on my inbox, my availability or whether you and I are
              still working together in five years.
            </p>
            <h3>Where would I buy one?</h3>
            <div className="ownership-provider-grid">
              <div>
                <h4>Register365 — my personal choice</h4>
                <p>
                  I personally use Register365. Honestly, they’ve been the best
                  fit for me, and I’ve really valued the loyalty and support
                  they’ve shown me. That counts for a lot when your business
                  depends on keeping its address online.
                </p>
                <p>
                  Domain renewals can be forgotten. When a renewal has been
                  missed or access needs sorting out, I’ve found them very quick
                  to help restore access and get things live again. That
                  practical support is a big part of why I stay with them.
                </p>
                <p>
                  I still recommend switching on auto-renew, keeping your
                  payment details current and setting your own renewal reminder.
                  If a domain does lapse, contact support promptly: the recovery
                  options depend on the domain’s status.
                </p>
                <Reference href="https://www.register365.com/">
                  Explore Register365
                </Reference>
                <Reference href="https://www.register365.com/domain-names/info/domain-renewals">
                  Register365’s domain renewal guide
                </Reference>
              </div>
              <div>
                <h4>Cloudflare Registrar</h4>
                <p>
                  Worth considering for supported extensions if you are happy
                  using Cloudflare DNS. Registration and renewal are offered at
                  cost; check the extension and current price.
                </p>
                <p>
                  One important detail: domains registered there must use
                  Cloudflare’s nameservers. That can suit the setup very well,
                  but agree it with whoever manages your DNS.
                </p>
                <Reference href="https://www.cloudflare.com/domains/">
                  Explore Cloudflare Registrar
                </Reference>
                <Reference href="https://developers.cloudflare.com/registrar/get-started/register-domain/">
                  Read the nameserver requirements
                </Reference>
              </div>
              <div>
                <h4>Namecheap</h4>
                <p>
                  Another place to compare for the extension you need. Look at
                  the renewal price, not only the first-year offer. Its Share
                  Access feature lets another account manage selected domain
                  settings while you retain control.
                </p>
                <Reference href="https://www.namecheap.com/domains/">
                  Explore Namecheap domains
                </Reference>
                <Reference href="https://www.namecheap.com/support/knowledgebase/article.aspx/326/46/what-is-the-share-access-option-used-for/">
                  How delegated access works
                </Reference>
              </div>
              <div>
                <h4>A .ie domain?</h4>
                <p>
                  Check an accredited .ie registrar.{" "}
                  <a href="https://www.blacknight.com/domains/">Blacknight</a>{" "}
                  is an Irish option to compare. The .ie registry explains the
                  registration process and the evidence of a connection to
                  Ireland you may need.
                </p>
                <p>
                  Choose the registrar for the domain service you need; you can
                  make the website hosting decision separately.
                </p>
                <Reference href="https://www.weare.ie/how-to-register-a-domain/">
                  Read the .ie registration guide
                </Reference>
                <Reference href="https://www.weare.ie/accredited-registrar-list/">
                  Find an accredited registrar
                </Reference>
              </div>
            </div>
            <p>
              For any registrar, compare the renewal, account recovery, support
              and permission options. You do not need to transfer a perfectly
              well-managed existing domain just because a new designer prefers
              another dashboard.
            </p>
            <Practical title="The domain setup I want to see">
              <ol>
                <li>
                  A business-controlled account and accurate registration
                  details.
                </li>
                <li>
                  A recovery email you can still reach if the website’s email
                  stops working.
                </li>
                <li>
                  Two-factor authentication, recovery codes stored safely and a
                  current payment method.
                </li>
                <li>Renewal reminders and a named person checking them.</li>
                <li>
                  A separate invitation for the designer where the registrar
                  supports it.
                </li>
              </ol>
            </Practical>
            <p>
              If someone already holds the domain for you, ask them to help
              document or transfer the arrangement while everything is friendly.
              Before changing DNS, get the existing records checked. A website
              move should not accidentally take the business email with it.
            </p>
          </Chapter>

          <Chapter index={2} title="Ownership and access are different things.">
            <p>
              “I have a login” is a start. It does not tell you what that login
              can actually do. A WordPress Editor can work on content; that is
              different from an Administrator, and neither automatically gives
              you control of the hosting or domain account.
            </p>
            <p>
              For a normal standalone WordPress business website, I want you to
              have a business-controlled Administrator account at the agreed
              handover. You might use an Editor account day to day so you do not
              accidentally change the wider setup. We should explain that
              distinction, not quietly leave you with less access than you
              expected.
            </p>
            <Reference href="https://wordpress.org/documentation/article/roles-and-capabilities/">
              WordPress: what the roles can do
            </Reference>
            <div
              className="ownership-access-map"
              role="group"
              aria-label="Four separate layers of website access"
            >
              <div className="ownership-map-owner">
                <KeyRound size={22} aria-hidden="true" />
                <strong>Your business</strong>
                <span>Controls the accounts and recovery</span>
              </div>
              <div className="ownership-map-layers">
                {[
                  {
                    icon: Globe2,
                    title: "Domain",
                    text: "Address, renewal & DNS",
                  },
                  {
                    icon: Server,
                    title: "Hosting",
                    text: "Site environment & recovery",
                  },
                  {
                    icon: Users,
                    title: "Website / app",
                    text: "Content, users & settings",
                  },
                  {
                    icon: Database,
                    title: "Data & services",
                    text: "Records, payments & email",
                  },
                ].map((layer) => (
                  <div key={layer.title}>
                    <layer.icon size={23} aria-hidden="true" />
                    <strong>{layer.title}</strong>
                    <span>{layer.text}</span>
                  </div>
                ))}
              </div>
              <p>
                You invite the designer to the access they need. You keep an
                independent way back in.
              </p>
            </div>
            <p>
              I need developer access to do the work properly. That may include
              the hosting environment, a staging copy, files, logs or relevant
              app services. Giving me the right access is part of hiring me. It
              does not require giving up your own account or sending one shared
              password around the whole team.
            </p>
            <p>
              Ask your host what roles it provides and whether your plan allows
              a separate collaborator. WP Engine has its own portal roles;
              Kinsta separates company-wide access from site-level roles. The
              names and powers are not identical. Give access to the relevant
              site when that is enough, rather than automatically to every site
              and all billing.
            </p>
            <Reference href="https://wpengine.com/support/users/">
              WP Engine: portal users and roles
            </Reference>
            <Reference href="https://kinsta.com/docs/wordpress-hosting/using-kinsta/kinsta-work-as-a-team/">
              Kinsta: working as a team
            </Reference>
            <Practical title="Ask for a short access register">
              <p>
                For each service, record the account owner, recovery contact,
                who pays, who has access and who can invite or remove a
                developer. Keep passwords and recovery codes in a secure
                password manager, not in that document.
              </p>
            </Practical>
          </Chapter>

          <Chapter
            index={3}
            title="My WordPress hosting preference comes from experience."
          >
            <p>
              For WordPress, my own preference is{" "}
              <a href="https://wpengine.com/">WP Engine</a> or{" "}
              <a href="https://kinsta.com/">Kinsta</a>. I’ve been at this a long
              time. I’ve tried more hosting companies than I care to count, and
              dealt with enough heartache that I am not particularly interested
              in saving a small amount to invite the same problems back.
            </p>
            <p>
              That is a personal working preference, not a promise that either
              company will be perfect forever. Hosting changes. Products,
              support teams, limits and prices change. I still need to check the
              plan against the actual website and revisit the decision if the
              service stops doing the job.
            </p>
            <p>
              What I value is an environment I can work in confidently: sensible
              access, a way to test changes before they go live, usable backups
              and a clear route to help. The time spent chasing an avoidable
              hosting problem is time neither you nor I wanted to spend.
            </p>
            <h3>What I would ask before picking a plan</h3>
            <ul>
              <li>
                Does it suit this WordPress site, its traffic, storage and any
                shop or membership features?
              </li>
              <li>
                What backups exist, how long are they kept, and who can restore
                them?
              </li>
              <li>
                Can we test updates on a staging copy, away from the live site?
              </li>
              <li>
                What support is included, and what remains the designer’s
                responsibility?
              </li>
              <li>
                What are the renewal, usage and overage charges? Is business
                email a separate service?
              </li>
              <li>
                Can you keep control while inviting your developer, and what
                would moving later involve?
              </li>
            </ul>
            <p>
              Do not assume a managed host is also managing every plugin, your
              content, your email and your customer support. The plan and the
              maintenance agreement should say where those responsibilities sit.
              A host having backups is useful; somebody knowing how and when to
              restore them is another part of the job.
            </p>
            <WebsiteUptime />
            <figure className="ownership-night-shift">
              <ResponsiveImage
                variants={ownershipImages.nightShift}
                mobileMax={480}
                sizes="(max-width: 760px) 92vw, (max-width: 1100px) 65vw, 880px"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                alt="The KAMROK astronaut chimp at a moonlit control desk, watching a website, business email and servers working after hours."
              />
              <figcaption>
                Your website keeps the door open when you’re away. The services
                behind it deserve the same care as the design.
              </figcaption>
            </figure>
            <aside className="ownership-disclosure">
              <span className="ownership-label">
                A STRAIGHT ANSWER ABOUT COMMISSION
              </span>
              <h3>Yes, referrals can pay me.</h3>
              <p>
                I may earn commission when a client signs up through a hosting
                referral I provide. Some referrals slip through the cracks.
                Honestly, that is not the bit I lose sleep over. I recommend
                these services because they have worked well for me and the work
                I need to do.
              </p>
              <p>
                A recommendation should make sense even if no commission
                arrives. Ask me why I’m recommending the plan, what you will pay
                and whether there is a referral arrangement. The provider links
                in this article are ordinary links, without referral tracking.
              </p>
            </aside>
            <p>
              There are reasonable setups where an agency pays for a shared
              account and manages a client site within it. That can be
              convenient. You cannot expect access to the agency’s other clients
              or billing, so agree the site-level access, backups and transfer
              process instead. The arrangement needs to be understandable and
              documented.
            </p>
            <Reference href="https://wpengine.com/support/transfer-site/">
              WP Engine: site transfers
            </Reference>
            <Reference href="https://kinsta.com/docs/company-settings/transfer-ownership/">
              Kinsta: company and site transfers
            </Reference>
          </Chapter>

          <Chapter
            index={4}
            title="Building an app? Keep hold of more than the screen."
          >
            <p>
              Lovable can be a brilliant starting point for a website, a
              prototype or a working app. When you bring in a designer or
              developer to take it further, decide which workspace and business
              accounts the project will live in, and how you will collaborate.
              Make that decision before lots of customers and services depend on
              it.
            </p>
            <p>
              A preview link is not ownership access. Being able to change a
              heading is not the same as being able to manage the project,
              recover the account or maintain its data. Ask to be shown the
              actual setup and the permissions your account has.
            </p>
            <h3>Think in four separate parts</h3>
            <div className="ownership-table-wrap">
              <table>
                <caption>What an app handover needs to account for</caption>
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>What to establish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">The project</th>
                    <td>
                      Who owns it, which workspace it belongs to, who can edit
                      it and what the supported handover route is.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">The code</th>
                    <td>
                      A business-controlled repository or agreed export, plus
                      instructions another developer can actually use.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">The data</th>
                    <td>
                      Database records, uploaded files, sign-in users and the
                      backup or migration process for the services in use.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">The connections</th>
                    <td>
                      Domain, hosting, payment account, email service, API
                      subscriptions, environment settings and billing.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Lovable documents Git sync as a way to keep a copy of your code
              and work with other developers. That is useful. It does not make a
              repository a complete copy of a live business: customer records,
              uploads, service accounts and secrets need their own plan.
            </p>
            <Reference href="https://docs.lovable.dev/integrations/github">
              Lovable: GitHub sync and code access
            </Reference>
            <p>
              Its project settings also distinguish moving a project between
              workspaces from changing the project owner. Permissions, the plan
              and connected services affect the route available. Have your
              developer check the current procedure with you rather than
              assuming a duplicated project or one button transfers everything.
            </p>
            <Reference href="https://docs.lovable.dev/features/projects/settings">
              Lovable: project settings and ownership
            </Reference>
            <Practical title="An example: taking a booking app further">
              <p>
                You start with a booking screen and ask a developer to add
                customer accounts, payments and automated emails. Before
                development, agree who controls the project, repository, live
                database, payment account and email service. Document who pays
                each bill and what happens to existing bookings during a move.
              </p>
              <p>
                Then test a real journey: create an account, make a test
                booking, receive the email, and check what the administrator
                sees. A working screen is only part of a working service.
              </p>
            </Practical>
            <p>
              You can keep hosting on a managed platform and still plan for
              future portability. Moving everything elsewhere is a separate
              project with configuration, data and testing work. It is not
              automatically necessary, and it should not be sold as a free,
              instant side effect of downloading the code.
            </p>
            <Reference href="https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership">
              Lovable: hosting, data and portability
            </Reference>
          </Chapter>

          <Chapter index={5} title="Be fair to the person doing the work.">
            <p>
              I understand why business owners worry about being stuck with a
              designer. I also understand why designers worry about handing over
              finished work and never getting paid. There are far too many
              stories of people putting in weeks of work and being left chasing
              the final invoice.
            </p>
            <p>
              A request for a deposit, staged payments or a clear final handover
              point is not automatically a bad sign. It is something to discuss
              and put into the agreement. Equally, ownership and access should
              not become a mystery that only gets explained after you have
              committed.
            </p>
            <p>
              For a bespoke build, the proposal should identify the
              deliverables, payment milestones and the point at which the agreed
              work transfers or is licensed to you. Third-party software, stock
              images, fonts and reusable tools may have different terms. Paying
              an invoice does not tell you those details by itself; the written
              agreement should.
            </p>
            <div className="ownership-two-sides">
              <div>
                <span className="ownership-label">FAIR TO THE CLIENT</span>
                <ul>
                  <li>The business controls its domain and recovery.</li>
                  <li>Scope, costs and the access arrangement are clear.</li>
                  <li>There is an agreed, workable handover or exit route.</li>
                </ul>
              </div>
              <div>
                <span className="ownership-label">FAIR TO THE DESIGNER</span>
                <ul>
                  <li>Deposits and milestone invoices are paid as agreed.</li>
                  <li>Feedback arrives from a named decision-maker.</li>
                  <li>Extra scope and ongoing support are paid work.</li>
                </ul>
              </div>
            </div>
            <p>
              If the arrangement is a subscription or licence rather than an
              outright bespoke build, ask what continues while you subscribe and
              what you can take with you when it ends. That model may suit you.
              The problem is discovering it was the model when you thought you
              were buying something else.
            </p>
            <p>
              Agree how disagreements are handled too: a written list of issues,
              a chance to resolve them, and the process in the contract. Neither
              side benefits from a relationship built around surprise
              restrictions or unpaid extra work.
            </p>
            <Practical title="A workable milestone conversation">
              <p>
                “Let’s agree the scope and deposit, approve the design
                direction, review a working build, then complete the agreed
                payment and handover. If either of us wants to change the scope,
                we price and approve that change before doing it.”
              </p>
              <p>
                Those are discussion points, not a ready-made contract. The
                actual agreement needs to fit your project.
              </p>
            </Practical>
          </Chapter>

          <Chapter
            index={6}
            title="Trust your designer. Give feedback that helps."
          >
            <p>
              If you hired someone for their judgement, let them explain the
              decisions. Ask why a heading is there, why a page needs more
              detail or why the contact button is so prominent. A good designer
              should be able to connect those choices to the customer and the
              job the website needs to do.
            </p>
            <p>
              That includes the words. A service description may help a person
              decide whether you offer what they need, and help a search engine
              understand the page. But “it’s for SEO” is not an excuse for
              awkward, inaccurate or repetitive writing. The language still
              needs to sound like your business.
            </p>
            <p>
              Correct facts, claims and tone. Flag a service you do not provide,
              a promise you cannot keep, a missing location or wording that
              sounds nothing like you. Those changes matter. Spending a week
              swapping two equally clear phrases backwards and forwards is a
              different use of the budget.
            </p>
            <figure className="ownership-project-photo">
              <ResponsiveImage
                variants={ownershipImages.studies}
                mobileMax={480}
                sizes="(max-width: 760px) 92vw, 64vw"
                width={1920}
                height={1281}
                loading="lazy"
                decoding="async"
                alt="McKevitt’s stag identity studies and colour explorations on paper beside a pencil."
              />
              <figcaption>
                Studies and ideas from the{" "}
                <Link to="/work/mckevitts#chapter-process">
                  McKevitt’s identity project
                </Link>
                . Good feedback considers the thinking behind the work as well
                as the finished appearance.
              </figcaption>
            </figure>
            <div className="ownership-feedback">
              <div>
                <span className="ownership-label">HARD TO ACT ON</span>
                <p>
                  “It doesn’t feel right. Can we make it pop? Maybe try another
                  font.”
                </p>
              </div>
              <div>
                <span className="ownership-label">SOMETHING WE CAN SOLVE</span>
                <p>
                  “Customers may think we only work in Dundalk, but we cover all
                  of Louth. Could we make the service area clear near the quote
                  button? The tone also feels more formal than how we speak.”
                </p>
              </div>
            </div>
            <p>
              Bring feedback together. One considered response from the
              decision-maker is easier to act on than a stream of contradictory
              messages from five people. Ask which changes affect the agreed
              scope and which are refinements within the current round.
            </p>
            <p>
              Then return to the customer journeys. Can someone understand the
              offer, find the information they need, and complete the next step
              on a phone? The customer is unlikely to know how many meetings
              went into choosing the border radius. They will notice if the
              enquiry form fails.
            </p>
          </Chapter>

          <Chapter index={7} title="The build price is only the first number.">
            <p>
              Ask for a cost breakdown you can compare over more than the launch
              month. Domain renewals, hosting, hosted email, maintenance, paid
              licences and app usage may sit in different accounts and renew at
              different times. A low introductory price tells you very little
              about year two.
            </p>
            <p>
              Keep the build fee separate from the cost of keeping things
              running. Then ask what changes cost: adding a service page,
              updating a menu, connecting a new booking tool or fixing a problem
              caused by a third-party update. A “small change” needs a shared
              definition.
            </p>
            <WebsiteBudget />
            <p>
              The figures above are deliberately illustrative. Your actual
              hosting plan, taxes, exchange rates, usage and scope need to come
              from the quote and provider terms. If support already includes
              hosting or licences, put that amount in once rather than counting
              it twice.
            </p>
            <h3>Give maintenance a name and an owner</h3>
            <p>
              For WordPress, agree who applies updates, checks the website
              afterwards and handles a failed update. For an app, also agree who
              monitors connected services, billing limits and changes to
              integrations. A service being managed somewhere does not mean
              every part of your business workflow is looked after.
            </p>
            <p>
              Ask for the backup schedule, retention, storage location and a
              tested recovery process that fits the business. How much data
              could you lose between backups? Who can start a restore? Who
              checks that payments, forms or bookings work afterwards? Those are
              better questions than simply asking whether there is a backup.
            </p>
            <Practical title="One useful question">
              <p>
                “If the website breaks while you’re unavailable, who is the next
                contact, what access do they have, and where are the recovery
                instructions?”
              </p>
            </Practical>
            <p>
              Performance belongs in this conversation too. Ask to see recent
              mobile tests, then agree which pages and customer journeys will be
              checked on your project. Lighthouse is a useful set of automated
              checks, not a promise about every real visitor, complete
              accessibility or a Google ranking.
            </p>
            <Reference href="https://developers.google.com/speed/docs/insights/v5/about">
              Google: what PageSpeed Insights measures
            </Reference>
          </Chapter>

          <Chapter
            index={8}
            title="Plan the handover while everyone is still smiling."
          >
            <p>
              Leaving should be a process you understand, not a discovery
              exercise. Ask how notice works, what outstanding payments need to
              be resolved, what support ends and what assistance with a move
              would cost. An organised handover takes work; a charge for agreed
              migration work is different from finding out the site cannot be
              handed over at all.
            </p>
            <p>
              If you are replacing an existing website, the handover also needs
              to protect what already works. Inventory the important pages and
              addresses, identify the forms and integrations, and plan redirects
              for URLs that change. Check domain records and email before any
              DNS changes. Do not cancel the old setup until the new one has
              been checked and the relevant records and backups are safe.
            </p>
            <p>
              Ask another practical question: could a competent developer
              continue from the information supplied? A folder of files without
              the database, an app without its service accounts, or a paid theme
              with an unexplained agency licence can leave a lot of follow-up
              work.
            </p>
            <div className="ownership-handover-list">
              <h3>What I would expect in the handover record</h3>
              <ul>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Domain, hosting, website and app account owners confirmed.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Your logins tested, with appropriate recovery access.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Bespoke files, content, code and data covered by the
                  agreement.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />A list of licences,
                  renewal dates and any replacements you need.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Backup and restore instructions, with responsibility assigned.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Forms, bookings, payments and important links checked.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Key old URLs retained or redirected where appropriate.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />A short walkthrough of
                  everyday editing and the support arrangement.
                </li>
                <li>
                  <Check size={17} aria-hidden="true" />
                  Developer permissions reviewed after the transition is
                  complete.
                </li>
              </ul>
            </div>
            <p>
              Keep that record somewhere the business can reach independently.
              Review it when staff, suppliers or the website change. Ownership
              is much more useful when someone knows how to exercise it.
            </p>
          </Chapter>

          <section
            className="ownership-questions"
            id="questions"
            aria-labelledby="questions-heading"
          >
            <p className="ownership-label">
              TAKE THIS TO YOUR FIRST CONVERSATION
            </p>
            <h2 id="questions-heading">Ask clearly. Get it in writing.</h2>
            <p>
              You can send these to me or any designer you are considering. A
              clear answer is useful to both sides.
            </p>
            <button
              className="ownership-copy"
              type="button"
              onClick={copyQuestions}
            >
              Copy the questions <Copy size={16} aria-hidden="true" />
            </button>
            <p className="ownership-copy-status" role="status">
              {copyStatus}
            </p>
            <details>
              <summary>Read the questions before copying</summary>
              <pre>{HANDOVER_QUESTIONS}</pre>
            </details>
          </section>
          <p className="ownership-closing">
            My take is fairly simple. Buy the address yourself. Understand the
            accounts and the costs. Pay people fairly for good work. Give them
            useful feedback, listen to their advice, and make sure the business
            can keep going if the relationship changes. That is a much better
            foundation than either side having to guess.
          </p>
          <p className="ownership-closing ownership-pride">
            Good websites work. They bring in enquiries, sell products, take
            bookings and help whole businesses move forward. That is what makes
            this work exciting to me. I’m proud to be part of it, and I want the
            website we build to be something you can rely on, understand and
            keep developing as your business grows.
          </p>
          <aside
            className="ownership-credit"
            aria-label="Inspiration and further reading"
          >
            <p className="ownership-label">
              INSPIRED BY / WELL WORTH YOUR TIME
            </p>
            <h2>A good conversation, started by CODO.</h2>
            <p>
              This article was inspired by{" "}
              <strong>Mark Smith at CODO Digital</strong> and his post,{" "}
              <a href={CODO}>
                Eleven questions to ask a web designer before you pay them
              </a>
              . I loved the practical questions he raised. This is my own take,
              with the hosting preferences, collaboration advice and app
              handover considerations I would add from my experience.
            </p>
            <a className="ownership-credit-link" href={CODO}>
              Read Mark’s original article{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </aside>
          <footer className="ownership-article-footer">
            <p className="ownership-label">A CLEAR STARTING POINT</p>
            <h2>
              Let’s build something
              <br />
              <em>you can move forward with.</em>
            </h2>
            <p>
              A new website, an existing WordPress site or an app that needs the
              next stage. Bring what you have, and we’ll talk through the work,
              the ownership and the practical details.
            </p>
            <div>
              <Link
                className="ownership-cta"
                to="/contact?service=Website%20ownership%20and%20build"
              >
                Talk to Cormac <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/blog/dundalk-seo-guide">
                Next read: get found on Google in Dundalk ↗
              </Link>
            </div>
            <p className="ownership-fine">
              Provider features and plans can change. The linked documentation
              was checked on 22 October 2026. This guide explains the
              conversations to have; your project’s written agreement sets the
              actual deliverables and terms.
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
