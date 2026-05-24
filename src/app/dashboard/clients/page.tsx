"use client";

import {
  useEffect,
  useState,
} from "react";

import { PageTitle } from "@/components/ui/PageTitle";

import { ClientForm } from "@/components/clients/ClientForm";

import { ClientList } from "@/components/clients/ClientList";

import { ClientsSkeleton } from "@/components/clients/ClientsSkeleton";

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

  const [
    editingClient,
    setEditingClient,
  ] = useState<Client | null>(null);

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

  useEffect(() => {
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
            client.id === editingClient.id
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
          createdAt:
            new Date().toISOString(),
        } as Omit<Client, "id">);

        await loadClients();
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
          (client) => client.id !== id
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
        onCancelEdit={() =>
          setEditingClient(null)
        }
      />

      {loading ? (
        <ClientsSkeleton />
      ) : (
        <ClientList
          clients={clients}
          onDelete={
            handleDeleteClient
          }
          onEdit={handleEditClient}
        />
      )}
    </div>
  );
}