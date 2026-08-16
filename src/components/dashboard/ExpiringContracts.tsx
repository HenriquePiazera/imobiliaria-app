import Link from "next/link";

import { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/formatCurrency";
import { getDaysUntil } from "@/utils/contract-dates";

type ExpiringContractsProps = {
  contracts: Contract[];
};

export function ExpiringContracts({ contracts }: ExpiringContractsProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">
            Contratos a vencer em 30 dias
          </h2>
          <p className="text-sm text-zinc-600">
            Aluguéis ativos com vencimento próximo
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
          {contracts.length} contrato(s)
        </span>
      </div>

      {contracts.length === 0 ? (
        <p className="theme-card rounded-xl border border-dashed border-amber-200 p-6 text-center text-sm text-zinc-500">
          Nenhum contrato de aluguel vence nos próximos 30 dias.
        </p>
      ) : (
        <div className="space-y-3">
          {contracts.map((contract) => {
            const daysLeft = getDaysUntil(contract.endDate!);

            return (
              <div
                key={contract.id}
                className="theme-card flex flex-col gap-3 rounded-xl border border-amber-100 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-zinc-900">
                    {contract.propertyTitle}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Cliente: {contract.clientName}
                  </p>
                  <p className="text-sm text-zinc-500">
                    Vencimento:{" "}
                    {new Date(contract.endDate!).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-1 md:items-end">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                    {daysLeft === 0
                      ? "Vence hoje"
                      : daysLeft === 1
                        ? "Vence amanhã"
                        : `${daysLeft} dias restantes`}
                  </span>
                  <p className="text-lg font-bold text-zinc-900">
                    {formatCurrency(contract.value)}/mês
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4">
        <Link
          href="/dashboard/contracts"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Ver todos os contratos →
        </Link>
      </div>
    </div>
  );
}
