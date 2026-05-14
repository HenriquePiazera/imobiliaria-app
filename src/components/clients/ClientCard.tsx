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
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {client.name}
        </h2>

        <p className="text-zinc-600">
          {client.email}
        </p>

        <p className="text-zinc-600">
          {client.phone}
        </p>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => onEdit(client)}
          >
            Editar
          </Button>

          <Button
            onClick={() =>
              onDelete(client.id)
            }
            className="bg-red-600 hover:bg-red-500"
          >
            Excluir
          </Button>
        </div>
      </div>
    </Card>
  );
}