"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  clientSchema,
  ClientFormData,
} from "@/schemas/client.schema";

import { Client } from "@/types/client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ClientFormProps {
  initialData?: Client | null;

  onSubmit: (
    data: ClientFormData
  ) => Promise<void>;

  onCancelEdit?: () => void;

  loading?: boolean;
}

const defaultValues: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  document: "",
  city: "",
  state: "",
  address: "",
  status: "lead",
  notes: "",
};

export function ClientForm({
  initialData,
  onSubmit,
  onCancelEdit,
  loading = false,
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        document: initialData.document,
        city: initialData.city,
        state: initialData.state,
        address: initialData.address,
        status: initialData.status,
        notes: initialData.notes || "",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  async function handleFormSubmit(
    data: ClientFormData
  ) {
    await onSubmit(data);

    // limpa formulário após salvar
    reset(defaultValues);

    // sai do modo edição
    onCancelEdit?.();
  }

  return (
    <form
      onSubmit={handleSubmit(
        handleFormSubmit
      )}
      className="space-y-4"
    >
      <div>
        <Input
          placeholder="Nome"
          {...register("name")}
          disabled={loading}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          disabled={loading}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Telefone"
          {...register("phone")}
          disabled={loading}
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="CPF/CNPJ"
          {...register("document")}
          disabled={loading}
        />

        {errors.document && (
          <p className="mt-1 text-sm text-red-500">
            {errors.document.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Input
            placeholder="Cidade"
            {...register("city")}
            disabled={loading}
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Estado"
            {...register("state")}
            disabled={loading}
          />

          {errors.state && (
            <p className="mt-1 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Input
          placeholder="Endereço"
          {...register("address")}
          disabled={loading}
        />

        {errors.address && (
          <p className="mt-1 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div>
        <select
          {...register("status")}
          disabled={loading}
          className="
            w-full rounded-xl
            border border-zinc-300
            bg-white px-4 py-3
            text-sm outline-none
            transition
            focus:border-zinc-500
          "
        >
          <option value="lead">
            Lead
          </option>

          <option value="client">
            Cliente
          </option>

          <option value="inactive">
            Inativo
          </option>
        </select>

        {errors.status && (
          <p className="mt-1 text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Observações"
          {...register("notes")}
          disabled={loading}
          className="
            min-h-[120px]
            w-full rounded-xl
            border border-zinc-300
            bg-white px-4 py-3
            text-sm outline-none
            transition
            focus:border-zinc-500
          "
        />

        {errors.notes && (
          <p className="mt-1 text-sm text-red-500">
            {errors.notes.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Salvando..."
            : initialData
            ? "Atualizar cliente"
            : "Salvar cliente"}
        </Button>

        {initialData && (
          <button
            type="button"
            onClick={() => {
              reset(defaultValues);
              onCancelEdit?.();
            }}
            className="
              rounded-xl
              border border-zinc-300
              px-4 py-2
              text-sm font-medium
              transition
              hover:bg-zinc-100
            "
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}