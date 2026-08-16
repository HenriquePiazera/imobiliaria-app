import { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/formatCurrency";

interface FinancialSummaryProps {
  contracts: Contract[];
}

export function FinancialSummary({ contracts }: FinancialSummaryProps) {
  const activeContracts = contracts.filter(
    (contract) => contract.status === "active"
  );

  const rentRevenue = activeContracts
    .filter((contract) => contract.type === "rent")
    .reduce((total, contract) => total + contract.value, 0);

  const saleRevenue = activeContracts
    .filter((contract) => contract.type === "sale")
    .reduce((total, contract) => total + contract.value, 0);

  const totalRevenue = rentRevenue + saleRevenue;

  return (
    <div className="theme-card space-y-6 rounded-2xl border border-zinc-200 p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Resumo financeiro</h2>
        <p className="text-sm text-zinc-500">
          Valores dos contratos ativos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 p-5">
          <p className="mb-2 text-sm text-zinc-500">Receita de aluguéis</p>
          <h3 className="text-2xl font-bold">
            {formatCurrency(rentRevenue)}
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-200 p-5">
          <p className="mb-2 text-sm text-zinc-500">Receita de vendas</p>
          <h3 className="text-2xl font-bold">
            {formatCurrency(saleRevenue)}
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-200 p-5">
          <p className="mb-2 text-sm text-zinc-500">Receita total</p>
          <h3 className="text-2xl font-bold">
            {formatCurrency(totalRevenue)}
          </h3>
        </div>
      </div>
    </div>
  );
}
