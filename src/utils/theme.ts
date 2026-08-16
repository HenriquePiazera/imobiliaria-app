import { SettingsFormData, ThemePreset } from "@/types/settings";

export const DEFAULT_SETTINGS: SettingsFormData = {
  companyName: "Imobiliária App",
  email: "",
  phone: "",
  address: "",
  tagline: "CRM imobiliário",
  website: "",
  creci: "",
  logoUrl: "",
  themeMode: "light",
  themePreset: "classic",
  primaryColor: "#18181b",
  accentColor: "#3b82f6",
  sidebarColor: "#18181b",
  sidebarTextColor: "#ffffff",
  dashboardBackground: "#f4f4f5",
  cardBackground: "#ffffff",
};

type PresetColors = Pick<
  SettingsFormData,
  | "primaryColor"
  | "accentColor"
  | "sidebarColor"
  | "sidebarTextColor"
  | "dashboardBackground"
  | "cardBackground"
>;

export const THEME_PRESETS: Record<
  Exclude<ThemePreset, "custom">,
  { label: string; description: string; colors: PresetColors }
> = {
  classic: {
    label: "Clássico",
    description: "Neutro e profissional",
    colors: {
      primaryColor: "#18181b",
      accentColor: "#3b82f6",
      sidebarColor: "#18181b",
      sidebarTextColor: "#ffffff",
      dashboardBackground: "#f4f4f5",
      cardBackground: "#ffffff",
    },
  },
  ocean: {
    label: "Oceano",
    description: "Azuis corporativos",
    colors: {
      primaryColor: "#1d4ed8",
      accentColor: "#0ea5e9",
      sidebarColor: "#1e3a8a",
      sidebarTextColor: "#eff6ff",
      dashboardBackground: "#eff6ff",
      cardBackground: "#ffffff",
    },
  },
  forest: {
    label: "Floresta",
    description: "Verde sofisticado",
    colors: {
      primaryColor: "#166534",
      accentColor: "#22c55e",
      sidebarColor: "#14532d",
      sidebarTextColor: "#ecfdf5",
      dashboardBackground: "#f0fdf4",
      cardBackground: "#ffffff",
    },
  },
  sunset: {
    label: "Pôr do sol",
    description: "Tons quentes e acolhedores",
    colors: {
      primaryColor: "#c2410c",
      accentColor: "#f97316",
      sidebarColor: "#7c2d12",
      sidebarTextColor: "#fff7ed",
      dashboardBackground: "#fff7ed",
      cardBackground: "#ffffff",
    },
  },
  royal: {
    label: "Royal",
    description: "Roxo premium",
    colors: {
      primaryColor: "#6d28d9",
      accentColor: "#a855f7",
      sidebarColor: "#4c1d95",
      sidebarTextColor: "#f5f3ff",
      dashboardBackground: "#f5f3ff",
      cardBackground: "#ffffff",
    },
  },
};

export function mergeWithDefaults(
  settings?: Partial<SettingsFormData> | null
): SettingsFormData {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
}

export function applyTheme(settings: SettingsFormData) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.style.setProperty("--brand-primary", settings.primaryColor);
  root.style.setProperty("--brand-accent", settings.accentColor);
  root.style.setProperty("--sidebar-bg", settings.sidebarColor);
  root.style.setProperty("--sidebar-text", settings.sidebarTextColor);
  root.style.setProperty("--dashboard-bg", settings.dashboardBackground);
  root.style.setProperty("--card-bg", settings.cardBackground);

  root.classList.toggle("dark", settings.themeMode === "dark");

  if (settings.themeMode === "dark") {
    root.style.setProperty(
      "--dashboard-bg",
      settings.dashboardBackground || "#09090b"
    );
    root.style.setProperty(
      "--card-bg",
      settings.cardBackground || "#18181b"
    );
  }
}

export function getPresetColors(preset: ThemePreset): PresetColors | null {
  if (preset === "custom") return null;
  return THEME_PRESETS[preset].colors;
}
