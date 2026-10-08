import { useEffect, useState } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowUpRight, ChevronDown, Flag, Home, Minus, Plus, RotateCcw, X } from "lucide-react";
import { MOON_PROJECTS, type MoonProjectId } from "./moonDistrict";
import { moonSession } from "./moonSession";
import "@/styles/moon-portfolio.css";

export default function MoonPortfolio({ hidden }: { hidden: boolean }) {
  const [entered, setEntered] = useState(moonSession.entered);
  const [selected, setSelected] = useState<MoonProjectId | null>(null);
  const [nearby, setNearby] = useState<MoonProjectId | null>(null);
  const [expanded, setExpanded] = useState(true);
  useEffect(() => { setExpanded(!window.matchMedia("(max-width: 767px)").matches); }, []);
  const [hoops, setHoops] = useState(0);
  const [goals, setGoals] = useState(0);
  const [visited, setVisited] = useState<MoonProjectId[]>(() => MOON_PROJECTS.filter(p => moonSession.visited.includes(p.id)).map(p => p.id));

  useEffect(() => { moonSession.visited = visited; }, [visited]);

  useEffect(() => {
    const enter = () => setEntered(true);
    const arrive = (event: Event) => {
      const id = (event as CustomEvent<MoonProjectId | null>).detail;
      setNearby(id);
      if (id) {
        setSelected(id);
        setVisited(previous => previous.includes(id) ? previous : [...previous, id]);
      }
    };
    const collect = (event: Event) => setHoops((event as CustomEvent<number>).detail);
    const goal = (event: Event) => setGoals((event as CustomEvent<number>).detail);
    const select = (event: Event) => setSelected((event as CustomEvent<MoonProjectId>).detail);
    window.addEventListener("kamrok:moon-enter", enter);
    window.addEventListener("kamrok:moon-nearby", arrive);
    window.addEventListener("kamrok:moon-hoops", collect);
    window.addEventListener("kamrok:moon-goal", goal);
    window.addEventListener("kamrok:moon-travel", select);
    return () => {
      window.removeEventListener("kamrok:moon-enter", enter);
      window.removeEventListener("kamrok:moon-nearby", arrive);
      window.removeEventListener("kamrok:moon-hoops", collect);
      window.removeEventListener("kamrok:moon-goal", goal);
      window.removeEventListener("kamrok:moon-travel", select);
    };
  }, []);

  if (!entered || hidden) return null;
  const project = MOON_PROJECTS.find(p => p.id === selected);
  const travel = (id: MoonProjectId) => {
    setSelected(id);
    window.dispatchEvent(new CustomEvent("kamrok:moon-travel", { detail: id }));
  };

  return (
    <>
    <nav className="moon-business" aria-label="Studio and portfolio">
      <Link to="/work">Full portfolio <ArrowUpRight size={14} /></Link>
      <Link to="/contact" className="moon-business__contact">Start a project <ArrowUpRight size={14} /></Link>
    </nav>
    <div className="moon-camera" aria-label="Camera zoom">
      <button type="button" aria-label="Zoom in on the rover" onClick={() => window.dispatchEvent(new CustomEvent("kamrok:moon-zoom", { detail: "in" }))}><Plus size={16} /></button>
      <button type="button" aria-label="Zoom out from the rover" onClick={() => window.dispatchEvent(new CustomEvent("kamrok:moon-zoom", { detail: "out" }))}><Minus size={16} /></button>
      <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("kamrok:moon-zoom", { detail: "follow" }))}>Rover view</button>
      <button type="button" aria-label="Back to base" title="Back to base (R)" onClick={() => window.dispatchEvent(new CustomEvent("kamrok:moon-recover"))}><Home size={16} /></button>
    </div>
    <section className="moon-portfolio" aria-label="Explore the portfolio neighbourhood">
      <div className="moon-portfolio__status">
        <span><span className="moon-portfolio__dot" /> THE NEIGHBOURHOOD</span>
        <span>{visited.length}/3 places · {hoops}/3 hoops{goals > 0 ? ` · ${goals} goals` : ""}</span>
      </div>
      {project && expanded && (
        <article className="moon-project" style={{ "--project-color": project.color } as React.CSSProperties}>
          <img className="moon-project__image" src={project.image} alt={`${project.name} project preview`} />
          <div className="moon-project__body">
            <span className="moon-project__eyebrow">{nearby === project.id ? "YOU’VE ARRIVED" : "YOUR NEXT STOP"} / {project.number}</span>
            <h2>{project.place}</h2>
            <p>{project.description}</p>
            <Link to={`/work/${project.id}`} className="moon-project__link">Explore the project <ArrowUpRight size={16} /></Link>
          </div>
          <button type="button" className="moon-project__close" onClick={() => setSelected(null)} aria-label="Close project preview"><X size={17} /></button>
        </article>
      )}
      <div className="moon-portfolio__tray">
        <button type="button" className="moon-portfolio__toggle" aria-expanded={expanded} aria-controls="moon-destinations" onClick={() => setExpanded(!expanded)}>
          <Flag size={15} /> <span>Pick a place. We’ll drive.</span><ChevronDown size={16} style={{ transform: expanded ? undefined : "rotate(180deg)" }} />
        </button>
        {expanded && (
          <div id="moon-destinations" className="moon-portfolio__destinations">
            {MOON_PROJECTS.map(p => (
              <button type="button" key={p.id} onClick={() => travel(p.id)} aria-pressed={selected === p.id} className="moon-destination" style={{ "--project-color": p.color } as React.CSSProperties}>
                <span className="moon-destination__number">{visited.includes(p.id) ? "✓" : p.number}</span>
                <span><strong>{p.name}</strong><small>{p.place}</small></span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        )}
        <div className="moon-portfolio__foot">
          <span className="moon-portfolio__keys">WASD · Shift boost · Space brake</span>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("kamrok:moon-reset"))}><RotateCcw size={12} /> Reset toys</button>
          <Link to="/work">All work <ArrowUpRight size={12} /></Link>
        </div>
      </div>
      <span className="moon-portfolio__announcement" role="status">{nearby ? `Arrived at ${MOON_PROJECTS.find(p => p.id === nearby)?.name}. Project preview available.` : ""}</span>
    </section>
    </>
  );
}
