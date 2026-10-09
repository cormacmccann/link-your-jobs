import { describe, expect, it } from "vitest";
import { DEFAULT_DIY_COSTS, totalDiyCosts } from "./diy-savings";

describe("DIY website cost story", () => {
  const costs = {
    ...DEFAULT_DIY_COSTS,
    studio: 2500,
    theme: 100,
    hosting: 20,
    domain: 30,
    support: 50,
    tools: 120,
  };
  it("keeps previous studio and theme purchases out of future spend", () => {
    const result = totalDiyCosts(costs);
    expect(result.launch).toBe(2600);
    expect(result.annual).toBe(990);
    expect(result.firstYear).toBe(990);
    expect(result.futureBuildFees).toBe(0);
  });
  it("includes a new quote only when comparing a new build", () => {
    const result = totalDiyCosts({ ...costs, situation: "new" });
    expect(result.firstYear).toBe(3590);
    expect(result.futureBuildFees).toBe(2600);
  });
  it("normalises annual bills and retains domain renewal on the new route", () => {
    const result = totalDiyCosts({
      ...costs,
      hosting: 240,
      hostingPeriod: "yearly",
      support: 600,
      supportPeriod: "yearly",
    });
    expect(result.annual).toBe(990);
    expect(result.reviewableAnnual).toBe(960);
    expect(result.domain).toBe(30);
  });
  it("labels missing figures separately from confirmed free items", () => {
    expect(totalDiyCosts(DEFAULT_DIY_COSTS).missing).toBe(6);
    const result = totalDiyCosts({
      ...costs,
      studio: 0,
      theme: 0,
      hosting: 0,
      domain: 0,
      support: 0,
      tools: 0,
    });
    expect(result.missing).toBe(0);
    expect(result.annual).toBe(0);
    expect(result.runningMissing).toBe(false);
  });
  it("does not turn invalid or negative fees into savings", () => {
    const result = totalDiyCosts({
      ...costs,
      studio: -20,
      hosting: NaN,
      support: -10,
    });
    expect(result.launch).toBe(100);
    expect(result.reviewableAnnual).toBe(120);
  });
});
