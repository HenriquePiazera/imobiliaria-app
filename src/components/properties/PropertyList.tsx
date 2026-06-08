"use client";

import { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

type PropertyListProps = {
  properties: Property[];

  onEdit: (property: Property) => void;

  onDelete: (id: string) => void;
};

export function PropertyList({
  properties,
  onEdit,
  onDelete,
}: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-zinc-300
          bg-white
          p-10
          text-center
        "
      >
        <h3 className="text-lg font-semibold text-zinc-800">
          Nenhum imóvel cadastrado
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Cadastre seu primeiro imóvel para começar.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}