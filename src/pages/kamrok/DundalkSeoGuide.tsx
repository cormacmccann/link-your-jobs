import { Link } from "react-router-dom";
import { Lightbulb, MapPin } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import KamrokLayout from "@/components/kamrok/KamrokLayout";

export default function DundalkSeoGuide() {
  return (
    <KamrokLayout
      title="How to Get Found on Google in Dundalk (I Only Copped This Myself) — KAMROK"
      description="A plain-English, step-by-step guide to local SEO for Dundalk businesses — Google Business Profile, reviews, local keywords and the mistakes I made myself, from Cormac at KAMROK."
    >
      <div className="kk-eyebrow">FIELD NOTES · OCT 2026 · BY CORMAC</div>
      <h1>How to get found on Google in Dundalk.</h1>
      <p className="kk-lead-text">
        A confession before we start: I build websites for a living, and I only sorted my own
        Google Business Profile a couple of weeks ago. The cobbler's children and all that. If
        you've been putting it off, you're in very good company — here's exactly how to do it,
        and why it matters more than you think.
      </p>

      <h2>First, the honest bit</h2>
      <p>
        I'll level with you. Most of my work comes from referrals — someone knows someone who
        had a website built by the fella in Dundalk, and away we go. I've been lucky that way.
        But that's not how it works for everyone, and it's not a plan. It's a happy accident
        with good manners.
      </p>
      <p>
        A few weeks back I finally sat down and properly fixed our own Google listing — the
        thing that shows up on Maps when someone searches "web design Dundalk". And do you know
        what? It was a bit embarrassing how much I'd left on the table. Wrong info, no
        description worth reading, half the fields blank. If I — a man who does this for a
        living — overlooked it for that long, I'd bet good money most businesses around town
        have done the same.
      </p>
      <p>
        So here's the guide I wish someone had handed me. No jargon, no nonsense, and no
        "10x your synergy". Just the steps.
      </p>

      <h2>Step 1: Claim your Google Business Profile</h2>
      <p>
        Go to <strong>business.google.com</strong> and sign in with a Google account. Search
        for your business name. If it's there, claim it. If it's not, add it. Google will want
        to verify you're a real business — usually by phone, email, video or a postcard (yes,
        an actual postcard, in the actual post, like it's 1997).
      </p>
      <p>
        This one listing controls how you appear on Google Maps and in the local results — the
        map with three businesses under it that shows up before any website links. That little
        box is where the customers are.
      </p>

      <h2>Step 2: Fill in everything. Everything.</h2>
      <p>
        Half-filled profiles look half-open. Go through every field:
      </p>
      <ul>
        <li><strong>Name:</strong> your actual business name. Don't stuff keywords in there — Google will slap you for it, and rightly so.</li>
        <li><strong>Category:</strong> pick the closest one. This matters more than almost anything else on the listing.</li>
        <li><strong>Description:</strong> say what you do, where you do it, and who it's for, in plain English. "Web design and app development for businesses in Dundalk and across Louth" beats "innovative digital solutions" every day of the week.</li>
        <li><strong>Hours, phone, website:</strong> keep them right. A wrong phone number is a customer ringing a takeaway in 2019.</li>
        <li><strong>Address or service area:</strong> if customers come to you, show your address. If you go to them (or work from the kitchen table), set a service area instead — Dundalk, Blackrock, Carlingford, wherever you actually cover.</li>
      </ul>

      <h2>Step 3: Photos — real ones</h2>
      <p>
        Add photos of your work, your premises, your team, your van, your dog if he's on the
        payroll. Listings with decent photos get noticeably more clicks and calls than ones
        without. They don't need to be professional — they need to be real. People can smell a
        stock photo from across the Boyne.
      </p>

      <h2>Step 4: Reviews — ask for them, answer them</h2>
      <p>
        Reviews are the engine of the whole thing. After a job goes well, ask the customer for
        a Google review and send them the direct link (you'll find it in your profile
        dashboard). Most people are delighted to do it — they just need to be asked.
      </p>
      <p>
        And reply to every review, good or bad. A sound, human reply to a grumpy review does
        more for you than five silent five-stars. It shows there's a person in there.
      </p>

      <h2>Step 5: Get your own website saying the same things</h2>
      <p>
        Your Google listing and your website should tell the same story. Somewhere on your
        site — homepage, contact page, footer — have your business name, your phone number and
        where you're based, written as actual text (not baked into an image). Mention Dundalk.
        Mention Louth. Mention the towns you serve. Google cross-checks all of this, and
        consistency is what builds its trust in you.
      </p>

      <h2>Step 6: Keep it alive</h2>
      <p>
        A listing you set up once and abandon slowly goes stale. Post the odd update, add new
        photos now and then, keep the hours right around Christmas and bank holidays. Fifteen
        minutes a month. That's the whole commitment.
      </p>

      <h2>Why it actually matters</h2>
      <p>
        When someone in Dundalk searches for what you do, they rarely scroll. They tap one of
        the first few results — and for local searches, those results are the map listings, not
        websites. If you're not in that box, you're invisible to the exact person standing
        three streets away with their phone out, ready to spend money.
      </p>
      <p>
        Referrals are brilliant and I wouldn't be without them. But referrals are other people
        doing your marketing when they remember to. Your Google listing works every hour of
        every day, including the ones where nobody's talking about you.
      </p>

      <h2>What we do (the short version)</h2>
      <p>
        Since you're here — we're KAMROK, a design studio based in Dundalk. We design and
        build websites, apps and brands for businesses around Louth and beyond, and we set up
        the local SEO basics properly as part of every build: the listing, the structure, the
        words Google actually reads. If you'd rather hand the whole lot to someone who'll just
        do it, that's us.
      </p>
      <p>
        We're based in Dundalk, Co. Louth and we work with businesses all over Louth, Dublin
        and Belfast. Give us a shout on <strong>+353 86 028 5904</strong> or drop a line
        to <strong>cormac@kamrok.com</strong> — or use the contact page and we'll come back
        to you quick.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="kk-cta cinematic-action" to="/contact">Talk to the studio <ActionFeedback icon={Lightbulb} /></Link>
        <Link className="kk-visit kk-visit--solid cinematic-action" to="/work">See our work <ActionFeedback icon={MapPin} /></Link>
      </div>
    </KamrokLayout>
  );
}
