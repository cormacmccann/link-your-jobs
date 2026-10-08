import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollFilm from "./ScrollFilm";
import "@/styles/brand-stories.css";

const CHAPTERS = [
  { eyebrow: "01 / HUMAN DIRECTION", title: "Your ambition.", emphasis: "Our starting point.", text: "We start with a conversation, not a prompt. Your customers, your goals and the things that slow you down. Human understanding turns a vague idea into a useful direction.", skills: ["Discovery & strategy", "Customer journeys", "UX research", "Content planning", "Commercial thinking"] },
  { eyebrow: "02 / CLAUDE + CHATGPT + CREATIVE INSTINCT", title: "Explore further.", emphasis: "Choose with purpose.", text: "Claude and ChatGPT help us explore ideas, question assumptions and work through possibilities. We bring the taste, experience and judgement: shaping the brand, refining the message and deciding what deserves to be built.", skills: ["Brand identity", "UI & web design", "Illustration", "Copy & storytelling", "Motion & 3D", "AI-assisted exploration"] },
  { eyebrow: "03 / FROM POSSIBLE TO WORKING", title: "Better tools.", emphasis: "Real progress.", text: "We combine AI-assisted development with hands-on design and engineering. WordPress, Lovable or Shopify, chosen for the job. Then we connect the systems, refine the details and make the experience work for real people.", skills: ["WordPress & WooCommerce", "Lovable apps", "Shopify", "Portals & dashboards", "APIs & integrations", "Bookings & ticketing", "Workflow automation"] },
  { eyebrow: "04 / PEOPLE IN THE LOOP", title: "Test it together.", emphasis: "Take it further.", text: "AI output is a starting point for review. We test the journeys, check the content and listen to your feedback. After launch, real customer behaviour helps guide what we improve next.", skills: ["Accessibility", "Mobile experience", "Performance", "SEO & AI discoverability", "Analytics & conversion", "Testing & handover", "Ongoing improvements"] },
];
export default function HumanAiStory() {
  return <div className="human-ai-story" id="human-and-ai"><div className="human-ai-intro"><span className="services-kicker">HUMAN IDEAS. EXPANDED POSSIBILITIES.</span><h2>The next level<br />starts with a conversation.</h2><p>Creative people, Claude and ChatGPT, working towards something useful. Scroll through how the skillsets come together.</p><a href="#services-offer-title">Skip to the full services list <ArrowUpRight size={16} /></a></div>
    <ScrollFilm source="/films/human-ai-space.mp4" poster="/art/brand/robot-detail.webp" id="human-ai-film-title" className="orbit-film--skills">
      {CHAPTERS.map((chapter, i) => <article className="orbit-film-chapter" key={chapter.eyebrow}><span className="orbit-eyebrow">{chapter.eyebrow}</span><h2 id={i === 0 ? "human-ai-film-title" : undefined}>{chapter.title}<br /><em>{chapter.emphasis}</em></h2><p>{chapter.text}</p><ul className="human-ai-skills" aria-label={`Skills for ${chapter.title}`}>{chapter.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>{i === 3 && <Link className="orbit-text-link" to="/contact?service=AI-assisted%20design%20and%20development">Let’s move your idea forward <ArrowUpRight size={18} /></Link>}</article>)}
    </ScrollFilm>
  </div>;
}
