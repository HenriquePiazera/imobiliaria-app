"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { useOwnerId } from "@/hooks/useOwnerId";
import { SeedDemoService } from "@/services/seed/seed-demo.service";

type SeedDemoButtonProps = {
  hasData: boolean;
};

export function SeedDemoButton({ hasData }: SeedDemoButtonProps) {
  const { ownerId } = useOwnerId();
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    if (!ownerId) return;

    if (
      hasData &&
      !window.confirm(
        "Isso vai adicionar dados de demonstração à sua conta. Deseja continuar?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await new SeedDemoService(ownerId).seed();
      toast.success("Dados de demonstração carregados com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao carregar dados de demonstração"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button type="button" loading={loading} onClick={handleSeed}>
      {hasData ? "Adicionar demo" : "Popular com dados demo"}
    </Button>
  );
}
