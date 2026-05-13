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
    <form
      onSubmit={handleSubmit(
        handleFormSubmit
      )}
      className="
        bg-white
        p-6
        rounded-xl
        shadow
        space-y-4
        max-w-xl
      "
    >
      <input
        type="text"
        placeholder="Nome"
        {...register("name")}
        className="
          w-full
          border
          p-3
          rounded
        "
      />

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="
          w-full
          border
          p-3
          rounded
        "
      />

      <input
        type="text"
        placeholder="Telefone"
        {...register("phone")}
        className="
          w-full
          border
          p-3
          rounded
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-zinc-900
          text-white
          px-4
          py-3
          rounded-lg
        "
      >
        {loading
          ? "Salvando..."
          : editingClient
          ? "Atualizar Cliente"
          : "Cadastrar Cliente"}
      </button>
    </form>
  );
}