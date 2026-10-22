import { useId, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  CalendarClock,
  Check,
  Clock3,
  Globe2,
  LifeBuoy,
  Mail,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
} from "lucide-react";
import { annualDowntime } from "@/lib/website-ownership";

const COSTS = [
  {
    icon: Server,
    title: "Website hosting",
    period: "Monthly or annual",
    detail:
      "The home for your website: the infrastructure that serves it to visitors. Check the renewal rate, storage, traffic limits and support included.",
  },
  {
    icon: Globe2,
    title: "Your domain name",
    period: "Registration + renewal",
    detail:
      "Your business address online. You register it for a term and renew it to keep it. It is a separate cost from building or hosting the website.",
  },
  {
    icon: RefreshCw,
    title: "Plugins & licences",
    period: "Often annual",
    detail:
      "Paid themes, plugins and connected tools may renew. Ask which you need, who holds each licence and what stops receiving updates if it expires.",
  },
  {
    icon: Mail,
    title: "Branded business email",
    period: "Usually per user / month or year",
    detail:
      "Properly hosted mail at your own domain. Budget for the people who need accounts, storage and any migration or setup work. Check what is bundled.",
  },
] as const;

export function WebsiteCostOverview() {
  return (
    <section
      className="ownership-cost-overview"
      id="website-costs"
      aria-labelledby="website-costs-heading"
    >
      <div className="ownership-cost-intro">
        <div>
          <p className="ownership-label">BEFORE WE GET INTO THE DESIGN</p>
          <h2 id="website-costs-heading">
            The website has a build cost.
            <br />
            <em>And a running cost.</em>
          </h2>
        </div>
        <p>
          A good website can be your hardest-working employee: explaining the
          offer, taking enquiries or selling while you’re away. Keeping that
          employee equipped is part and parcel of owning the website.
        </p>
      </div>
      <div className="ownership-cost-cards">
        {COSTS.map(({ icon: Icon, title, period, detail }, index) => (
          <div key={title}>
            <div className="ownership-cost-symbol">
              <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
              <span>0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <p className="ownership-cost-period">
              <CalendarClock size={13} aria-hidden="true" />
              {period}
            </p>
            <p>{detail}</p>
          </div>
        ))}
      </div>
      <div className="ownership-cost-care">
        <LifeBuoy size={24} aria-hidden="true" />
        <p>
          <strong>Then allow for care.</strong> Updates, backups, monitoring and
          support take time. Agree who handles them and what the fee covers.
          Shops and apps may also have payment fees, usage charges or
          subscriptions for bookings, messages and other services.
        </p>
      </div>
      <p className="ownership-cost-note">
        Ask for the setup price, the renewal price, the billing dates and who
        pays each bill. Monthly and annual payment options can have different
        terms. Some costs are bundled; some are separate. Get the whole picture
        in writing.
      </p>
      <a className="ownership-start" href="#running-costs">
        Try the running-cost calculator{" "}
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

export function WebsiteBusinessEmail() {
  return (
    <section
      className="ownership-business-email"
      id="business-email"
      aria-labelledby="business-email-heading"
    >
      <div className="ownership-email-heading">
        <div className="ownership-email-visual" aria-hidden="true">
          <div className="ownership-email-orbit">
            <Mail size={44} strokeWidth={1} />
            <ShieldCheck size={27} strokeWidth={1.5} />
          </div>
          <span>YOUR NAME. YOUR DOMAIN.</span>
        </div>
        <div>
          <p className="ownership-label">A SMALL DETAIL THAT CARRIES A LOT</p>
          <h2 id="business-email-heading">
            Your email should belong
            <br />
            <em>to your business.</em>
          </h2>
          <p>
            A personal email address on a business website can make an otherwise
            sharp business feel unfinished. An address such as{" "}
            <strong>hello@yourbusiness.ie</strong> connects the conversation to
            the name customers have just found.
          </p>
        </div>
      </div>
      <p>
        There is a practical side too. If the business runs through somebody’s
        personal inbox, what happens when they leave, lose access or mix
        customer messages with their own correspondence? Ownership, recovery and
        handing work to another person can become awkward very quickly.
      </p>
      <div className="ownership-email-checks">
        <div>
          <Users size={21} aria-hidden="true" />
          <h3>Business-owned access</h3>
          <p>
            Keep the service account under the business’s control. Give people
            their own access and use shared mailboxes or delegation where
            appropriate, rather than sharing one password.
          </p>
        </div>
        <div>
          <ShieldCheck size={21} aria-hidden="true" />
          <h3>Protection behind the name</h3>
          <p>
            Use multi-factor authentication and secure recovery. Ask your
            provider to configure SPF, DKIM and DMARC: checks that help
            receiving services verify your mail and handle impersonation.
          </p>
        </div>
        <div>
          <RefreshCw size={21} aria-hidden="true" />
          <h3>A plan for changes</h3>
          <p>
            Know who can add or remove users, recover access and move the mail
            later. Keep the domain renewed, and protect email records when a
            website moves to a new host.
          </p>
        </div>
      </div>
      <p>
        A branded address alone does not make email secure, and a free personal
        inbox is not automatically unsafe. The improvement is a professional
        identity backed by sensible business administration and a properly
        configured service.
      </p>
      <p>
        Hosted email is often separate from website hosting. Services such as{" "}
        <a href="https://workspace.google.com/business/new-business/">
          Google Workspace
        </a>{" "}
        and{" "}
        <a href="https://www.microsoft.com/en-ie/microsoft-365/business/business-email">
          Microsoft 365
        </a>{" "}
        offer business email on your domain. Compare the actual plan, number of
        users, storage, support and renewal terms. An alias that forwards a
        message is not necessarily a separate mailbox, and website form delivery
        may need its own setup.
      </p>
      <a
        className="ownership-reference"
        href="https://support.google.com/mail/answer/81126?hl=en"
      >
        Google: email authentication and delivery guidance{" "}
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </section>
  );
}

export function WebsiteUptime() {
  const id = useId();
  const [availability, setAvailability] = useState(99.9);
  const time = annualDowntime(availability);
  return (
    <section
      className="ownership-uptime"
      id="website-uptime"
      aria-labelledby="website-uptime-heading"
    >
      <p className="ownership-label">ALWAYS THERE NEEDS A LITTLE CONTEXT</p>
      <h3 id="website-uptime-heading">
        Downtime happens. How we handle it matters.
      </h3>
      <p>
        The aim is a website that customers can rely on. But no responsible
        designer should promise that every service, network and connection will
        work perfectly for ever. Maintenance, software failures and wider
        infrastructure incidents can interrupt even well-run websites.
      </p>
      <div className="ownership-uptime-explainer">
        <div className="ownership-uptime-control">
          <Activity size={25} aria-hidden="true" />
          <label htmlFor={id}>What does an uptime percentage mean?</label>
          <select
            id={id}
            value={availability}
            onChange={(event) => setAvailability(Number(event.target.value))}
          >
            <option value="99">99% availability</option>
            <option value="99.9">99.9% availability</option>
            <option value="99.95">99.95% availability</option>
            <option value="99.99">99.99% availability</option>
          </select>
          <p>
            Compare the annual equivalents. Every extra nine makes a difference.
          </p>
        </div>
        <div
          className="ownership-uptime-result"
          aria-live="polite"
          aria-atomic="true"
        >
          <Clock3 size={20} aria-hidden="true" />
          <span>Downtime at exactly {availability}% over a 365-day year</span>
          <strong>
            {time.days > 0 && (
              <>
                {time.days}
                <small>d</small>{" "}
              </>
            )}
            {time.hours}
            <small>h</small> {time.minutes}
            <small>m</small> {time.remainingSeconds}
            <small>s</small>
          </strong>
          <span>Annual arithmetic, rounded to the nearest second.</span>
        </div>
      </div>
      <p>
        <strong>
          At 99.9%, that is 8 hours, 45 minutes and 36 seconds in a 365-day
          year.
        </strong>{" "}
        It is a useful way to understand the number. It is not a prediction that
        your website will go down for that long. For comparison, 90%
        availability would mean 36½ days offline across the same year. That
        would be a serious problem for a business relying on its website.
      </p>
      <p>
        You will see 99.9% used as a hosting service target. For example,
        Kinsta’s published SLA sets that baseline unless your order specifies a
        higher figure. It measures availability by monthly billing period, with
        its own definitions, exclusions and credit process. An annual equivalent
        is not a yearly outage allowance or a guarantee that every interruption
        counts towards a credit.
      </p>
      <a
        className="ownership-reference"
        href="https://kinsta.com/legal/service-level-agreement/"
      >
        Kinsta: the uptime commitment, measurement and exclusions{" "}
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
      <p>
        Global incidents, external providers, DNS, payment services and the
        connections between them add variables. Your hosting can be online while
        a booking tool or checkout is failing. Read the terms, but also agree
        the response: who notices, who investigates, who tells you what is
        happening and who checks the customer journey when service returns.
      </p>
      <div className="ownership-uptime-response">
        {[
          {
            icon: Activity,
            title: "Notice it",
            text: "Monitoring and an alert to the person responsible.",
          },
          {
            icon: LifeBuoy,
            title: "Respond to it",
            text: "A named contact, escalation route and recovery plan.",
          },
          {
            icon: Check,
            title: "Check the recovery",
            text: "Test enquiries, bookings or purchases after the fix.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={20} aria-hidden="true" />
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <p>
        If the business depends on taking orders or bookings at a particular
        time, say so before choosing the setup. The cost of an interruption,
        acceptable recovery time and a useful fallback contact should shape the
        plan. Reliable hosting matters; so does having somebody who knows what
        to do when something goes wrong.
      </p>
    </section>
  );
}
