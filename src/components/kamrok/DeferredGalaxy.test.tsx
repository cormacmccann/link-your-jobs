import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DeferredGalaxy from "./DeferredGalaxy";

vi.mock("./Galaxy", () => ({ default: () => <canvas data-testid="galaxy" /> }));

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let desktop = false;
let reduced = false;

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(document, "readyState", "get").mockReturnValue("complete");
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        matches: query.includes("reduced-motion") ? reduced : desktop,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof intersect) {
        intersect = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  // Exercise the timer fallback deterministically without relying on browser idle time.
  vi.stubGlobal("requestIdleCallback", undefined);
  desktop = false;
  reduced = false;
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

async function idle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(800);
  });
}

describe("decorative galaxy loading budget", () => {
  it("keeps phones on the CSS starfield even after interaction", async () => {
    const { container } = render(
      <section className="space-hero">
        <DeferredGalaxy />
      </section>,
    );
    act(() => intersect([{ isIntersecting: true }]));
    fireEvent.pointerMove(container.firstChild!);
    await idle();
    expect(screen.queryByTestId("galaxy")).toBeNull();
  });

  it("waits for both desktop interaction and visibility, and cancels work when leaving", async () => {
    desktop = true;
    const { container } = render(
      <section className="space-hero">
        <DeferredGalaxy />
      </section>,
    );
    act(() => intersect([{ isIntersecting: true }]));
    await idle();
    expect(screen.queryByTestId("galaxy")).toBeNull();
    fireEvent.pointerMove(container.firstChild!);
    act(() => intersect([{ isIntersecting: false }]));
    await idle();
    expect(screen.queryByTestId("galaxy")).toBeNull();
    act(() => intersect([{ isIntersecting: true }]));
    await idle();
    expect(screen.getByTestId("galaxy")).toBeInTheDocument();
  });

  it("respects reduced motion and the explicit pause control", async () => {
    desktop = true;
    reduced = true;
    const { container, rerender } = render(
      <section className="space-hero">
        <DeferredGalaxy />
      </section>,
    );
    act(() => intersect([{ isIntersecting: true }]));
    fireEvent.pointerMove(container.firstChild!);
    await idle();
    expect(screen.queryByTestId("galaxy")).toBeNull();
    reduced = false;
    rerender(
      <section className="space-hero">
        <DeferredGalaxy paused />
      </section>,
    );
    act(() => intersect([{ isIntersecting: true }]));
    fireEvent.pointerMove(container.firstChild!);
    await idle();
    expect(screen.queryByTestId("galaxy")).toBeNull();
  });
});
