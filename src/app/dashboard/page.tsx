"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Client } from "@/types/client";
import { Property } from "@/types/property";
import { Contract } from "@/types/contract";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { RecentContracts } from "@/components/dashboard/RecentContracts";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";

export default function DashboardPage() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [contracts, setContracts] =
    useState<Contract[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribeClients =
      onSnapshot(
        collection(db, "clients"),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Client[];

          setClients(data);
        }
      );

    const unsubscribeProperties =
      onSnapshot(
        collection(
          db,
          "properties"
        ),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Property[];

          setProperties(data);
        }
      );

    const unsubscribeContracts =
      onSnapshot(
        collection(
          db,
          "contracts"
        ),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Contract[];

          setContracts(data);
          setLoading(false);
        }
      );

    return () => {
      unsubscribeClients();
      unsubscribeProperties();
      unsubscribeContracts();
    };
  }, []);

  const leads = useMemo(() => {
    return clients.filter(
      (client) =>
        client.status === "lead"
    ).length;
  }, [clients]);

  const inactiveClients =
    useMemo(() => {
      return clients.filter(
        (client) =>
          client.status ===
          "inactive"
      ).length;
    }, [clients]);

  const availableProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          property.status ===
          "Disponível"
      ).length;
    }, [properties]);

  const rentedProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          property.status ===
          "Alugado"
      ).length;
    }, [properties]);

  const soldProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          property.status ===
          "Vendido"
      ).length;
    }, [properties]);

  if (loading) {
    return (
      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        <p className="text-zinc-500">
          Carregando dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <p className="text-zinc-500">
          Visão geral da
          imobiliária
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <DashboardCard
          title="Clientes"
          value={clients.length}
        />

        <DashboardCard
          title="Leads"
          value={leads}
        />

        <DashboardCard
          title="Inativos"
          value={inactiveClients}
        />

        <DashboardCard
          title="Imóveis"
          value={properties.length}
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <DashboardCard
          title="Contratos"
          value={contracts.length}
        />

        <DashboardCard
          title="Imóveis disponíveis"
          value={availableProperties}
        />

        <DashboardCard
          title="Imóveis alugados"
          value={rentedProperties}
        />

        <DashboardCard
          title="Imóveis vendidos"
          value={soldProperties}
        />
      </div>

      <RecentContracts
        contracts={contracts}
        clients={clients}
        properties={properties}
      />

      <FinancialSummary
        contracts={contracts}
      />
    </div>
  );
}