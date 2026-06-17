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

import { UploadImageService } from "@/services/upload/upload-image.service";

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

const selectClassName = `
  w-full
  rounded-xl
  border
  border-zinc-300
  bg-white
  px-4
  py-3
  text-sm
  outline-none
  transition
  focus:border-zinc-500
`;

export function PropertyForm({
  onSubmit,
  onFinish,
  editingProperty,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  useEffect(() => {
    if (!editingProperty) {
      reset(defaultValues);
      setImageUrl("");
      setSelectedFile(null);
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
    setSelectedFile(null);
  }, [editingProperty, reset]);

  async function handleForm(
    data: PropertyFormData
  ) {
    try {
      setLoading(true);

      let uploadedImageUrl = imageUrl;

      if (selectedFile) {
        const uploadService =
          new UploadImageService();

        uploadedImageUrl =
          await uploadService.upload(
            selectedFile
          );
      }

      await onSubmit({
        ...data,
        imageUrl: uploadedImageUrl,
      });

      toast.success(
        editingProperty
          ? "Imóvel atualizado com sucesso"
          : "Imóvel cadastrado com sucesso"
      );

      reset(defaultValues);
      setImageUrl("");
      setSelectedFile(null);

      onFinish?.();
    } catch (error) {
      console.error(error);

      toast.error(
        "Erro ao enviar imagem ou salvar imóvel"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form
        onSubmit={handleSubmit(handleForm)}
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
          className={selectClassName}
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
          className={selectClassName}
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

        <ImageUpload
          onFileSelect={setSelectedFile}
        />

        <Button
          type="submit"
          loading={loading}
        >
          {editingProperty
            ? "Atualizar imóvel"
            : "Cadastrar imóvel"}
        </Button>
      </form>
    </Card>
  );
}