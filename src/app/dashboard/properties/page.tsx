"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PropertyForm } from "@/components/properties/PropertyForm";
import { PropertyList } from "@/components/properties/PropertyList";
import { PageTitle } from "@/components/ui/PageTitle";

import { PropertyRepository } from "@/repositories/properties/property.repository";
import { Property } from "@/types/property";
import { PropertyFormData } from "@/schemas/property.schema";

const repo = new PropertyRepository();

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);

  async function load() {
    const data = await repo.getProperties();
    setProperties(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(data: PropertyFormData) {
    try {
      if (editing) {
        await repo.updateProperty(editing.id, data);
        toast.success("Atualizado");
        setEditing(null);
      } else {
        await repo.createProperty({
          ...data,
          createdAt: new Date().toISOString(),
        } as any);

        toast.success("Criado");
      }

      await load();
    } catch (e) {
      console.error(e);
      toast.error("Erro");
    }
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Imóveis" subtitle="Gestão de imóveis" />

      <PropertyForm
        onSubmit={handleSubmit}
        editingProperty={editing}
      />

      <PropertyList
        properties={properties}
        onEdit={setEditing}
        onDelete={() => {}}
      />
    </div>
  );
}