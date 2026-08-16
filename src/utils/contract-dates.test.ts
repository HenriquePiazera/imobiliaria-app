import { describe, expect, it } from "vitest";

import { Contract } from "@/types/contract";

import { getDaysUntil, getExpiringContracts } from "@/utils/contract-dates";

const baseContract: Contract = {
  id: "1",
  ownerId: "user-1",
  clientId: "c1",
  propertyId: "p1",
  clientName: "Cliente",
  propertyTitle: "Imóvel",
  type: "rent",
  value: 3000,
  status: "active",
  startDate: "2026-01-01",
  endDate: "2026-09-01",
  createdAt: "2026-01-01",
};

describe("getExpiringContracts", () => {
  it("returns active rent contracts ending within 30 days", () => {
    const reference = new Date("2026-08-16");
    const result = getExpiringContracts([baseContract], 30, reference);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("ignores contracts without end date", () => {
    const reference = new Date("2026-08-16");
    const result = getExpiringContracts(
      [{ ...baseContract, endDate: undefined }],
      30,
      reference
    );

    expect(result).toHaveLength(0);
  });
});

describe("getDaysUntil", () => {
  it("calculates remaining days", () => {
    const days = getDaysUntil("2026-09-01", new Date("2026-08-16"));
    expect(days).toBe(16);
  });
});
