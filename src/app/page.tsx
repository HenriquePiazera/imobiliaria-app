"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  createClient,
  deleteClient,
  subscribeToClients,
  updateClient,
} from "@/repositories/client.repository";

import { Client } from "@/types/client";

import { ClientForm } from "@/components/clients/ClientForm";

import { ClientList } from "@/components/clients/ClientList";

import { ClientsSkeleton } from "@/components/clients/ClientsSkeleton";

import { ClientFormData } from "@/schemas/client.schema";

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

  useEffect(() => {
    const unsubscribe =
      subscribeToClients(
        (clientsData) => {
          setClients(clientsData);

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  async function handleSubmit(
    data: ClientFormData
  ) {
    if (editingClient) {
      await updateClient(
        editingClient.id,
        data
      );

      toast.success(
        "Cliente atualizado"
      );

      setEditingClient(null);
    } else {
      await createClient({
        ...data,
        createdAt: new Date(),
      });

      toast.success(
        "Cliente cadastrado"
      );
    }
  }

  async function handleDeleteClient(
    id: string
  ) {
    const confirmed = confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmed) {
      return;
    }

    await deleteClient(id);

    toast.success(
      "Cliente excluído"
    );
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
