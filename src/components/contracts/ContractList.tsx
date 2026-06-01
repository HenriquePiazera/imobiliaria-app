import { Contract } from "@/types/contract";

import { ContractCard } from "./ContractCard";

import { EmptyState } from "@/components/ui/EmptyState";

type ContractListProps = {
  contracts: Contract[];

  onEdit: (
    contract: Contract
  ) => void;

  onDelete: (
    contract: Contract
  ) => void;
};

export function ContractList({
  contracts,
  onEdit,
  onDelete,
}: ContractListProps) {
  if (!contracts.length) {
    return (
      <EmptyState
        message="Nenhum contrato encontrado."
      />
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >
      {contracts.map(
        (contract) => (
          <ContractCard
            key={contract.id}
            contract={contract}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}