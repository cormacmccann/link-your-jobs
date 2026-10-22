import { describe, expect, it } from "vitest";
import { annualDowntime, websiteBudget } from "./website-ownership";

describe("website running cost comparison", () => {
  it("counts one build and three years of recurring costs, without repeating the build", () => {
    expect(
      websiteBudget({
        build: 2400,
        domain: 35,
        hosting: 30,
        email: 10,
        care: 50,
        licences: 180,
        usage: 0,
      }),
    ).toEqual({ annual: 1295, firstYear: 3695, threeYears: 6285 });
  });
  it("annualises monthly app usage while leaving annual licences as an annual amount", () => {
    expect(
      websiteBudget({
        build: 0,
        domain: 0,
        hosting: 0,
        email: 0,
        care: 0,
        licences: 120,
        usage: 10,
      }),
    ).toEqual({ annual: 240, firstYear: 240, threeYears: 720 });
  });
  it("treats empty, non-finite and negative costs as zero", () => {
    expect(
      websiteBudget({
        build: -1,
        domain: NaN,
        hosting: Infinity,
        email: NaN,
        care: -20,
        licences: 0,
        usage: 0,
      }),
    ).toEqual({ annual: 0, firstYear: 0, threeYears: 0 });
  });
});

describe("uptime annual equivalents", () => {
  it("turns 99.9% into exactly 8 hours, 45 minutes and 36 seconds over 365 days", () => {
    expect(annualDowntime(99.9)).toEqual({
      seconds: 31536,
      days: 0,
      hours: 8,
      minutes: 45,
      remainingSeconds: 36,
    });
  });
  it("compares targets and rounds sub-second downtime to the nearest second", () => {
    expect(annualDowntime(99).seconds).toBe(315360);
    expect(annualDowntime(99.95).seconds).toBe(15768);
    expect(annualDowntime(99.99).seconds).toBe(3154);
    expect(annualDowntime(100).seconds).toBe(0);
  });
});
