import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const NEXT = [
  { n: "01", h: "You say hello", p: "A line about you, the project and roughly when you'd like to start. No formal brief needed." },
  { n: "02", h: "We talk", p: "A short call to make sure it's a good fit and we understand what success looks like." },
  { n: "03", h: "A clear proposal", p: "Scope, timeline and a fixed price — no surprises, no hourly guessing games." },
];

export default function Contact() {
  return (
    <KamrokLayout
      title="Contact Cormac — Web Designer & Front-end Developer | KAMROK"
      description="Get in touch with Cormac at KAMROK to start a web design, WordPress or front-end project. Based in Dundalk, working remotely. Email cormac@kamrok.com."
      maxWidth={780}
      footerRight={<a href="/">← Back to the moon</a>}
    >
      <Emblem />
      <div className="kk-eyebrow">OPEN CHANNEL · 04</div>
      <h1>Let's Talk</h1>
      <Divider />
      <p className="kk-contact-lead">
        Got a project, a rough idea, or just want to compare notes on the moon buggy? We read every
        message and reply within one working day.
      </p>

      <div className="kk-rows">
        <div className="kk-row"><span className="kk-k">EMAIL</span><a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a></div>
        <div className="kk-row"><span className="kk-k">SITE</span><a href="https://kamrok.com" target="_blank" rel="noopener">kamrok.com</a></div>
        <div className="kk-row"><span className="kk-k">SOCIAL</span><a href="#" rel="noopener">@kamrok</a></div>
        <div className="kk-row"><span className="kk-k">BASED</span><span className="kk-v">Dundalk, Ireland · remote-friendly</span></div>
        <div className="kk-row"><span className="kk-k">RESPONSE</span><span className="kk-v">Within one working day</span></div>
        <div className="kk-row"><span className="kk-k">AVAILABILITY</span><span className="kk-v">Open to select projects</span></div>
      </div>

      <h2 className="kk-sub">What happens next</h2>
      <div className="kk-process" style={{ gridTemplateColumns: "1fr" }}>
        {NEXT.map((s) => (
          <div className="kk-step" key={s.n}>
            <span className="kk-step__n">{s.n}</span>
            <div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="kk-sub">Handy to include</h2>
      <p className="kk-contact-lead" style={{ marginTop: 0 }}>
        Links to anything you like (or don't), a rough budget range, your deadline, and the one thing the
        site absolutely has to do. The more we know, the sharper the proposal.
      </p>

      <a className="kk-cta-big" href="mailto:cormac@kamrok.com?subject=Project%20enquiry">START AN EMAIL →</a>
    </KamrokLayout>
  );
}
