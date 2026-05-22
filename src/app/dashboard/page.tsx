"use client";

import { useEffect, useState } from "react";

import { PageTitle } from "@/components/ui/PageTitle";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
  const [clientsCount, setClientsCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [contractsCount, setContractsCount] = useState(0);

  async function loadData() {
    try {
      const clientsSnap = await getDocs(collection(db, "clients"));
      const propertiesSnap = await getDocs(collection(db, "properties"));
      const contractsSnap = await getDocs(collection(db, "contracts"));

      setClientsCount(clientsSnap.size);
      setPropertiesCount(propertiesSnap.size);
      setContractsCount(contractsSnap.size);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Dashboard"
        subtitle="Visão geral do sistema"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Imóveis</h2>
          <p className="text-3xl font-bold mt-2">
            {propertiesCount}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Clientes</h2>
          <p className="text-3xl font-bold mt-2">
            {clientsCount}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Contratos</h2>
          <p className="text-3xl font-bold mt-2">
            {contractsCount}
          </p>
        </div>
      </div>
    </div>
  );
}