"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { PageTitle } from "@/components/ui/PageTitle";

import { ClientForm } from "@/components/clients/ClientForm";

import { ClientList } from "@/components/clients/ClientList";

import { ClientsSkeleton } from "@/components/clients/ClientsSkeleton";

import { ClientFilters } from "@/components/clients/ClientFilters";

import { Client } from "@/types/client";

import { ClientFormData } from "@/schemas/client.schema";

import { ClientRepository } from "@/repositories/clients/client.repository";

const clientRepository =
  new ClientRepository();

export default function ClientsPage() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    editingClient,
    setEditingClient,
  ] = useState<Client | null>(null);

  useEffect(() => {
    async function loadClients() {
      try {
        const data =
          await clientRepository.getClients();

        setClients(data);

      } catch (error) {
        console.error(
          "Erro ao carregar clientes:",
          error
        );

      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  async function handleSubmit(
    data: ClientFormData
  ) {
    try {
      if (editingClient) {
        await clientRepository.updateClient(
          editingClient.id,
          data
        );

        setClients((prev) =>
          prev.map((client) =>
            client.id ===
            editingClient.id
              ? {
                  ...client,
                  ...data,
                }
              : client
          )
        );

        setEditingClient(null);

      } else {
        await clientRepository.createClient({
          ...data,

          notes:
            data.notes || "",

          createdAt:
            new Date().toISOString(),
        } as Omit<Client, "id">);

        const updated =
          await clientRepository.getClients();

        setClients(updated);
      }

    } catch (error) {
      console.error(
        "Erro ao salvar cliente:",
        error
      );
    }
  }

  async function handleDeleteClient(
    id: string
  ) {
    try {
      await clientRepository.deleteClient(
        id
      );

      setClients((prev) =>
        prev.filter(
          (client) =>
            client.id !== id
        )
      );

    } catch (error) {
      console.error(
        "Erro ao excluir cliente:",
        error
      );
    }
  }

  function handleEditClient(
    client: Client
  ) {
    setEditingClient(client);
  }

  const filteredClients =
    useMemo(() => {
      return clients.filter(
        (client) => {
          const searchValue =
            search.toLowerCase();

          return (
            (client.name || "")
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            (client.document || "")
              .toLowerCase()
              .includes(
                searchValue
              )
          );
        }
      );
    }, [clients, search]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Clientes"
        subtitle="Gerencie os clientes cadastrados"
      />

      <ClientForm
        onSubmit={handleSubmit}
        editingClient={
          editingClient
        }
      />

      <ClientFilters
        search={search}
        onSearchChange={
          setSearch
        }
        totalClients={
          filteredClients.length
        }
      />

      {loading ? (
        <ClientsSkeleton />
      ) : (
        <ClientList
          clients={
            filteredClients
          }
          onDelete={
            handleDeleteClient
          }
          onEdit={
            handleEditClient
          }
        />
      )}
    </div>
  );
}