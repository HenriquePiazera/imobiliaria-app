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

import { uploadPropertyImage } from "@/lib/storage/uploadPropertyImage";

type PropertyFormProps = {
  onSubmit: (
    data: PropertyFormData & { imageUrl?: string }
  ) => Promise<void>;

  editingProperty?: Property | null;
};

export function PropertyForm({
  onSubmit,
  editingProperty = null,
}: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as any,
  });

  useEffect(() => {
    if (editingProperty) {
      reset({
        title: editingProperty.title,
        type: editingProperty.type,
        purpose: editingProperty.purpose,
        price: editingProperty.price,
        city: editingProperty.city,
        district: editingProperty.district,
        status: editingProperty.status,
        description: editingProperty.description,
      });

      setPreview(editingProperty.imageUrl ?? null);
    }
  }, [editingProperty, reset]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    // 🔒 validação de tipo
    if (!file.type.startsWith("image/")) {
      toast.error("Envie apenas imagens");
      return;
    }

    // 🔒 validação de tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 5MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleFormSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      setLoading(true);

      let imageUrl: string | undefined;

      if (imageFile) {
        imageUrl = await uploadPropertyImage(imageFile);
      }

      await onSubmit({
        ...data,
        imageUrl,
      });

      toast.success(
        editingProperty ? "Imóvel atualizado" : "Imóvel cadastrado"
      );

      reset();
      setImageFile(null);
      setPreview(null);
    } catch {
      toast.error("Erro ao salvar imóvel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

        {/* preview */}
        {preview && (
          <img
            src={preview}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <Input placeholder="Título" {...register("title")} />

        <Input placeholder="Tipo" {...register("type")} />

        <select {...register("purpose")} className="w-full border rounded px-3 py-2">
          <option value="Venda">Venda</option>
          <option value="Aluguel">Aluguel</option>
        </select>

        <Input
          type="number"
          placeholder="Preço"
          {...register("price", { valueAsNumber: true })}
        />

        <Input placeholder="Cidade" {...register("city")} />

        <Input placeholder="Bairro" {...register("district")} />

        <select {...register("status")} className="w-full border rounded px-3 py-2">
          <option value="Disponível">Disponível</option>
          <option value="Vendido">Vendido</option>
          <option value="Alugado">Alugado</option>
        </select>

        <Input placeholder="Descrição" {...register("description")} />

        <Button type="submit" loading={loading} disabled={loading}>
          {loading
            ? "Salvando..."
            : editingProperty
            ? "Atualizar"
            : "Cadastrar"}
        </Button>
      </form>
    </Card>
  );
}