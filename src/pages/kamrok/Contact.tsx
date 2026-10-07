import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, PenLine } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import KamrokLayout from "@/components/kamrok/KamrokLayout";

const HELP = [{ value: "project", label: "A new website or app" }, { value: "review", label: "Help with an existing project" }, { value: "support", label: "Ongoing support" }, { value: "other", label: "An idea to talk through" }];

export default function Contact() {
  const [params] = useSearchParams();
  const initial = HELP.some(item => item.value === params.get("help")) ? params.get("help")! : "project";
  const [help, setHelp] = useState(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const subject = `KAMROK enquiry — ${HELP.find(item => item.value === help)?.label}`;
  const body = `Hi Cormac,\n\n${message}\n\n${name}\n${email}`;
  const emailLink = `mailto:cormac@kamrok.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const openDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = emailLink;
    setDraftOpened(true);
  };

  return (
    <KamrokLayout title="Let’s Talk — Lovable & WordPress Projects | KAMROK" description="Tell Cormac about your next website, Lovable app or project that needs a fresh pair of eyes. KAMROK, Dundalk, Ireland.">
      <div className="orbit-contact-layout">
        <div><div className="kk-eyebrow">A GOOD PLACE TO START</div><h1>What are<br />you thinking?</h1><p className="kk-lead-text">A big idea, a small fix or a “could this work?” is plenty to go on. Tell me a little about it and we’ll take it from there.</p><a className="orbit-contact-email cinematic-action" href="mailto:cormac@kamrok.com">cormac@kamrok.com <ActionFeedback icon={Mail} size={20} /></a><p className="orbit-contact-note">Based in Dundalk, Ireland. Working with good people wherever they are.<br /><br />Prefer a call? Mention it in your message and we’ll find a time.</p></div>
        <form className="orbit-enquiry" onSubmit={openDraft}>
          <label htmlFor="enquiry-help">What can I help with?</label><select id="enquiry-help" value={help} onChange={event => setHelp(event.target.value)}>{HELP.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
          <div className="orbit-enquiry-pair"><div><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required placeholder="Hello, I’m…" /></div><div><label htmlFor="enquiry-email">Email address</label><input id="enquiry-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required placeholder="you@yourbusiness.com" /></div></div>
          <label htmlFor="enquiry-message">A little about your project</label><textarea id="enquiry-message" value={message} onChange={event => setMessage(event.target.value)} rows={5} required placeholder="The idea, the problem, your current website… whatever helps tell the story." />
          <p className="orbit-enquiry-hint">A deadline or budget range is useful if you have one. No formal brief needed.</p>
          <button className="orbit-button cinematic-action" type="submit">Open email draft <ActionFeedback icon={PenLine} /></button><p className="orbit-enquiry-hint">Opens in your email app. You can review everything before sending.</p>
          {draftOpened && <p className="orbit-enquiry-status" role="status">Your email app should open with the details ready. If it doesn’t, email <a href={emailLink}>cormac@kamrok.com</a> directly. Your message hasn’t been sent by this website.</p>}
        </form>
      </div>
    </KamrokLayout>
  );
}
