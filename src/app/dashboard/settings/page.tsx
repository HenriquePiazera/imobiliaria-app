"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Moon, Palette, Sun } from "lucide-react";
import { toast } from "sonner";

import { useSaveSettings, useSettings } from "@/hooks/useSettings";
import { SettingsFormData, ThemePreset } from "@/types/settings";
import {
  DEFAULT_SETTINGS,
  THEME_PRESETS,
  applyTheme,
  getPresetColors,
  mergeWithDefaults,
} from "@/utils/theme";

type SettingsFormProps = {
  initialValues: SettingsFormData;
};

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 cursor-pointer rounded-lg border p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 font-mono text-sm uppercase"
        />
      </div>
    </div>
  );
}

function SettingsForm({ initialValues }: SettingsFormProps) {
  const saveSettings = useSaveSettings();
  const [form, setForm] = useState<SettingsFormData>(initialValues);

  useEffect(() => {
    applyTheme(form);
  }, [form]);

  function updateForm(partial: Partial<SettingsFormData>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function handlePresetSelect(preset: ThemePreset) {
    if (preset === "custom") {
      updateForm({ themePreset: "custom" });
      return;
    }

    const colors = getPresetColors(preset);
    if (!colors) return;

    updateForm({
      themePreset: preset,
      ...colors,
    });
  }

  function handleThemeMode(mode: "light" | "dark") {
    if (mode === "dark") {
      updateForm({
        themeMode: "dark",
        dashboardBackground: "#09090b",
        cardBackground: "#18181b",
        sidebarTextColor: form.sidebarTextColor || "#fafafa",
      });
      return;
    }

    const presetColors =
      form.themePreset !== "custom"
        ? getPresetColors(form.themePreset)
        : null;

    updateForm({
      themeMode: "light",
      dashboardBackground:
        presetColors?.dashboardBackground ?? DEFAULT_SETTINGS.dashboardBackground,
      cardBackground:
        presetColors?.cardBackground ?? DEFAULT_SETTINGS.cardBackground,
    });
  }

  function handleColorChange(
    key: keyof SettingsFormData,
    value: string
  ) {
    updateForm({
      [key]: value,
      themePreset: "custom",
    } as Partial<SettingsFormData>);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    try {
      await saveSettings.mutateAsync(form);
      toast.success("Configurações salvas");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configurações");
    }
  }

  function handleResetTheme() {
    const colors = getPresetColors("classic");
    if (!colors) return;

    setForm((prev) => ({
      ...prev,
      themeMode: "light",
      themePreset: "classic",
      ...colors,
    }));
    toast.message("Tema restaurado para o padrão");
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="theme-card space-y-6 rounded-2xl border p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">Dados da imobiliária</h2>
              <p className="text-sm text-zinc-500">
                Informações exibidas no sistema e em documentos
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Nome da imobiliária</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateForm({ companyName: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Slogan / tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => updateForm({ tagline: e.target.value })}
                  placeholder="Ex: Seu imóvel ideal está aqui"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm({ email: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => updateForm({ phone: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Endereço</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateForm({ address: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => updateForm({ website: e.target.value })}
                  placeholder="https://sua-imobiliaria.com.br"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">CRECI</label>
                <input
                  type="text"
                  value={form.creci}
                  onChange={(e) => updateForm({ creci: e.target.value })}
                  placeholder="Ex: J-12345"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>
          </section>

          <section className="theme-card space-y-6 rounded-2xl border p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">Identidade visual</h2>
              <p className="text-sm text-zinc-500">
                Logo e elementos de marca no menu lateral
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL do logo</label>
              <input
                type="url"
                value={form.logoUrl}
                onChange={(e) => updateForm({ logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            {form.logoUrl ? (
              <div className="rounded-xl border bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="mb-2 text-xs font-medium text-zinc-500">Prévia</p>
                <img
                  src={form.logoUrl}
                  alt="Logo"
                  className="h-12 w-auto max-w-full object-contain"
                />
              </div>
            ) : null}
          </section>

          <section className="theme-card space-y-6 rounded-2xl border p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Palette size={20} />
                  Tema e cores
                </h2>
                <p className="text-sm text-zinc-500">
                  Personalize a aparência do dashboard
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetTheme}
                className="rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Restaurar padrão
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Modo do tema</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleThemeMode("light")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    form.themeMode === "light"
                      ? "border-[var(--brand-accent)] bg-[color-mix(in_srgb,var(--brand-accent)_12%,transparent)]"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Sun size={18} />
                  Claro
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeMode("dark")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    form.themeMode === "dark"
                      ? "border-[var(--brand-accent)] bg-[color-mix(in_srgb,var(--brand-accent)_12%,transparent)]"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Moon size={18} />
                  Escuro
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Presets de cor</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  Object.entries(THEME_PRESETS) as [
                    Exclude<ThemePreset, "custom">,
                    (typeof THEME_PRESETS)[Exclude<ThemePreset, "custom">],
                  ][]
                ).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePresetSelect(key)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      form.themePreset === key
                        ? "ring-2 ring-[var(--brand-accent)]"
                        : "hover:border-zinc-300"
                    }`}
                  >
                    <div className="mb-3 flex gap-1">
                      <span
                        className="h-5 w-5 rounded-full border"
                        style={{ backgroundColor: preset.colors.primaryColor }}
                      />
                      <span
                        className="h-5 w-5 rounded-full border"
                        style={{ backgroundColor: preset.colors.accentColor }}
                      />
                      <span
                        className="h-5 w-5 rounded-full border"
                        style={{ backgroundColor: preset.colors.sidebarColor }}
                      />
                    </div>
                    <p className="text-sm font-medium">{preset.label}</p>
                    <p className="text-xs text-zinc-500">{preset.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ColorField
                label="Cor principal (botões)"
                value={form.primaryColor}
                onChange={(value) => handleColorChange("primaryColor", value)}
              />
              <ColorField
                label="Cor de destaque"
                value={form.accentColor}
                onChange={(value) => handleColorChange("accentColor", value)}
              />
              <ColorField
                label="Cor do menu lateral"
                value={form.sidebarColor}
                onChange={(value) => handleColorChange("sidebarColor", value)}
              />
              <ColorField
                label="Texto do menu lateral"
                value={form.sidebarTextColor}
                onChange={(value) =>
                  handleColorChange("sidebarTextColor", value)
                }
              />
              <ColorField
                label="Fundo do dashboard"
                value={form.dashboardBackground}
                onChange={(value) =>
                  handleColorChange("dashboardBackground", value)
                }
              />
              <ColorField
                label="Fundo dos cards"
                value={form.cardBackground}
                onChange={(value) => handleColorChange("cardBackground", value)}
              />
            </div>
          </section>

          <button
            type="submit"
            disabled={saveSettings.isPending}
            className="brand-button rounded-xl px-6 py-3 font-medium disabled:opacity-60"
          >
            {saveSettings.isPending ? "Salvando..." : "Salvar configurações"}
          </button>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <div className="theme-card rounded-2xl border p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium text-zinc-500">
              Prévia ao vivo
            </p>

            <div
              className="overflow-hidden rounded-xl border"
              style={{ backgroundColor: form.dashboardBackground }}
            >
              <div
                className="flex h-10 items-center px-3 text-xs font-medium"
                style={{
                  backgroundColor: form.sidebarColor,
                  color: form.sidebarTextColor,
                }}
              >
                {form.logoUrl ? (
                  <img
                    src={form.logoUrl}
                    alt=""
                    className="mr-2 h-6 w-auto object-contain"
                  />
                ) : null}
                {form.companyName || "Imobiliária"}
              </div>

              <div className="p-3">
                <div
                  className="mb-2 rounded-lg p-3"
                  style={{ backgroundColor: form.cardBackground }}
                >
                  <div
                    className="mb-2 h-2 w-16 rounded"
                    style={{ backgroundColor: form.accentColor }}
                  />
                  <div className="mb-1 h-2 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>

                <div
                  className="inline-block rounded-lg px-3 py-1.5 text-xs text-white"
                  style={{ backgroundColor: form.primaryColor }}
                >
                  Botão
                </div>
              </div>
            </div>

            {form.tagline ? (
              <p className="mt-3 text-center text-xs text-zinc-500">
                {form.tagline}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </form>
  );
}

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();

  const initialValues = useMemo(
    () => mergeWithDefaults(settings ?? undefined),
    [settings]
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-zinc-500">
          Personalize dados da imobiliária, identidade visual e tema do sistema
        </p>
      </div>

      <SettingsForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
      />
    </div>
  );
}
