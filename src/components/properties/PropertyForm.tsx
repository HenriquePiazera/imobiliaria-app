"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  propertySchema,
  PropertyFormData,
} from "@/schemas/property.schema";

import { Property } from "@/types/property";

type PropertyFormProps = {
  onSubmit: (
    data: PropertyFormData
  ) => Promise<void>;

  editingProperty:
    | Property
    | null;
};

export function PropertyForm({
  onSubmit,
  editingProperty,
}: PropertyFormProps) {
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PropertyFormData>({
    resolver:
      zodResolver(
        propertySchema
      ),
  });

  useEffect(() => {
    if (editingProperty) {
      reset(editingProperty);
    }
  }, [
    editingProperty,
    reset,
  ]);

  async function handleFormSubmit(
    data: PropertyFormData
  ) {
    try {
      setLoading(true);

      await onSubmit(data);

      toast.success(
        editingProperty
          ? "Imóvel atualizado"
          : "Imóvel cadastrado"
      );

      reset();
    } catch {
      toast.error(
        "Erro ao salvar imóvel"
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
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >
      <input
        placeholder="Título"
        {...register("title")}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        type="number"
        placeholder="Preço"
        {...register("price")}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        placeholder="Tipo"
        {...register("type")}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        placeholder="Cidade"
        {...register("city")}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        type="number"
        placeholder="Quartos"
        {...register(
          "bedrooms"
        )}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        type="number"
        placeholder="Banheiros"
        {...register(
          "bathrooms"
        )}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <input
        type="number"
        placeholder="Área"
        {...register("area")}
        className="
          border
          p-3
          rounded-xl
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-zinc-900
          text-white
          rounded-xl
          p-3
        "
      >
        {loading
          ? "Salvando..."
          : editingProperty
          ? "Atualizar"
          : "Cadastrar"}
      </button>
    </form>
  );
}