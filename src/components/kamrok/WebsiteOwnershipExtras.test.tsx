import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { WebsiteUptime } from "./WebsiteOwnershipExtras";
import WebsiteBudget from "./WebsiteBudget";

afterEach(cleanup);

it("lets an owner compare availability targets and announces the new annual equivalent", () => {
  render(<WebsiteUptime />);
  const output = screen.getByText(/Downtime at exactly/).parentElement!;
  expect(output).toHaveTextContent("8h 45m 36s");
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "99.99" },
  });
  expect(output).toHaveTextContent("99.99%");
  expect(output).toHaveTextContent("0h 52m 34s");
});

it("includes the whole team's monthly email bill in running costs", () => {
  render(<WebsiteBudget />);
  fireEvent.change(screen.getByLabelText(/Hosted email/), {
    target: { value: "30" },
  });
  expect(screen.getByText("€1,535")).toBeInTheDocument();
  expect(screen.getByText("€3,935")).toBeInTheDocument();
  expect(screen.getByText("€7,005")).toBeInTheDocument();
});
