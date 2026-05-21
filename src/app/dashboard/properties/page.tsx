"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createProperty,
  deleteProperty,
  subscribeToProperties,
  updateProperty,
} from "@/repositories/properties/property.repository";

import { Property } from "@/types/property";

import {
  PropertyFormData,
} from "@/schemas/property.schema";

import {
  PropertyForm,
} from "@/components/properties/PropertyForm";

import {
  PropertyCard,
} from "@/components/properties/PropertyCard";

import {
  EmptyState,
} from "@/components/ui/EmptyState";

export default function PropertiesPage() {
  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    editingProperty,
    setEditingProperty,
  ] = useState<Property | null>(
    null
  );

  useEffect(() => {
    const unsubscribe =
      subscribeToProperties(
        (properties) => {
          setProperties(
            properties
          );

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  async function handleSubmit(
    data: PropertyFormData
  ) {
    try {
      if (editingProperty) {
        await updateProperty(
          editingProperty.id,
          data
        );

        setEditingProperty(null);
      } else {
        await createProperty({
          ...data,
          createdAt:
            new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(
        "Erro ao salvar imóvel:",
        error
      );
    }
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Deseja excluir este imóvel?"
      );

    if (!confirmed) return;

    try {
      await deleteProperty(id);
    } catch (error) {
      console.error(
        "Erro ao excluir imóvel:",
        error
      );
    }
  }

  function handleEdit(
    property: Property
  ) {
    setEditingProperty(property);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Imóveis
        </h1>

        <p className="text-zinc-500">
          Gerencie os imóveis
        </p>
      </div>

      <PropertyForm
        onSubmit={handleSubmit}
        editingProperty={
          editingProperty
        }
      />

      {loading ? (
        <p>Carregando...</p>
      ) : properties.length ===
        0 ? (
        <EmptyState
          title="Nenhum imóvel cadastrado"
          description="Cadastre o primeiro imóvel para começar."
        />
      ) : (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {properties.map(
            (property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={
                  handleEdit
                }
                onDelete={
                  handleDelete
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}