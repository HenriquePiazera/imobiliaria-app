import { Contract } from "@/types/contract";

import { Card } from "@/components/ui/Card";

type ContractCardProps = {
  contract: Contract;

  onEdit: (
    contract: Contract
  ) => void;

  onDelete: (
    contract: Contract
  ) => void;
};

export function ContractCard({
  contract,
  onEdit,
  onDelete,
}: ContractCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            Contrato
          </h2>

          <p className="text-sm text-zinc-500">
            ID: {contract.id}
          </p>
        </div>

        <div className="space-y-1 text-sm">
          <p>
            <strong>
              Cliente:
            </strong>{" "}
            {contract.clientId}
          </p>

          <p>
            <strong>
              Imóvel:
            </strong>{" "}
            {contract.propertyId}
          </p>

          <p>
            <strong>
              Valor:
            </strong>{" "}
            R${" "}
            {contract.value?.toLocaleString(
              "pt-BR"
            )}
          </p>

          <p>
            <strong>
              Início:
            </strong>{" "}
            {contract.startDate}
          </p>

          <p>
            <strong>
              Fim:
            </strong>{" "}
            {contract.endDate}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() =>
              onEdit(contract)
            }
            className="
              rounded-lg
              bg-zinc-900
              px-4
              py-2
              text-sm
              text-white
            "
          >
            Editar
          </button>

          <button
            onClick={() =>
              onDelete(contract)
            }
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-sm
              text-white
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </Card>
  );
}