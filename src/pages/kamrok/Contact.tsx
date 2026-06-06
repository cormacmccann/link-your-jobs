import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

export default function Contact() {
  return (
    <KamrokLayout
      title="Contact Cormac — Web Designer | KAMROK"
      description="Get in touch with Cormac at KAMROK to start a web design or front-end project. Email cormac@kamrok.com."
      maxWidth={780}
      footerRight={<a href="/">← Back to the moon</a>}
    >
      <Emblem />
      <div className="kk-eyebrow">OPEN CHANNEL · 04</div>
      <h1>Let's Talk</h1>
      <Divider />
      <p className="kk-contact-lead">
        Got a project, a rough idea, or just want to compare notes on the moon buggy? I read every message.
      </p>
      <div className="kk-rows">
        <div className="kk-row"><span className="kk-k">EMAIL</span><a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a></div>
        <div className="kk-row"><span className="kk-k">SITE</span><a href="https://kamrok.com" target="_blank" rel="noopener">kamrok.com</a></div>
        <div className="kk-row"><span className="kk-k">SOCIAL</span><a href="#" rel="noopener">@kamrok</a></div>
        <div className="kk-row"><span className="kk-k">AVAILABILITY</span><span className="kk-v">Open to select projects</span></div>
      </div>
      <a className="kk-cta-big" href="mailto:cormac@kamrok.com?subject=Project%20enquiry">START AN EMAIL →</a>
    </KamrokLayout>
  );
}
