"use client";

import { useEffect, useState } from "react";

import {
  useForm,
  SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  propertySchema,
  PropertyFormData,
} from "@/schemas/property.schema";

import { Property } from "@/types/property";

import { Input } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

type PropertyFormProps = {
  onSubmit: (
    data: PropertyFormData
  ) => Promise<void>;

  editingProperty?: Property | null;
};

export function PropertyForm({
  onSubmit,
  editingProperty = null,
}: PropertyFormProps) {
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(
      propertySchema
    ) as any,
  });

  useEffect(() => {
    if (editingProperty) {
      reset({
        title:
          editingProperty.title,

        type:
          editingProperty.type,

        purpose:
          editingProperty.purpose,

        price:
          editingProperty.price,

        city:
          editingProperty.city,

        district:
          editingProperty.district,

        status:
          editingProperty.status,

        description:
          editingProperty.description,
      });
    }
  }, [editingProperty, reset]);

  const handleFormSubmit: SubmitHandler<
    PropertyFormData
  > = async (data) => {
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
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit(
          handleFormSubmit
        )}
        className="space-y-4"
      >
        <Input
          placeholder="Título"
          {...register("title")}
        />

        <Input
          placeholder="Tipo"
          {...register("type")}
        />

        <select
          {...register("purpose")}
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            px-3
            py-2
            text-sm
          "
        >
          <option value="Venda">
            Venda
          </option>

          <option value="Aluguel">
            Aluguel
          </option>
        </select>

        <Input
          type="number"
          placeholder="Preço"
          {...register("price", {
            valueAsNumber: true,
          })}
        />

        <Input
          placeholder="Cidade"
          {...register("city")}
        />

        <Input
          placeholder="Bairro"
          {...register("district")}
        />

        <select
          {...register("status")}
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            px-3
            py-2
            text-sm
          "
        >
          <option value="Disponível">
            Disponível
          </option>

          <option value="Vendido">
            Vendido
          </option>

          <option value="Alugado">
            Alugado
          </option>
        </select>

        <Input
          placeholder="Descrição"
          {...register("description")}
        />

        <Button
          type="submit"
          loading={loading}
        >
          {editingProperty
            ? "Atualizar Imóvel"
            : "Cadastrar Imóvel"}
        </Button>
      </form>
    </Card>
  );
}