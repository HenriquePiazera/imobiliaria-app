"use client";

import { Contract } from "@/types/contract";

import { Button } from "@/components/ui/Button";

type ContractListProps = {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onDelete: (contract: Contract) => void;
};

export function ContractList({
  contracts,
  onEdit,
  onDelete,
}: ContractListProps) {
  return (
    <div className="flex flex-col gap-4">
      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="
            w-full
            rounded-2xl
            border
            border-zinc-200
            bg-white
            shadow-sm
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div className="p-5 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                {contract.clientName || "Cliente não informado"}
              </h3>

              <p className="text-sm text-zinc-500">
                {contract.propertyTitle || "Imóvel não informado"}
              </p>
            </div>

            <span
              className={`
                text-xs px-2 py-1 rounded-full
                ${
                  contract.status === "active"
                    ? "bg-green-100 text-green-700"
                    : contract.status === "finished"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {contract.status}
            </span>
          </div>

          {/* INFO */}
          <div className="px-5 pb-5 text-sm text-zinc-600 space-y-1">
            <p>
              <strong>Valor:</strong> R$ {contract.value}
            </p>

            <p>
              <strong>Início:</strong> {contract.startDate}
            </p>

            {contract.endDate && (
              <p>
                <strong>Fim:</strong> {contract.endDate}
              </p>
            )}

            <p>
              <strong>Criado em:</strong> {contract.createdAt}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="px-5 pb-5 flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => onEdit(contract)}
            >
              Editar
            </Button>

            <button
              type="button"
              onClick={() => onDelete(contract)}
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
      ))}
    </div>
  );
}