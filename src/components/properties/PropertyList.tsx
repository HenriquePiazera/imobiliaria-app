"use client";

import { Property } from "@/types/property";
import { Button } from "@/components/ui/Button";

type PropertyListProps = {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
};

export function PropertyList({
  properties,
  onEdit,
  onDelete,
}: PropertyListProps) {
  return (
    <div className="flex flex-col gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm"
        >
          <div className="w-full h-48 bg-zinc-100 flex items-center justify-center">
            <span className="text-sm text-zinc-400">
              Sem imagem cadastrada
            </span>
          </div>

          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">
                {property.title}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  property.status === "Disponível"
                    ? "bg-green-100 text-green-700"
                    : property.status === "Alugado"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {property.status}
              </span>
            </div>

            <div className="text-sm text-zinc-600 space-y-1">
              <p><strong>Cidade:</strong> {property.city}</p>
              <p><strong>Bairro:</strong> {property.district}</p>
              <p><strong>Tipo:</strong> {property.type}</p>
              <p><strong>Preço:</strong> R$ {property.price}</p>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button onClick={() => onEdit(property)}>
                Editar
              </Button>

              <button
                onClick={() => onDelete(property)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}