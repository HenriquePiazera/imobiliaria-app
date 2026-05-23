"use client";

import { Contract } from "@/types/contract";
import { Client } from "@/types/client";
import { Property } from "@/types/property";

interface RecentContractsProps {
  contracts: Contract[];
  clients: Client[];
  properties: Property[];
}

export function RecentContracts({
  contracts,
  clients,
  properties,
}: RecentContractsProps) {
  function getClientName(
    clientId: string
  ) {
    return (
      clients.find(
        (client) =>
          client.id === clientId
      )?.name || "Cliente"
    );
  }

  function getPropertyTitle(
    propertyId: string
  ) {
    return (
      properties.find(
        (property) =>
          property.id === propertyId
      )?.title || "Imóvel"
    );
  }

  function getStatusLabel(
    status: Contract["status"]
  ) {
    switch (status) {
      case "active":
        return "Ativo";

      case "finished":
        return "Finalizado";

      case "canceled":
        return "Cancelado";

      default:
        return status;
    }
  }

  function getStatusStyles(
    status: Contract["status"]
  ) {
    switch (status) {
      case "active":
        return `
          bg-green-100
          text-green-700
        `;

      case "finished":
        return `
          bg-blue-100
          text-blue-700
        `;

      case "canceled":
        return `
          bg-red-100
          text-red-700
        `;

      default:
        return `
          bg-zinc-100
          text-zinc-700
        `;
    }
  }

  const recentContracts =
    [...contracts]
      .sort((a, b) => {
        return (
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
        );
      })
      .slice(0, 5);

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Contratos recentes
          </h2>

          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            Últimos contratos cadastrados
          </p>
        </div>
      </div>

      {recentContracts.length ===
      0 ? (
        <div
          className="
            text-center
            py-10
            text-zinc-500
          "
        >
          Nenhum contrato
          encontrado
        </div>
      ) : (
        <div className="space-y-4">
          {recentContracts.map(
            (contract) => (
              <div
                key={contract.id}
                className="
                  border
                  rounded-xl
                  p-4
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
              >
                <div
                  className="
                    space-y-1
                  "
                >
                  <h3
                    className="
                      font-semibold
                    "
                  >
                    {getPropertyTitle(
                      contract.propertyId
                    )}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                    "
                  >
                    Cliente:{" "}
                    {getClientName(
                      contract.clientId
                    )}
                  </p>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                    "
                  >
                    Início:{" "}
                    {new Date(
                      contract.startDate
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>

                <div
                  className="
                    flex
                    flex-col
                    items-start
                    md:items-end
                    gap-2
                  "
                >
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getStatusStyles(
                        contract.status
                      )}
                    `}
                  >
                    {getStatusLabel(
                      contract.status
                    )}
                  </span>

                  <p
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    R${" "}
                    {contract.value.toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}