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

    defaultValues: {
      status: "lead",
    },
  });

  useEffect(() => {
    if (editingClient) {
      reset({
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
        document:
          editingClient.document,
        city: editingClient.city,
        state: editingClient.state,
        address:
          editingClient.address,
        notes: editingClient.notes,
        status:
          editingClient.status,
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

      reset({
        status: "lead",
      });

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
          placeholder="Nome completo"
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

        <Input
          type="text"
          placeholder="CPF"
          {...register("document")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Cidade"
            {...register("city")}
          />

          <Input
            type="text"
            placeholder="Estado"
            {...register("state")}
          />
        </div>

        <Input
          type="text"
          placeholder="Endereço"
          {...register("address")}
        />

        <select
          {...register("status")}
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            bg-white
            px-4
            py-3
            text-sm
            outline-none
          "
        >
          <option value="lead">
            Lead
          </option>

          <option value="service">
            Em atendimento
          </option>

          <option value="proposal">
            Proposta enviada
          </option>

          <option value="closed">
            Cliente fechado
          </option>

          <option value="lost">
            Perdido
          </option>
        </select>

        <textarea
          placeholder="Observações"
          {...register("notes")}
          className="
            w-full
            min-h-[120px]
            rounded-lg
            border
            border-zinc-300
            bg-white
            px-4
            py-3
            text-sm
            outline-none
          "
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