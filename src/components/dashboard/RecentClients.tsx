import { Client }from "@/domain/clients/client.types";

import { Card } from "@/components/ui/Card";

type RecentClientsProps = {
  clients: Client[];
};

export function RecentClients({
  clients,
}: RecentClientsProps) {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Clientes recentes
        </h2>

        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-2
              "
            >
              <div>
                <p className="font-medium">
                  {client.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {client.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}