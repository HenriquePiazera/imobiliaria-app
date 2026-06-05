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

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [
    contracts,
    setContracts,
  ] = useState<Contract[]>([]);

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

  const activeContracts =
    useMemo(() => {
      return contracts.filter(
        (contract) =>
          contract.status ===
          "active"
      ).length;
    }, [contracts]);

  const finishedContracts =
    useMemo(() => {
      return contracts.filter(
        (contract) =>
          contract.status ===
          "finished"
      ).length;
    }, [contracts]);

  const canceledContracts =
    useMemo(() => {
      return contracts.filter(
        (contract) =>
          contract.status ===
          "canceled"
      ).length;
    }, [contracts]);

  const rentedProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          property.status ===
          "Alugado"
      ).length;
    }, [properties]);

  const availableProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          property.status ===
          "Disponível"
      ).length;
    }, [properties]);

  if (loading) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          h-[60vh]
        "
      >
        <p
          className="
            text-zinc-500
          "
        >
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

        <p
          className="
            text-zinc-500
          "
        >
          Visão geral da
          imobiliária
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <DashboardCard
          title="Clientes"
          value={clients.length}
        />

        <DashboardCard
          title="Imóveis"
          value={properties.length}
        />

        <DashboardCard
          title="Contratos ativos"
          value={activeContracts}
        />

        <DashboardCard
          title="Imóveis alugados"
          value={rentedProperties}
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        <DashboardCard
          title="Contratos finalizados"
          value={finishedContracts}
        />

        <DashboardCard
          title="Contratos cancelados"
          value={canceledContracts}
        />

        <DashboardCard
          title="Imóveis disponíveis"
          value={availableProperties}
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