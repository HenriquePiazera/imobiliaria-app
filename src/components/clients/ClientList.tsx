import { Client } from "@/types/client";

import { ClientCard } from "./ClientCard";

import { EmptyState } from "@/components/ui/EmptyState";

type ClientListProps = {
  clients: Client[];

  onEdit: (client: Client) => void;

  onDelete: (id: string) => void;
};

export function ClientList({
  clients,
  onEdit,
  onDelete,
}: ClientListProps) {
  if (!clients.length) {
    return (
      <EmptyState
        message="Nenhum cliente cadastrado."
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
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}