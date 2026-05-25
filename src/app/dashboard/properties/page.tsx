"use client";

import {
  useEffect,
  useState,
} from "react";

import { PageTitle } from "@/components/ui/PageTitle";

import { PropertyForm } from "@/components/properties/PropertyForm";

import { PropertyList } from "@/components/properties/PropertyList";

import { Property } from "@/types/property";

import { PropertyFormData } from "@/schemas/property.schema";

import { PropertyRepository } from "@/repositories/properties/property.repository";

const propertyRepository =
  new PropertyRepository();

export default function PropertiesPage() {
  const [properties, setProperties] =
    useState<Property[]>([]);

  const [editingProperty, setEditingProperty] =
    useState<Property | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data =
        await propertyRepository.getProperties();

      setProperties(data);

    } catch (error) {
      console.error(
        "Erro ao carregar imóveis:",
        error
      );
    }
  }

  async function handleSubmit(
    data: PropertyFormData
  ) {
    try {
      if (editingProperty) {
        await propertyRepository.updateProperty(
          editingProperty.id,
          data
        );

        setEditingProperty(null);

      } else {
        await propertyRepository.createProperty(
          {
            ...data,
            createdAt:
              new Date().toISOString(),
          } as Omit<
            Property,
            "id"
          >
        );
      }

      await loadProperties();

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
    try {
      await propertyRepository.deleteProperty(
        id
      );

      setProperties((prev) =>
        prev.filter(
          (property) =>
            property.id !== id
        )
      );

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
      <PageTitle
        title="Imóveis"
        subtitle="Gerencie os imóveis cadastrados"
      />

      <PropertyForm
        onSubmit={handleSubmit}
        editingProperty={
          editingProperty
        }
      />

      <PropertyList
        properties={properties}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}