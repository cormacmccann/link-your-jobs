import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { ILLUSTRATIONS, type Illustration } from "@/data/illustrations";
import "@/styles/illustrations.css";

const filters = [
  { id: "all", label: "All the artwork" },
  { id: "digital", label: "Digital worlds" },
  { id: "sketchbook", label: "The sketchbook" },
] as const;

export default function Illustrations({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [filter, setFilter] = useState<"all" | Illustration["kind"]>("all");
  const artworkTrigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<Illustration | null>(null);
  const artwork = ILLUSTRATIONS.filter(
    (item) => filter === "all" || item.kind === filter,
  );
  const position = selected
    ? artwork.findIndex((item) => item.id === selected.id)
    : -1;
  const step = (direction: number) =>
    setSelected(
      artwork[(position + direction + artwork.length) % artwork.length] ?? null,
    );

  return (
    <div
      className={
        embedded
          ? "illustrations-embedded"
          : "illustrations-page studio-container"
      }
    >
      {!embedded && (
        <header className="illustrations-intro">
          <p className="orbit-eyebrow">CORMAC’S SKETCHBOOK / JUST FOR FUN</p>
          <h1>
            A little imagination.
            <br />
            <em>No brief required.</em>
          </h1>
          <div className="illustrations-lead">
            <p>
              Drawing is something I do for the joy of it. A collection of
              sketches, characters and imaginary worlds from the hours when I’m
              making things just for myself.
            </p>
            <span>
              {ILLUSTRATIONS.length} PIECES
              <br />
              ILLUSTRATIONS BY CORMAC McCANN
            </span>
          </div>
        </header>
      )}
      <div className="illustrations-toolbar">
        <div
          className="illustrations-filters"
          role="group"
          aria-label="Filter illustrations"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              aria-controls="illustration-gallery"
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p aria-live="polite">
          {artwork.length} pieces · Open one for a closer look
        </p>
      </div>
      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <div id="illustration-gallery" className="illustration-gallery">
          {artwork.map((item, index) => (
            <figure key={item.id} className="illustration-piece">
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="illustration-open"
                  onClick={(event) => {
                    artworkTrigger.current = event.currentTarget;
                    setSelected(item);
                  }}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="illustration-expand" aria-hidden="true">
                    <Expand size={18} />
                  </span>
                </button>
              </Dialog.Trigger>
              <figcaption>
                <span>{item.title}</span>
                <small>
                  {item.note ??
                    (item.kind === "sketchbook"
                      ? "From the sketchbook"
                      : "Personal artwork")}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="illustration-overlay" />
          <Dialog.Content
            className="illustration-viewer"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              artworkTrigger.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                step(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                step(-1);
              }
            }}
          >
            {selected && (
              <>
                <div className="illustration-viewer-heading">
                  <div>
                    <Dialog.Title>{selected.title}</Dialog.Title>
                    <Dialog.Description>
                      {selected.note ??
                        "Personal illustration by Cormac McCann."}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close aria-label="Close artwork">
                    <X />
                  </Dialog.Close>
                </div>
                <img
                  className="illustration-full"
                  src={selected.src}
                  alt={selected.alt}
                  width={selected.width}
                  height={selected.height}
                />
                <div className="illustration-viewer-controls">
                  <button
                    type="button"
                    aria-label="Previous artwork"
                    onClick={() => step(-1)}
                  >
                    <ArrowLeft /> Previous
                  </button>
                  <span>
                    {position + 1} / {artwork.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next artwork"
                    onClick={() => step(1)}
                  >
                    Next <ArrowRight />
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {!embedded && (
        <div className="illustrations-signoff">
          <p>
            Sometimes it starts with a pencil.
            <br />
            Sometimes with “what if?”
          </p>
          <Link to="/work">
            Back to the design work <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
