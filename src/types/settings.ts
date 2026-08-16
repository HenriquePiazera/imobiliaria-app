export type ThemeMode = "light" | "dark";

export type ThemePreset =
  | "classic"
  | "ocean"
  | "forest"
  | "sunset"
  | "royal"
  | "custom";

export interface Settings {
  ownerId: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  tagline: string;
  website: string;
  creci: string;
  logoUrl: string;
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  primaryColor: string;
  accentColor: string;
  sidebarColor: string;
  sidebarTextColor: string;
  dashboardBackground: string;
  cardBackground: string;
}

export type SettingsFormData = Omit<Settings, "ownerId">;
