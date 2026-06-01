import { Client } from "@/types/client";

import { Card } from "@/components/ui/Card";

import { ClientStatusBadge } from "./ClientStatusBadge";

type ClientCardProps = {
  client: Client;

  onEdit: (client: Client) => void;

  onDelete: (client: Client) => void;
};

export function ClientCard({
  client,
  onEdit,
  onDelete,
}: ClientCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
              "
            >
              {client.name}
            </h2>

            <p className="text-sm text-zinc-500">
              {client.email}
            </p>
          </div>

          <ClientStatusBadge
            status={
              client.status ||
              "lead"
            }
          />
        </div>

        <div className="space-y-1 text-sm">
          <p>
            <strong>Telefone:</strong>{" "}
            {client.phone}
          </p>

          <p>
            <strong>CPF:</strong>{" "}
            {client.document}
          </p>

          <p>
            <strong>Cidade:</strong>{" "}
            {client.city} - {client.state}
          </p>

          <p>
            <strong>Endereço:</strong>{" "}
            {client.address}
          </p>

          {client.notes && (
            <p>
              <strong>Obs:</strong>{" "}
              {client.notes}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() =>
              onEdit(client)
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
              onDelete(client)
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