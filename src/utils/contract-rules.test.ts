import { describe, expect, it } from "vitest";

import { resolvePropertyStatus } from "@/utils/contract-rules";

describe("resolvePropertyStatus", () => {
  it("marks property as rented for active rent contract", () => {
    expect(resolvePropertyStatus("rent", "active")).toBe("Alugado");
  });

  it("marks property as sold for active sale contract", () => {
    expect(resolvePropertyStatus("sale", "active")).toBe("Vendido");
  });

  it("returns available when rent contract is finished", () => {
    expect(resolvePropertyStatus("rent", "finished")).toBe("Disponível");
  });

  it("keeps sold status when sale contract is finished", () => {
    expect(resolvePropertyStatus("sale", "finished")).toBe("Vendido");
  });

  it("returns available when contract is canceled", () => {
    expect(resolvePropertyStatus("rent", "canceled")).toBe("Disponível");
  });
});
