"use client";

import { Client } from "@/types/client";

import { ClientCard } from "./ClientCard";

type ClientListProps = {
  clients: Client[];

  onDelete: (id: string) => void;

  onEdit: (client: Client) => void;
};

export function ClientList({
  clients,
  onDelete,
  onEdit,
}: ClientListProps) {
  if (clients.length === 0) {
    return (
      <p>
        Nenhum cliente cadastrado.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}