"use client";

import {
  useEffect,
  useMemo,
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

import {
  PropertyCardSkeleton,
} from "@/components/ui/PropertyCardSkeleton";

import {
  DeleteModal,
} from "@/components/ui/DeleteModal";

type PropertyFormSubmitData =
  PropertyFormData & {
    imageUrl?: string;
  };

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

  const [search, setSearch] =
    useState("");

  const [cityFilter, setCityFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  const [sortBy, setSortBy] =
    useState("recent");

  const [
    deleteId,
    setDeleteId,
  ] = useState<string | null>(
    null
  );

  const [
    deleteLoading,
    setDeleteLoading,
  ] = useState(false);

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
    data: PropertyFormSubmitData
  ) {
    try {
      const propertyData = {
        title: data.title,
        price: data.price,
        type: data.type,
        city: data.city,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        status: data.status,

        ...(data.imageUrl
          ? {
              imageUrl:
                data.imageUrl,
            }
          : {}),
      };

      if (editingProperty) {
        await updateProperty(
          editingProperty.id,
          propertyData
        );

        setEditingProperty(null);
      } else {
        await createProperty({
          ...propertyData,
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

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      await deleteProperty(
        deleteId
      );

      setDeleteId(null);
    } catch (error) {
      console.error(
        "Erro ao excluir imóvel:",
        error
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleEdit(
    property: Property
  ) {
    setEditingProperty(property);
  }

  const filteredProperties =
    useMemo(() => {
      const filtered =
        properties.filter(
          (property) => {
            const matchesSearch =
              property.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesCity =
              cityFilter === ""
                ? true
                : property.city ===
                  cityFilter;

            const matchesStatus =
              statusFilter === ""
                ? true
                : property.status ===
                  statusFilter;

            const matchesType =
              typeFilter === ""
                ? true
                : property.type ===
                  typeFilter;

            return (
              matchesSearch &&
              matchesCity &&
              matchesStatus &&
              matchesType
            );
          }
        );

      switch (sortBy) {
        case "lowest-price":
          return filtered.sort(
            (a, b) =>
              a.price - b.price
          );

        case "highest-price":
          return filtered.sort(
            (a, b) =>
              b.price - a.price
          );

        case "name":
          return filtered.sort(
            (a, b) =>
              a.title.localeCompare(
                b.title
              )
          );

        case "recent":
        default:
          return filtered.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          );
      }
    }, [
      properties,
      search,
      cityFilter,
      statusFilter,
      typeFilter,
      sortBy,
    ]);

  const uniqueCities = [
    ...new Set(
      properties.map(
        (property) =>
          property.city
      )
    ),
  ];

  const uniqueTypes = [
    ...new Set(
      properties.map(
        (property) =>
          property.type
      )
    ),
  ];

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

      <div
        className="
          bg-white
          border
          rounded-2xl
          p-5
          grid
          grid-cols-1
          md:grid-cols-5
          gap-4
        "
      >
        <input
          type="text"
          placeholder="Buscar imóvel"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
          "
        />

        <select
          value={cityFilter}
          onChange={(e) =>
            setCityFilter(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
          "
        >
          <option value="">
            Todas cidades
          </option>

          {uniqueCities.map(
            (city) => (
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            )
          )}
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
          "
        >
          <option value="">
            Todos tipos
          </option>

          {uniqueTypes.map(
            (type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            )
          )}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
          "
        >
          <option value="">
            Todos status
          </option>

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

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
          "
        >
          <option value="recent">
            Mais recentes
          </option>

          <option value="lowest-price">
            Menor preço
          </option>

          <option value="highest-price">
            Maior preço
          </option>

          <option value="name">
            Nome A-Z
          </option>
        </select>
      </div>

      {loading ? (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <PropertyCardSkeleton
              key={index}
            />
          ))}
        </div>
      ) : filteredProperties.length ===
        0 ? (
        <EmptyState
          title="Nenhum imóvel encontrado"
          description="Tente alterar os filtros."
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
          {filteredProperties.map(
            (property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={
                  handleEdit
                }
                onDelete={(id) =>
                  setDeleteId(id)
                }
              />
            )
          )}
        </div>
      )}

      <DeleteModal
        open={!!deleteId}
        title="Excluir imóvel"
        description="Essa ação não poderá ser desfeita."
        onConfirm={handleDelete}
        onClose={() =>
          setDeleteId(null)
        }
        loading={deleteLoading}
      />
    </div>
  );
}