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
} from "@/repositories/property.repository";

import { Property } from "@/types/property";

import {
  PropertyFormData,
} from "@/schemas/property.schema";

import {
  PropertyForm,
} from "@/components/properties/PropertyForm";

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
  }

  async function handleDelete(
    id: string
  ) {
    await deleteProperty(id);
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
              <div
                key={property.id}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                  shadow-sm
                  space-y-4
                "
              >
                <div>
                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    {
                      property.title
                    }
                  </h2>

                  <p
                    className="
                      text-zinc-500
                    "
                  >
                    {property.city}
                  </p>
                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    text-sm
                  "
                >
                  <div>
                    <strong>
                      Tipo:
                    </strong>{" "}
                    {
                      property.type
                    }
                  </div>

                  <div>
                    <strong>
                      Área:
                    </strong>{" "}
                    {
                      property.area
                    }
                    m²
                  </div>

                  <div>
                    <strong>
                      Quartos:
                    </strong>{" "}
                    {
                      property.bedrooms
                    }
                  </div>

                  <div>
                    <strong>
                      Banheiros:
                    </strong>{" "}
                    {
                      property.bathrooms
                    }
                  </div>
                </div>

                <div>
                  <p
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    R${" "}
                    {property.price.toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                </div>

                <div
                  className="
                    flex
                    gap-3
                  "
                >
                  <button
                    onClick={() =>
                      handleEdit(
                        property
                      )
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        property.id
                      )
                    }
                    className="
                      bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}