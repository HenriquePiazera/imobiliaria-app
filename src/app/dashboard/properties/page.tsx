"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PropertyForm } from "@/components/properties/PropertyForm";
import { PropertyList } from "@/components/properties/PropertyList";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { PageTitle } from "@/components/ui/PageTitle";
import { Pagination } from "@/components/ui/Pagination";

import {
  useCreateProperty,
  useDeleteProperty,
  useProperties,
  useUpdateProperty,
} from "@/hooks/useProperties";

import { PropertyFormData } from "@/schemas/property.schema";
import { Property } from "@/types/property";
import { exportToCsv } from "@/utils/exportCsv";
import { getTotalPages, paginate } from "@/utils/paginate";

const PAGE_SIZE = 6;

export default function PropertiesPage() {
  const { data: properties = [], isLoading } = useProperties();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();

  const [editing, setEditing] = useState<Property | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [propertyToDelete, setPropertyToDelete] =
    useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    const searchText = search.toLowerCase();

    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchText) ||
        property.city.toLowerCase().includes(searchText) ||
        property.district.toLowerCase().includes(searchText)
    );
  }, [properties, search]);

  const totalPages = getTotalPages(filteredProperties.length, PAGE_SIZE);
  const paginatedProperties = paginate(filteredProperties, page, PAGE_SIZE);

  async function handleSubmit(data: PropertyFormData) {
    try {
      if (editing) {
        await updateProperty.mutateAsync({ id: editing.id, data });
        toast.success("Imóvel atualizado");
        setEditing(null);
      } else {
        await createProperty.mutateAsync(data);
        toast.success("Imóvel criado");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar imóvel");
    }
  }

  async function confirmDelete() {
    if (!propertyToDelete) return;

    try {
      await deleteProperty.mutateAsync(propertyToDelete.id);
      toast.success("Imóvel excluído");
      setPropertyToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir imóvel");
    }
  }

  function handleExport() {
    exportToCsv("imoveis.csv", filteredProperties, [
      { key: "title", label: "Título" },
      { key: "type", label: "Tipo" },
      { key: "purpose", label: "Finalidade" },
      { key: "price", label: "Preço" },
      { key: "status", label: "Status" },
      { key: "city", label: "Cidade" },
    ]);
    toast.success("Exportação iniciada");
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle title="Imóveis" subtitle="Gestão de imóveis" />
          <Button type="button" onClick={handleExport}>
            Exportar CSV
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              {editing ? "Editar imóvel" : "Novo imóvel"}
            </h2>

            <PropertyForm
              key={editing?.id ?? "new-property-form"}
              onSubmit={handleSubmit}
              editingProperty={editing}
            />

            {editing && (
              <div className="mt-4">
                <Button type="button" onClick={() => setEditing(null)}>
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Imóveis cadastrados</h2>
                <span className="text-sm text-zinc-500">
                  {filteredProperties.length} registros
                </span>
              </div>

              {isLoading ? (
                <p className="text-sm text-zinc-500">Carregando imóveis...</p>
              ) : paginatedProperties.length === 0 ? (
                <EmptyState message="Nenhum imóvel encontrado. Cadastre o primeiro ou use os dados demo no dashboard." />
              ) : (
                <>
                  <PropertyList
                    properties={paginatedProperties}
                    onEdit={setEditing}
                    onDelete={(id) => {
                      const property = properties.find((p) => p.id === id);
                      if (property) setPropertyToDelete(property);
                    }}
                  />

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {propertyToDelete && (
        <ConfirmModal
          open={true}
          title="Confirmar exclusão"
          description={`Deseja realmente excluir o imóvel "${propertyToDelete.title}"?`}
          onConfirm={confirmDelete}
          onClose={() => setPropertyToDelete(null)}
        />
      )}
    </>
  );
}
