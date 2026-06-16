"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { PageTitle } from "@/components/ui/PageTitle";

import { DeleteModal } from "@/components/ui/DeleteModal";

import { PropertyForm } from "@/components/properties/PropertyForm";

import { PropertyList } from "@/components/properties/PropertyList";

import { Property } from "@/types/property";

import { PropertyFormData } from "@/schemas/property.schema";

import { PropertyRepository } from "@/repositories/properties/property.repository";

const propertyRepository = new PropertyRepository();

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data = await propertyRepository.getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Erro ao carregar imóveis:", error);
    }
  }

  async function handleSubmit(data: PropertyFormData) {
    try {
      if (editingProperty) {
        await propertyRepository.updateProperty(editingProperty.id, data);

        toast.success("Imóvel atualizado");
        setEditingProperty(null);
      } else {
        await propertyRepository.createProperty({
          ...data,
          createdAt: new Date().toISOString(),
        } as Omit<Property, "id">);

        toast.success("Imóvel cadastrado");
      }

      await loadProperties();
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      toast.error("Erro ao salvar imóvel");
    }
  }

  async function confirmDelete() {
    if (!propertyToDelete) return;

    try {
      setDeleteLoading(true);

      await propertyRepository.deleteProperty(propertyToDelete.id);

      setProperties((prev) =>
        prev.filter((property) => property.id !== propertyToDelete.id)
      );

      toast.success("Imóvel excluído");

      setPropertyToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
      toast.error("Erro ao excluir imóvel");
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleEdit(property: Property) {
    setEditingProperty(property);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(property: Property) {
    setPropertyToDelete(property);
  }

  return (
    <>
      <div className="space-y-6">
        <PageTitle
          title="Imóveis"
          subtitle="Gerencie os imóveis cadastrados"
        />

        {/* LAYOUT 2 COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* FORMULÁRIO (ESQUERDA) */}
          <div className="w-full">
            <PropertyForm
              onSubmit={handleSubmit}
              editingProperty={editingProperty}
            />
          </div>

          {/* LISTA (DIREITA) */}
          <div className="w-full">
            <PropertyList
              properties={properties}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* MODAL DE EXCLUSÃO */}
      <DeleteModal
        open={!!propertyToDelete}
        title="Excluir imóvel"
        description={`Tem certeza que deseja excluir o imóvel "${propertyToDelete?.title}"?`}
        onConfirm={confirmDelete}
        onClose={() => setPropertyToDelete(null)}
        loading={deleteLoading}
      />
    </>
  );
}