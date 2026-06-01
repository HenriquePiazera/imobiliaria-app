"use client";

import { useEffect, useMemo, useState } from "react";

import { ClientForm } from "@/components/clients/ClientForm";
import { ClientList } from "@/components/clients/ClientList";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { ClientRepository } from "@/repositories/clients/client.repository";

import { Client } from "@/types/client";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "lead" | "client" | "inactive"
  >("all");

  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const [clientToEdit, setClientToEdit] =
    useState<Client | null>(null);

  const [clientToDelete, setClientToDelete] =
    useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setLoading(true);

      const data =
        await ClientRepository.getClients();

      setClients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    data: Omit<Client, "id" | "createdAt">
  ) {
    try {
      setLoading(true);

      if (editingClient) {
        await ClientRepository.updateClient(
          editingClient.id,
          data
        );

        setClients((prev) =>
          prev.map((client) =>
            client.id === editingClient.id
              ? {
                  ...client,
                  ...data,
                }
              : client
          )
        );

        setEditingClient(null);

        return;
      }

      const createdClient =
        await ClientRepository.createClient({
          ...data,
          createdAt:
            new Date().toISOString(),
        });

      setClients((prev) => [
        {
          id: createdClient.id,
          ...data,
          createdAt:
            new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function confirmDeleteClient() {
    if (!clientToDelete) return;

    try {
      await ClientRepository.deleteClient(
        clientToDelete.id
      );

      setClients((prev) =>
        prev.filter(
          (item) =>
            item.id !==
            clientToDelete.id
        )
      );

      setClientToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        client.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all"
          ? true
          : client.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    clients,
    search,
    statusFilter,
  ]);

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Clientes
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Gerencie seus clientes,
            leads e contatos.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              {editingClient
                ? "Editar cliente"
                : "Novo cliente"}
            </h2>

            <ClientForm
              initialData={
                editingClient || undefined
              }
              onSubmit={handleSubmit}
              loading={loading}
            />

            {editingClient && (
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={() =>
                    setEditingClient(
                      null
                    )
                  }
                >
                  Cancelar edição
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row">
                <Input
                  placeholder="Buscar cliente..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "all"
                        | "lead"
                        | "client"
                        | "inactive"
                    )
                  }
                  className="
                    rounded-xl
                    border border-zinc-300
                    bg-white
                    px-4 py-3
                    text-sm
                    outline-none
                  "
                >
                  <option value="all">
                    Todos
                  </option>

                  <option value="lead">
                    Leads
                  </option>

                  <option value="client">
                    Clientes
                  </option>

                  <option value="inactive">
                    Inativos
                  </option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Clientes cadastrados
                </h2>

                <span className="text-sm text-zinc-500">
                  {
                    filteredClients.length
                  }{" "}
                  registros
                </span>
              </div>

              <ClientList
                clients={
                  filteredClients
                }
                onEdit={
                  setClientToEdit
                }
                onDelete={
                  setClientToDelete
                }
              />
            </div>
          </div>
        </div>
      </div>

      {clientToEdit && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            p-4
          "
        >
          <div
            className="
              w-full max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-xl
            "
          >
            <h2 className="text-xl font-semibold text-zinc-900">
              Confirmar edição
            </h2>

            <p className="mt-3 text-sm text-zinc-600">
              Deseja editar o cliente{" "}
              <strong>
                {clientToEdit.name}
              </strong>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() =>
                  setClientToEdit(
                    null
                  )
                }
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setEditingClient(
                    clientToEdit
                  );

                  setClientToEdit(
                    null
                  );
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        </div>
      )}

      {clientToDelete && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            p-4
          "
        >
          <div
            className="
              w-full max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-xl
            "
          >
            <h2 className="text-xl font-semibold text-zinc-900">
              Confirmar exclusão
            </h2>

            <p className="mt-3 text-sm text-zinc-600">
              Deseja realmente excluir o
              cliente{" "}
              <strong>
                {
                  clientToDelete.name
                }
              </strong>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() =>
                  setClientToDelete(
                    null
                  )
                }
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={
                  confirmDeleteClient
                }
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}