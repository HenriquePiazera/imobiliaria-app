"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/lib/firebase";

import {
  propertySchema,
} from "@/schemas/property.schema";

import { Property } from "@/types/property";

type PropertyFormData = z.infer<
  typeof propertySchema
>;

type PropertyFormInput = z.input<
  typeof propertySchema
>;

type PropertyFormProps = {
  onSubmit: (
    data: PropertyFormData & {
      imageUrl?: string;
    }
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

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<
    PropertyFormInput,
    unknown,
    PropertyFormData
  >({
    resolver:
      zodResolver(propertySchema),

    defaultValues: {
      title: "",
      type: "",
      city: "",
      price: 0,
      area: 0,
      bedrooms: 0,
      bathrooms: 0,
      status: "available",
    },
  });

  useEffect(() => {
    if (editingProperty) {
      reset({
        title:
          editingProperty.title,

        type:
          editingProperty.type,

        city:
          editingProperty.city,

        price:
          editingProperty.price,

        area:
          editingProperty.area,

        bedrooms:
          editingProperty.bedrooms,

        bathrooms:
          editingProperty.bathrooms,

        status:
          editingProperty.status,
      });
    }
  }, [
    editingProperty,
    reset,
  ]);

  async function uploadImage() {
    if (!imageFile) return null;

    const imageRef = ref(
      storage,
      `properties/${Date.now()}-${
        imageFile.name
      }`
    );

    await uploadBytes(
      imageRef,
      imageFile
    );

    return await getDownloadURL(
      imageRef
    );
  }

  async function handleFormSubmit(
    data: PropertyFormData
  ) {
    try {
      setLoading(true);

      const uploadedImage =
        await uploadImage();

      await onSubmit({
        ...data,

        ...(uploadedImage
          ? {
              imageUrl:
                uploadedImage,
            }
          : {}),
      });

      toast.success(
        editingProperty
          ? "Imóvel atualizado"
          : "Imóvel cadastrado"
      );

      reset();

      setImageFile(null);
    } catch (error) {
      console.error(error);

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
        bg-white
        border
        rounded-2xl
        p-6
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Título
        </label>

        <input
          placeholder="Casa alto padrão"
          {...register("title")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Tipo
        </label>

        <input
          placeholder="Casa"
          {...register("type")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Cidade
        </label>

        <input
          placeholder="São Paulo"
          {...register("city")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Preço
        </label>

        <input
          type="number"
          placeholder="950000"
          {...register("price")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Área
        </label>

        <input
          type="number"
          placeholder="320"
          {...register("area")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Quartos
        </label>

        <input
          type="number"
          placeholder="4"
          {...register(
            "bedrooms"
          )}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Banheiros
        </label>

        <input
          type="number"
          placeholder="3"
          {...register(
            "bathrooms"
          )}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Status
        </label>

        <select
          {...register("status")}
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        >
          <option value="available">
            Disponível
          </option>

          <option value="rented">
            Alugado
          </option>

          <option value="reserved">
            Reservado
          </option>

          <option value="inactive">
            Inativo
          </option>
        </select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">
          Foto do imóvel
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files?.[0] ||
                null
            )
          }
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          bg-zinc-900
          text-white
          rounded-xl
          p-3
          md:col-span-2
        "
      >
        {loading
          ? "Salvando..."
          : editingProperty
          ? "Atualizar imóvel"
          : "Cadastrar imóvel"}
      </button>
    </form>
  );
}