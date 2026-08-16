"use client";

import { ReactNode, useEffect } from "react";

import { useSettings } from "@/hooks/useSettings";
import { applyTheme, mergeWithDefaults } from "@/utils/theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data: settings } = useSettings();

  useEffect(() => {
    applyTheme(mergeWithDefaults(settings ?? undefined));
  }, [settings]);

  return <>{children}</>;
}
