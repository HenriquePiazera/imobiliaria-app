"use client";

import { Client } from "@/types/client";

type ClientCardProps = {
  client: Client;
  onDelete: (id: string) => void;
};

export function ClientCard({
  client,
  onDelete,
}: ClientCardProps) {
  return (
    <div
      className="
        bg-white
        p-4
        rounded-xl
        shadow
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h2 className="font-bold">
          {client.name}
        </h2>

        <p>{client.email}</p>

        <p>{client.phone}</p>
      </div>

      <button
        onClick={() =>
          onDelete(client.id)
        }
        className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Excluir
      </button>
    </div>
  );
}