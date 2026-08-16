import { useMutation, useQuery } from "@tanstack/react-query";

import { SettingsRepository } from "@/repositories/settings/settings.repository";
import { Settings } from "@/types/settings";
import { useOwnerId } from "./useOwnerId";

export function useSettings() {
  const { ownerId, loading: authLoading } = useOwnerId();

  return useQuery({
    queryKey: ["settings", ownerId],
    queryFn: async () => {
      if (!ownerId) return null;
      return new SettingsRepository(ownerId).getSettings();
    },
    enabled: !!ownerId && !authLoading,
  });
}

export function useSaveSettings() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (settings: Omit<Settings, "ownerId">) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new SettingsRepository(ownerId).saveSettings(settings);
    },
  });
}
