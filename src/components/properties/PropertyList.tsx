"use client";

 stabilization-phase-2
import { Property } from "@/types/property";
import { Button } from "@/components/ui/Button";

import { Property }
from "@/types/property";
 master

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
          className="
            w-full
            rounded-2xl
            border
            border-zinc-200
            bg-white
            overflow-hidden
            shadow-sm
          "
        >
          {/* IMAGEM (SAFE - SEM TYPE BREAK) */}
          <div className="w-full h-48 bg-zinc-100 flex items-center justify-center">
            <span className="text-sm text-zinc-400">
              Sem imagem cadastrada
            </span>
          </div>

          {/* CONTEÚDO */}
          <div className="p-5 flex flex-col gap-3">
            {/* HEADER */}
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-900">
                {property.title}
              </h3>

              <span
                className={`
                  text-xs px-2 py-1 rounded-full
                  ${
                    property.status === "Disponível"
                      ? "bg-green-100 text-green-700"
                      : property.status === "Alugado"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {property.status}
              </span>
            </div>

            {/* INFO */}
            <div className="text-sm text-zinc-600 space-y-1">
              <p>
                <strong>Cidade:</strong> {property.city}
              </p>

              <p>
                <strong>Bairro:</strong> {property.district}
              </p>

              <p>
                <strong>Tipo:</strong> {property.type}
              </p>

              <p>
                <strong>Preço:</strong> R$ {property.price}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                onClick={() => onEdit(property)}
              >
                Editar
              </Button>

              <button
                type="button"
                onClick={() => onDelete(property)}
                className="
                  px-4 py-2 rounded-lg
                  bg-red-600 text-white
                  hover:bg-red-700
                  transition-colors
                "
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