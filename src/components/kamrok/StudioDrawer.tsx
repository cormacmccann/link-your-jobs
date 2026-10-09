import { lazy, Suspense } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, NavLink } from "@/lib/router-compat";
import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import { CONTACT_PHONE, CONTACT_TEL } from "@/lib/brand";
import "@/styles/drawers.css";

const FunRoverPreview = lazy(() => import("./FunRoverPreview"));
const NAV = [
  ["/", "Home", "Welcome to my little corner of the internet."],
  ["/work", "The work", "Websites, apps and ideas out in the world."],
  ["/templates", "Templates", "A head start for something of your own."],
  ["/skills", "What I do", "Design, development and the right platform."],
  ["/about", "The studio", "Meet Cormac. Meet KAMROK."],
  ["/contact", "Let’s talk", "A big idea or a small question. Start here."],
] as const;
export type DrawerKind = "menu" | "fun" | null;
export default function StudioDrawer({ kind, onChange, trigger }: { kind: DrawerKind; onChange: (kind: DrawerKind) => void; trigger: React.RefObject<HTMLElement | null> }) {
  const { theme } = useStudioTheme();
  const fun = kind === "fun";
  return <Dialog.Root open={kind !== null} onOpenChange={open => { if (!open) onChange(null); }}>
    <Dialog.Portal><Dialog.Overlay className="studio-drawer-overlay" />
      <Dialog.Content className={`studio-page studio-drawer ${fun ? "studio-drawer--fun" : "studio-drawer--menu"}`} data-theme={theme} onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
        <div className="studio-drawer-top"><span>KAMROK / {fun ? "OFF DUTY" : "EXPLORE"}</span><Dialog.Close className="studio-drawer-close" aria-label="Close menu"><X size={23} /></Dialog.Close></div>
        <Dialog.Title>{fun ? "A little less serious. A lot more fun." : "Where shall we go?"}</Dialog.Title>
        <Dialog.Description>{fun ? "Side projects, playful experiments and things built simply because they make me smile. Come and have a go." : "Independent design and development from Dundalk, Ireland. Pick a direction, or get in touch with me directly."}</Dialog.Description>
        {fun ? <div className="fun-projects">
          <section className="fun-project"><div className="fun-preview"><Suspense fallback={<p className="fun-preview-fallback">Getting the chimp ready…</p>}><FunRoverPreview /></Suspense><span>DRAG TO HAVE A LOOK AROUND</span></div><p className="fun-number">01 / THE 3D PLAYGROUND</p><h3>One chimp. One buggy. A whole moon.</h3><p>Meet the studio’s most adventurous test pilot. This is my just-for-fun project in 3D: a moon to explore, a chimp to ride with and a good excuse to take the scenic route.</p><Link className="orbit-button" to="/fun" onClick={() => onChange(null)}>Let’s go to the moon <ArrowUpRight size={19} /></Link></section>
          <section className="fun-project"><a href="https://hnefataflkamrok.lovable.app/" target="_blank" rel="noopener noreferrer"><img src="/projects/tafl/catalogue.webp" alt="TAFL’s atmospheric catalogue of strategy games" loading="lazy" /></a><p className="fun-number">02 / PICK YOUR SAGA</p><h3>Old games. New adventures.</h3><p>Step into TAFL: a world of fascinating strategy games, atmospheric boards and “just one more move”. Discover a variant, explore the lore and put your next bright idea to the test. Built with Lovable, for the joy of playing.</p><a className="orbit-button" href="https://hnefataflkamrok.lovable.app/" target="_blank" rel="noopener noreferrer">Play TAFL <ArrowUpRight size={19} /><span className="sr-only"> (opens in a new tab)</span></a></section>
          <section className="fun-project"><Link to="/illustrations" onClick={() => onChange(null)}><img src="/illustrations/forest-spirits.jpg" alt="A forest creature watching glowing spirits, illustrated by Cormac" loading="lazy" /></Link><p className="fun-number">03 / THE SKETCHBOOK</p><h3>A little imagination. No brief required.</h3><p>Personal illustrations, pencil sketches and imaginary worlds. Things I draw simply for the fun of it.</p><Link className="orbit-button" to="/illustrations" onClick={() => onChange(null)}>Explore the illustrations <ArrowUpRight size={19} /></Link></section>
          <p className="fun-signoff">No brief. No sensible reason. Just curiosity.</p>
        </div> : <>
          <nav className="studio-drawer-nav" aria-label="Mobile navigation">{NAV.map(([to, label, detail]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => onChange(null)}><span>{label}<small>{detail}</small></span><ArrowUpRight size={24} /></NavLink>)}</nav>
          <button className="studio-drawer-play" onClick={() => onChange("fun")}><span>Take a play break<small>Illustrations, 3D adventures & TAFL games</small></span><ArrowUpRight /></button>
          <div className="studio-drawer-contact"><span>DIRECT TO CORMAC</span><a href={CONTACT_TEL}><Phone size={17} />{CONTACT_PHONE}</a><a href="mailto:cormac@kamrok.com"><Mail size={17} />cormac@kamrok.com</a><p>WordPress · Lovable · Shopify<br />Design with character. Built around your business.</p></div>
        </>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
