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

  onCancelEdit: () => void;
};

export function ClientForm({
  onSubmit,
  editingClient,
  onCancelEdit,
}: ClientFormProps) {
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
        document:
          editingClient.document,
        address:
          editingClient.address,
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
        <div>
          <Input
            type="text"
            placeholder="Nome"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Telefone"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="CPF/CNPJ"
            {...register("document")}
          />

          {errors.document && (
            <p className="text-sm text-red-500 mt-1">
              {errors.document.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Endereço"
            {...register("address")}
          />

          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            loading={loading}
          >
            {editingClient
              ? "Atualizar Cliente"
              : "Cadastrar Cliente"}
          </Button>

          {editingClient && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset();
                onCancelEdit();
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}