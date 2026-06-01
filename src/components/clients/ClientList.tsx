import { Client } from "@/types/client";

interface ClientListProps {
  clients: Client[];

  onEdit: (client: Client) => void;

  onDelete: (client: Client) => void;
}

const statusStyles = {
  lead: {
    label: "Lead",
    className:
      "bg-blue-100 text-blue-700",
  },

  client: {
    label: "Cliente",
    className:
      "bg-green-100 text-green-700",
  },

  inactive: {
    label: "Inativo",
    className:
      "bg-zinc-200 text-zinc-700",
  },
};

function capitalize(text?: string) {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );
}

export function ClientList({
  clients,
  onEdit,
  onDelete,
}: ClientListProps) {
  if (!clients.length) {
    return (
      <div
        className="
          flex min-h-[200px]
          items-center justify-center
          rounded-2xl border
          border-dashed border-zinc-300
        "
      >
        <p className="text-sm text-zinc-500">
          Nenhum cliente encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {clients.map((client) => {
        const status =
          statusStyles[
            client.status
          ];

        return (
          <div
            key={client.id}
            className="
              rounded-2xl border
              border-zinc-200 bg-white
              p-5 shadow-sm
              transition
              hover:border-zinc-300
            "
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {capitalize(
                      client.name
                    )}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {client.email}
                  </p>
                </div>

                <span
                  className={`
                    inline-flex rounded-full
                    px-3 py-1 text-xs
                    font-medium
                    ${status.className}
                  `}
                >
                  {status.label}
                </span>

                <div className="space-y-1 text-sm text-zinc-600">
                  <p>
                    <strong>
                      Telefone:
                    </strong>{" "}
                    {client.phone}
                  </p>

                  <p>
                    <strong>
                      CPF:
                    </strong>{" "}
                    {client.document}
                  </p>

                  <p>
                    <strong>
                      Cidade:
                    </strong>{" "}
                    {capitalize(
                      client.city
                    )}{" "}
                    -{" "}
                    {capitalize(
                      client.state
                    )}
                  </p>

                  <p>
                    <strong>
                      Endereço:
                    </strong>{" "}
                    {capitalize(
                      client.address
                    )}
                  </p>

                  {client.notes && (
                    <p>
                      <strong>
                        Obs:
                      </strong>{" "}
                      {client.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onEdit(client)
                  }
                  className="
                    rounded-xl
                    border border-zinc-300
                    px-4 py-2 text-sm
                    font-medium
                    text-zinc-700
                    transition
                    hover:bg-zinc-100
                  "
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    onDelete(client)
                  }
                  className="
                    rounded-xl
                    border border-red-200
                    px-4 py-2 text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                  "
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}