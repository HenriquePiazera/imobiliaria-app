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

import { ClientsStats } from "@/components/clients/ClientsStats";

import { Input } from "@/components/ui/Input";

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

  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

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
      await clientRepository.deleteClient(id);

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

  const filteredClients = useMemo(() => {
    const searchLower =
      search.toLowerCase();

    return clients.filter((client) => {
      const name =
        client.name?.toLowerCase() || "";

      const email =
        client.email?.toLowerCase() || "";

      const phone =
        client.phone?.toLowerCase() || "";

      const document =
        client.document?.toLowerCase() || "";

      const city =
        client.city?.toLowerCase() || "";

      return (
        name.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower) ||
        document.includes(searchLower) ||
        city.includes(searchLower)
      );
    });
  }, [clients, search]);

  const totalClients =
    clients.length;

  const clientsWithDocument =
    clients.filter(
      (client) => client.document
    ).length;

  const clientsWithCity =
    clients.filter(
      (client) => client.city
    ).length;

  const clientsCreatedToday =
    clients.filter((client) => {
      const today =
        new Date().toDateString();

      const createdAt =
        new Date(
          client.createdAt
        ).toDateString();

      return today === createdAt;
    }).length;

  return (
    <div className="space-y-8">
      <PageTitle
        title="Clientes"
        subtitle="Gerencie os clientes cadastrados"
      />

      <ClientsStats
        totalClients={totalClients}
        clientsWithDocument={
          clientsWithDocument
        }
        clientsWithCity={
          clientsWithCity
        }
        clientsCreatedToday={
          clientsCreatedToday
        }
      />

      <ClientForm
        onSubmit={handleSubmit}
        editingClient={editingClient}
      />

      <div>
        <Input
          type="text"
          placeholder="Buscar por nome, email, telefone, CPF ou cidade..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {loading ? (
        <ClientsSkeleton />
      ) : (
        <ClientList
          clients={filteredClients}
          onDelete={
            handleDeleteClient
          }
          onEdit={handleEditClient}
        />
      )}
    </div>
  );
}