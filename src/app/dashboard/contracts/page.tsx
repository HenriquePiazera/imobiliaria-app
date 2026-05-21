"use client";

import { useEffect, useState } from "react";

import { PageTitle } from "@/components/ui/PageTitle";
import { ContractForm } from "@/components/contracts/ContractForm";

import { Contract } from "@/types/contract";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [showForm, setShowForm] = useState(true);

  async function loadContracts() {
    try {
      const snapshot = await getDocs(collection(db, "contracts"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contract[];

      setContracts(data);
    } catch (error) {
      console.error("Erro ao carregar contratos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContracts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Deseja excluir este contrato?");
    if (!confirmed) return;

    await deleteDoc(doc(db, "contracts", id));
    setContracts((prev) => prev.filter((c) => c.id !== id));
  }

  function handleEdit(contract: Contract) {
    setEditingContract(contract);
    setShowForm(true);
  }

  function handleFinish() {
    setEditingContract(null);
    loadContracts();
  }

  return (
    <div className="space-y-8">
      <PageTitle
        title="Contratos"
        subtitle="Gerencie os contratos do sistema"
      />

      {/* BOTÃO NOVO CONTRATO */}
      <button
        onClick={() => {
          setEditingContract(null);
          setShowForm((prev) => !prev);
        }}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {showForm ? "Ocultar formulário" : "Novo contrato"}
      </button>

      {/* FORM */}
      {showForm && (
        <ContractForm
          editingContract={editingContract}
          onFinish={() => {
            handleFinish();
            loadContracts();
          }}
        />
      )}

      {/* LISTA */}
      {loading ? (
        <p>Carregando...</p>
      ) : contracts.length === 0 ? (
        <p className="text-zinc-500">
          Nenhum contrato cadastrado ainda. Crie o primeiro acima.
        </p>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white border rounded-2xl p-5 space-y-2"
            >
              <p className="font-semibold">
                Contrato #{contract.id.slice(0, 6)}
              </p>

              <p className="text-sm text-zinc-500">
                Cliente ID: {contract.clientId}
              </p>

              <p className="text-sm text-zinc-500">
                Imóvel ID: {contract.propertyId}
              </p>

              <p className="font-bold">
                R$ {Number(contract.value).toLocaleString("pt-BR")}
              </p>

              <p className="text-sm">
                Status: {contract.status}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(contract)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(contract.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}