"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "@/repositories/client.repository";

import { Client } from "@/types/client";

import { ClientForm } from "@/components/clients/ClientForm";

import { ClientList } from "@/components/clients/ClientList";

import { ClientFormData } from "@/schemas/client.schema";

import { ClientsSkeleton } from "@/components/clients/ClientsSkeleton";

export default function ClientsPage() {
  const [clients, setClients] =
    useState<Client[]>([]);
  
  const [loading, setLoading] =
    useState(true);  

  const [
    editingClient,
    setEditingClient,
  ] = useState<Client | null>(
    null
  );

  async function loadClients() {
    try {
      setLoading(true);
  
      const data =
        await getClients();
  
      setClients(data);
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
    if (editingClient) {
      await updateClient(
        editingClient.id,
        data
      );

      setEditingClient(null);
    } else {
      await createClient({
        ...data,
        createdAt: new Date(),
      });
    }

    loadClients();
  }

  async function handleDeleteClient(
    id: string
  ) {
    await deleteClient(id);

    loadClients();
  }

  function handleEditClient(
    client: Client
  ) {
    setEditingClient(client);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Clientes
      </h1>

      <ClientForm
        onSubmit={handleSubmit}
        editingClient={
          editingClient
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
    onEdit={
      handleEditClient
    }
  />
)}
    </div>
  );
}