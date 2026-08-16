import { describe, expect, it } from "vitest";

import { getTotalPages, paginate } from "@/utils/paginate";

describe("paginate", () => {
  it("returns the correct page slice", () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    expect(paginate(items, 2, 3)).toEqual([4, 5, 6]);
  });

  it("calculates total pages", () => {
    expect(getTotalPages(7, 3)).toBe(3);
    expect(getTotalPages(0, 3)).toBe(1);
  });
});
