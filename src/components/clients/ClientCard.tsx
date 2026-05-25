"use client";

import { Client } from "@/types/client";

import { Card } from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";

type ClientCardProps = {
  client: Client;

  onEdit: (client: Client) => void;

  onDelete: (id: string) => void;
};

export function ClientCard({
  client,
  onEdit,
  onDelete,
}: ClientCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3
            className="
              text-lg
              font-semibold
            "
          >
            {client.name}
          </h3>

          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            {client.email}
          </p>
        </div>

        <div
          className="
            space-y-2
            text-sm
          "
        >
          <p>
            <strong>
              Telefone:
            </strong>{" "}
            {client.phone}
          </p>

          {client.cpf && (
            <p>
              <strong>
                CPF:
              </strong>{" "}
              {client.cpf}
            </p>
          )}

          {client.city && (
            <p>
              <strong>
                Cidade:
              </strong>{" "}
              {client.city}
            </p>
          )}

          {client.state && (
            <p>
              <strong>
                Estado:
              </strong>{" "}
              {client.state}
            </p>
          )}

          {client.address && (
            <p>
              <strong>
                Endereço:
              </strong>{" "}
              {client.address}
            </p>
          )}

          {client.notes && (
            <p>
              <strong>
                Observações:
              </strong>{" "}
              {client.notes}
            </p>
          )}
        </div>

        <div
          className="
            flex
            gap-2
          "
        >
          <Button
            onClick={() =>
              onEdit(client)
            }
          >
            Editar
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              onDelete(client.id)
            }
          >
            Excluir
          </Button>
        </div>
      </div>
    </Card>
  );
}