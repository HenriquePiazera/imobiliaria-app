"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { ImageUpload } from "./ImageUpload";

type Props = {
  onSubmit: (data: PropertyFormData) => Promise<void>;
  onFinish?: () => void;
  editingProperty?: Property | null;
};

const defaultValues: PropertyFormData = {
  title: "",
  type: "",
  purpose: "Venda",
  price: 0,
  city: "",
  district: "",
  status: "Disponível",
  description: "",
  imageUrl: "",
};

export function PropertyForm({
  onSubmit,
  onFinish,
  editingProperty,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { register, handleSubmit, reset } =
    useForm<PropertyFormData>({
      resolver: zodResolver(propertySchema),
      defaultValues,
    });

  useEffect(() => {
    if (!editingProperty) {
      reset(defaultValues);
      setImageUrl("");
      return;
    }

    reset({
      title: editingProperty.title,
      type: editingProperty.type,
      purpose: editingProperty.purpose,
      price: editingProperty.price,
      city: editingProperty.city,
      district: editingProperty.district,
      status: editingProperty.status,
      description: editingProperty.description,
      imageUrl: editingProperty.imageUrl ?? "",
    });

    setImageUrl(editingProperty.imageUrl ?? "");
  }, [editingProperty, reset]);

  async function handleForm(data: PropertyFormData) {
    try {
      setLoading(true);

      await onSubmit({
        ...data,
        imageUrl,
      });

      toast.success(editingProperty ? "Atualizado" : "Criado");

      reset(defaultValues);
      setImageUrl("");

      onFinish?.();
    } catch {
      toast.error("Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
        <Input placeholder="Título" {...register("title")} />
        <Input placeholder="Tipo" {...register("type")} />

        <select {...register("purpose")} className="input">
          <option value="Venda">Venda</option>
          <option value="Aluguel">Aluguel</option>
        </select>

        <Input type="number" {...register("price", { valueAsNumber: true })} />
        <Input placeholder="Cidade" {...register("city")} />
        <Input placeholder="Bairro" {...register("district")} />

        <select {...register("status")} className="input">
          <option value="Disponível">Disponível</option>
          <option value="Vendido">Vendido</option>
          <option value="Alugado">Alugado</option>
        </select>

        <Input placeholder="Descrição" {...register("description")} />

        <ImageUpload onUpload={setImageUrl} />

        <Button type="submit" loading={loading}>
          {editingProperty ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Card>
  );
}