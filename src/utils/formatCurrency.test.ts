import { describe, expect, it } from "vitest";

import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
  it("formats BRL without decimals by default", () => {
    expect(formatCurrency(8500)).toContain("8.500");
  });
});
