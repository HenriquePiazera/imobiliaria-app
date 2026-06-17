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
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
        Nenhum imóvel cadastrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
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