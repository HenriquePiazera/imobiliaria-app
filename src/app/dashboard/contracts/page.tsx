"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Contract } from "@/types/contract";
import { ContractRepository } from "@/repositories/contracts/contract.repository";

import { ContractForm } from "@/components/contracts/ContractForm";
import { ContractList } from "@/components/contracts/ContractList";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { PageTitle } from "@/components/ui/PageTitle";

const repo = new ContractRepository();

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [editing, setEditing] = useState<Contract | null>(null);
  const [toDelete, setToDelete] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const data = await repo.getContracts();
    setContracts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(data: Contract) {
    if (editing) {
      await repo.updateContract(editing.id, data);
      setEditing(null);
    } else {
      await repo.createContract({
        ...data,
        createdAt: new Date().toISOString(),
      });
    }

    await load();
  }

  async function confirmDelete() {
    if (!toDelete) return;

    setLoading(true);

    await repo.deleteContract(toDelete.id);

    setContracts((prev) => prev.filter((c) => c.id !== toDelete.id));

    setToDelete(null);
    setLoading(false);

    toast.success("Contrato removido");
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Contratos" subtitle="Gestão de contratos" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContractForm onSubmit={handleSubmit} editingContract={editing} />

        <ContractList
          contracts={contracts}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      </div>

      <DeleteModal
        open={!!toDelete}
        title="Excluir contrato"
        description="Tem certeza?"
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        loading={loading}
      />
    </div>
  );
}