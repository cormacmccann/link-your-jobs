import { cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WebsiteQuality from "./WebsiteQuality";

vi.mock("@/lib/router-compat", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
let intersect: IntersectionObserverCallback;
let preferenceChanged: () => void;
let reduced = false;
let nextFrame: FrameRequestCallback | undefined;
const observe = vi.fn();
const disconnect = vi.fn();
const raf = vi.fn((callback: FrameRequestCallback) => {
  nextFrame = callback;
  return 1;
});
const cancel = vi.fn();
const matchMedia = vi.fn(() => ({
  get matches() {
    return reduced;
  },
  addEventListener: (_event: string, callback: () => void) => {
    preferenceChanged = callback;
  },
  removeEventListener: vi.fn(),
}));
beforeEach(() => {
  reduced = false;
  nextFrame = undefined;
  vi.clearAllMocks();
  vi.stubGlobal("matchMedia", matchMedia);
  vi.stubGlobal("requestAnimationFrame", raf);
  vi.stubGlobal("cancelAnimationFrame", cancel);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe = observe;
      disconnect = disconnect;
    },
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const visibility = (gauges: Element[], visible: boolean) =>
  intersect(
    gauges.map(
      (target) =>
        ({
          target,
          isIntersecting: visible,
          intersectionRatio: visible ? 1 : 0,
        }) as IntersectionObserverEntry,
    ),
    {} as IntersectionObserver,
  );
const gauges = (container: HTMLElement) => [
  ...container.querySelectorAll(".quality-gauge"),
];
const tick = (time: number) => {
  const callback = nextFrame!;
  nextFrame = undefined;
  callback(time);
};

describe("website quality motion and static fallback", () => {
  it("renders complete results on the server without consulting browser state", () => {
    const html = renderToString(<WebsiteQuality />);
    expect(matchMedia).not.toHaveBeenCalled();
    expect(html.match(/data-quality-number/g)).toHaveLength(4);
    expect(html).toContain('aria-label="Performance: 100 out of 100"');
    expect(html).not.toMatch(/lovable/i);
  });
  it("replays after leaving from either direction, with confetti only at each completed score", () => {
    const { container } = render(<WebsiteQuality />);
    const numbers = () =>
      [...container.querySelectorAll("[data-quality-number]")].map(
        (node) => node.textContent,
      );
    expect(raf).not.toHaveBeenCalled();
    visibility(gauges(container), true);
    tick(0);
    tick(600);
    expect(Number(numbers()[0])).toBeGreaterThan(Number(numbers()[3]));
    expect(
      screen.getByRole("img", { name: "Performance: 100 out of 100" }),
    ).toBeInTheDocument();
    tick(1200);
    expect(numbers()[0]).toBe("99");
    expect(container.querySelector(".quality-celebrate")).toBeNull();
    tick(1250);
    expect(numbers()[0]).toBe("100");
    expect(container.querySelectorAll(".quality-celebrate")).toHaveLength(1);
    tick(2000);
    expect(numbers()).toEqual(["100", "100", "100", "100"]);
    expect(container.querySelectorAll(".quality-celebrate")).toHaveLength(4);
    const calls = raf.mock.calls.length;
    visibility(gauges(container), true);
    expect(raf).toHaveBeenCalledTimes(calls);
    visibility(gauges(container), false);
    expect(numbers()).toEqual(["0", "0", "0", "0"]);
    expect(container.querySelector(".quality-celebrate")).toBeNull();
    visibility(gauges(container), true);
    tick(3000);
    tick(5000);
    expect(numbers()).toEqual(["100", "100", "100", "100"]);
    expect(container.querySelectorAll(".quality-celebrate")).toHaveLength(4);
  });
  it("animates each ring independently so offscreen mobile rows wait for their entrance", () => {
    const { container } = render(<WebsiteQuality />);
    const rings = gauges(container);
    expect(observe).toHaveBeenCalledTimes(4);
    visibility([rings[0]!], true);
    tick(0);
    tick(1400);
    expect(
      [...container.querySelectorAll("[data-quality-number]")].map(
        (n) => n.textContent,
      ),
    ).toEqual(["100", "0", "0", "0"]);
    visibility([rings[2]!], true);
    tick(2000);
    tick(3400);
    expect(container.querySelectorAll(".quality-celebrate")).toHaveLength(2);
  });
  it("shows final scores without animation for reduced motion and stops if that preference changes", () => {
    reduced = true;
    const { container, unmount } = render(<WebsiteQuality />);
    expect(observe).not.toHaveBeenCalled();
    expect(container.querySelector("[data-quality-number]")).toHaveTextContent(
      "100",
    );
    unmount();
    reduced = false;
    const next = render(<WebsiteQuality />);
    visibility(gauges(next.container), true);
    tick(0);
    tick(400);
    reduced = true;
    preferenceChanged();
    expect(
      [...next.container.querySelectorAll("[data-quality-number]")].every(
        (node) => node.textContent === "100",
      ),
    ).toBe(true);
    expect(cancel).toHaveBeenCalled();
    expect(next.container.querySelector(".quality-celebrate")).toBeNull();
    reduced = false;
    preferenceChanged();
    visibility(gauges(next.container), true);
    tick(1000);
    tick(3000);
    expect(next.container.querySelectorAll(".quality-celebrate")).toHaveLength(
      4,
    );
  });
  it("disconnects and cancels pending animation when the page unmounts", () => {
    const { container, unmount } = render(<WebsiteQuality />);
    visibility(gauges(container), true);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledWith(1);
  });
});
