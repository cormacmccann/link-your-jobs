import PortfolioImage from "@/components/kamrok/PortfolioImage";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { useStudioTheme } from "@/hooks/useStudioTheme";

export default function CaseImageGallery({
  images: suppliedImages,
  name,
  groupByKind = false,
}: {
  images: ProjectImage[];
  name: string;
  groupByKind?: boolean;
}) {
  const { theme } = useStudioTheme();
  const source = (shot: ProjectImage) => shot.themeSources?.[theme] ?? shot.src;
  const surface = (shot: ProjectImage) =>
    shot.presentation === "logo"
      ? theme === "dark"
        ? "#080e1c"
        : "#faf5e7"
      : shot.surface;
  const groups = groupByKind
    ? [
        {
          id: "website",
          title: "Website design",
          description:
            "Rooms, dining and Carlingford, brought together online.",
        },
        {
          id: "branding",
          title: "Brand identity",
          description: "The logo, family reference, signage and printed work.",
        },
        {
          id: "archive",
          title: "Earlier identities",
          description:
            "The earlier logos, retained as context for the redesign.",
        },
        { id: "other", title: "More project work", description: "" },
      ]
        .map((group) => ({
          ...group,
          images: suppliedImages.filter((shot) =>
            group.id === "other" ? !shot.kind : shot.kind === group.id,
          ),
        }))
        .filter((group) => group.images.length)
    : [{ id: "all", title: "", description: "", images: suppliedImages }];
  const images = groups.flatMap((group) => group.images);
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const image = selected === null ? undefined : images[selected];
  const step = (direction: number) =>
    setSelected((position) =>
      position === null
        ? null
        : (position + direction + images.length) % images.length,
    );
  return (
    <Dialog.Root
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) setSelected(null);
      }}
    >
      <div className="case-gallery-sections">
        {groupByKind && (
          <nav className="case-gallery-jumps" aria-label="Explore project work">
            {groups.map((group) => (
              <a key={group.id} href={`#case-gallery-${group.id}`}>
                {group.title}
              </a>
            ))}
          </nav>
        )}
        {groups.map((group) => (
          <section
            key={group.id}
            id={groupByKind ? `case-gallery-${group.id}` : undefined}
            aria-label={group.title || undefined}
          >
            {groupByKind && (
              <header className="case-gallery-heading">
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </header>
            )}
            <div className="case-gallery">
              {group.images.map((shot) => {
                const index = images.indexOf(shot);
                return (
                  <figure key={shot.src}>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        className={`case-image-surface case-image-link${shot.presentation === "logo" ? " case-image-surface--logo" : ""}`}
                        style={{ backgroundColor: surface(shot) }}
                        aria-label={`Enlarge ${shot.caption}`}
                        onClick={(event) => {
                          trigger.current = event.currentTarget;
                          setSelected(index);
                        }}
                      >
                        <PortfolioImage
                          src={source(shot)}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="case-image-expand" aria-hidden="true">
                          <Expand size={18} />
                        </span>
                      </button>
                    </Dialog.Trigger>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {shot.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="case-viewer-overlay" />
        <Dialog.Content
          className="case-viewer"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              step(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          <div className="case-viewer-toolbar">
            <div>
              <Dialog.Title>{name}</Dialog.Title>
              <Dialog.Description>{image?.caption}</Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close image viewer">
              <X size={22} />
            </Dialog.Close>
          </div>
          {image && (
            <div
              className={`case-viewer-image${image.presentation === "logo" ? " case-viewer-image--logo" : ""}`}
              style={{ backgroundColor: surface(image) }}
            >
              <img src={source(image)} alt={image.alt} />
            </div>
          )}
          <div className="case-viewer-controls">
            <button
              type="button"
              aria-label="Previous image"
              disabled={images.length < 2}
              onClick={() => step(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <span aria-live="polite">
              {(selected ?? 0) + 1} / {images.length}
            </span>
            {image && (
              <a href={source(image)} target="_blank" rel="noopener noreferrer">
                Open original <span className="sr-only">in a new tab</span>
              </a>
            )}
            <button
              type="button"
              aria-label="Next image"
              disabled={images.length < 2}
              onClick={() => step(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
