"use client";

import { useEffect, useState } from "react";

import {
  createClient,
  deleteClient,
  getClients,
} from "@/repositories/client.repository";

import { Client } from "@/types/client";

import { ClientForm } from "@/components/clients/ClientForm";

import { ClientList } from "@/components/clients/ClientList";

export default function ClientsPage() {
  const [clients, setClients] = useState<
    Client[]
  >([]);

  async function loadClients() {
    const data = await getClients();

    setClients(data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleCreateClient(
    data: {
      name: string;
      email: string;
      phone: string;
    }
  ) {
    await createClient({
      ...data,
      createdAt: new Date(),
    });

    loadClients();
  }

  async function handleDeleteClient(
    id: string
  ) {
    await deleteClient(id);

    loadClients();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Clientes
      </h1>

      <ClientForm
        onSubmit={
          handleCreateClient
        }
      />

      <ClientList
        clients={clients}
        onDelete={
          handleDeleteClient
        }
      />
    </div>
  );
}