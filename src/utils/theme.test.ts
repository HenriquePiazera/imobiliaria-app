import { describe, expect, it } from "vitest";

import {
  DEFAULT_SETTINGS,
  getPresetColors,
  mergeWithDefaults,
} from "./theme";

describe("mergeWithDefaults", () => {
  it("fills missing theme fields with defaults", () => {
    const result = mergeWithDefaults({
      companyName: "Test Imóveis",
      primaryColor: "#ff0000",
    });

    expect(result.companyName).toBe("Test Imóveis");
    expect(result.primaryColor).toBe("#ff0000");
    expect(result.themeMode).toBe("light");
    expect(result.accentColor).toBe(DEFAULT_SETTINGS.accentColor);
  });
});

describe("getPresetColors", () => {
  it("returns colors for named presets", () => {
    const ocean = getPresetColors("ocean");
    expect(ocean?.primaryColor).toBe("#1d4ed8");
    expect(ocean?.sidebarColor).toBe("#1e3a8a");
  });

  it("returns null for custom preset", () => {
    expect(getPresetColors("custom")).toBeNull();
  });
});
