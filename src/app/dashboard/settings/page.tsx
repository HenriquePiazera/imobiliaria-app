"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

import { useSaveSettings, useSettings } from "@/hooks/useSettings";

type SettingsFormProps = {
  initialValues: {
    companyName: string;
    email: string;
    phone: string;
    address: string;
    primaryColor: string;
  };
};

function SettingsForm({ initialValues }: SettingsFormProps) {
  const saveSettings = useSaveSettings();
  const [form, setForm] = useState(initialValues);

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

  return (
    <form onSubmit={handleSave} className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome da imobiliária</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, companyName: e.target.value }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Telefone</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Endereço</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Cor principal</label>
          <input
            type="color"
            value={form.primaryColor}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, primaryColor: e.target.value }))
            }
            className="h-12 w-full rounded-xl border p-1"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saveSettings.isPending}
        className="rounded-xl bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
      >
        {saveSettings.isPending ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();

  const initialValues = useMemo(
    () => ({
      companyName: settings?.companyName ?? "",
      email: settings?.email ?? "",
      phone: settings?.phone ?? "",
      address: settings?.address ?? "",
      primaryColor: settings?.primaryColor ?? "#18181b",
    }),
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
          Gerencie as informações da imobiliária
        </p>
      </div>

      <SettingsForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
      />
    </div>
  );
}
