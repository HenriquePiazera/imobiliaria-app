"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { PropertyForm } from "@/components/properties/PropertyForm";
import { PropertyList } from "@/components/properties/PropertyList";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageTitle } from "@/components/ui/PageTitle";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

import { PropertyRepository } from "@/repositories/properties/property.repository";

import { Property } from "@/types/property";
import { PropertyFormData } from "@/schemas/property.schema";

const repo = new PropertyRepository();

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);

  const [search, setSearch] = useState("");

  const [propertyToDelete, setPropertyToDelete] =
    useState<Property | null>(null);

  async function load() {
    const data = await repo.getProperties();
    setProperties(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(
    data: PropertyFormData
  ) {
    try {
      if (editing) {
        await repo.updateProperty(
          editing.id,
          data
        );

        toast.success(
          "Imóvel atualizado"
        );

        setEditing(null);
      } else {
        await repo.createProperty({
          ...data,
          createdAt:
            new Date().toISOString(),
        } as any);

        toast.success(
          "Imóvel criado"
        );
      }

      await load();
    } catch (error) {
      console.error(error);

      toast.error(
        "Erro ao salvar imóvel"
      );
    }
  }

  async function confirmDelete() {
    if (!propertyToDelete) return;

    try {
      await repo.deleteProperty(
        propertyToDelete.id
      );

      toast.success(
        "Imóvel excluído"
      );

      setPropertyToDelete(null);

      await load();
    } catch (error) {
      console.error(error);

      toast.error(
        "Erro ao excluir imóvel"
      );
    }
  }

  const filteredProperties =
    useMemo(() => {
      return properties.filter(
        (property) => {
          const searchText =
            search.toLowerCase();

          return (
            property.title
              .toLowerCase()
              .includes(searchText) ||
            property.city
              .toLowerCase()
              .includes(searchText) ||
            property.district
              .toLowerCase()
              .includes(searchText)
          );
        }
      );
    }, [properties, search]);

  return (
    <>
      <div className="space-y-6">
        <PageTitle
          title="Imóveis"
          subtitle="Gestão de imóveis"
        />

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              {editing
                ? "Editar imóvel"
                : "Novo imóvel"}
            </h2>

            <PropertyForm
              onSubmit={handleSubmit}
              editingProperty={
                editing
              }
            />

            {editing && (
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={() =>
                    setEditing(
                      null
                    )
                  }
                >
                  Cancelar edição
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <Input
                placeholder="Buscar imóvel..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Imóveis cadastrados
                </h2>

                <span className="text-sm text-zinc-500">
                  {
                    filteredProperties.length
                  }{" "}
                  registros
                </span>
              </div>

              <PropertyList
                properties={
                  filteredProperties
                }
                onEdit={setEditing}
                onDelete={(
                  id
                ) => {
                  const property =
                    properties.find(
                      (p) =>
                        p.id === id
                    );

                  if (
                    property
                  ) {
                    setPropertyToDelete(
                      property
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {propertyToDelete && (
        <ConfirmModal
          open={true}
          title="Confirmar exclusão"
          description={`Deseja realmente excluir o imóvel "${propertyToDelete.title}"?`}
          onConfirm={
            confirmDelete
          }
          onClose={() =>
            setPropertyToDelete(
              null
            )
          }
        />
      )}
    </>
  );
}