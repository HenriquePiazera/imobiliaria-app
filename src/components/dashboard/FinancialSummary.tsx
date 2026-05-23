import { Contract } from "@/types/contract";

interface FinancialSummaryProps {
  contracts: Contract[];
}

export function FinancialSummary({
  contracts,
}: FinancialSummaryProps) {
  const activeContracts =
    contracts.filter(
      (contract) =>
        contract.status ===
        "active"
    );

  const totalRevenue =
    activeContracts.reduce(
      (total, contract) =>
        total + contract.value,
      0
    );

  const averageRevenue =
    activeContracts.length > 0
      ? totalRevenue /
        activeContracts.length
      : 0;

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        shadow-sm
        space-y-6
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Resumo financeiro
        </h2>

        <p
          className="
            text-sm
            text-zinc-500
          "
        >
          Valores dos contratos ativos
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        <div
          className="
            border
            rounded-xl
            p-5
          "
        >
          <p
            className="
              text-sm
              text-zinc-500
              mb-2
            "
          >
            Receita mensal
          </p>

          <h3
            className="
              text-3xl
              font-bold
            "
          >
            R${" "}
            {totalRevenue.toLocaleString(
              "pt-BR"
            )}
          </h3>
        </div>

        <div
          className="
            border
            rounded-xl
            p-5
          "
        >
          <p
            className="
              text-sm
              text-zinc-500
              mb-2
            "
          >
            Média por contrato
          </p>

          <h3
            className="
              text-3xl
              font-bold
            "
          >
            R${" "}
            {averageRevenue.toLocaleString(
              "pt-BR",
              {
                maximumFractionDigits: 0,
              }
            )}
          </h3>
        </div>
      </div>
    </div>
  );
}
