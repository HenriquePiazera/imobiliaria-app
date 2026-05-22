"use client";

import { toast } from "sonner";

import {
  useEffect,
  useState,
} from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  clientSchema,
  ClientFormData,
} from "@/schemas/client.schema";

import { Client } from "@/types/client";

import { Button } from "@/components/ui/Button";

import { Input } from "@/components/ui/Input";

import { Card } from "@/components/ui/Card";

type ClientFormProps = {
  onSubmit: (
    data: ClientFormData
  ) => Promise<void>;

  editingClient: Client | null;
};

export function ClientForm({
  onSubmit,
  editingClient,
}: ClientFormProps) {
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ClientFormData>({
    resolver:
      zodResolver(clientSchema),
  });

  useEffect(() => {
    if (editingClient) {
      reset({
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
      });
    }
  }, [editingClient, reset]);

  async function handleFormSubmit(
    data: ClientFormData
  ) {
    try {
      setLoading(true);

      await onSubmit(data);

      toast.success(
        editingClient
          ? "Cliente atualizado"
          : "Cliente cadastrado"
      );

      reset();

    } catch {
      toast.error(
        "Erro ao salvar cliente"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form
        onSubmit={handleSubmit(
          handleFormSubmit
        )}
        className="space-y-4"
      >
        <Input
          type="text"
          placeholder="Nome"
          {...register("name")}
        />

        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        <Input
          type="text"
          placeholder="Telefone"
          {...register("phone")}
        />

        <Button
          type="submit"
          loading={loading}
        >
          {editingClient
            ? "Atualizar Cliente"
            : "Cadastrar Cliente"}
        </Button>
      </form>
    </Card>
  );
}