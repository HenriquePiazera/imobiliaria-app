"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { PageTitle } from "@/components/ui/PageTitle";

import { ContractForm } from "@/components/contracts/ContractForm";

import { ContractList } from "@/components/contracts/ContractList";

import { DeleteModal } from "@/components/ui/DeleteModal";

import { Contract } from "@/types/contract";

import { ContractRepository } from "@/repositories/contracts/contract.repository";

const contractRepository = new ContractRepository();

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [contractToDelete, setContractToDelete] = useState<Contract | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  async function loadContracts() {
    try {
      const data = await contractRepository.getContracts();
      setContracts(data);
    } catch (error) {
      console.error("Erro ao carregar contratos:", error);
    }
  }

  async function handleSubmit(data: Contract) {
    try {
      if (editingContract) {
        await contractRepository.updateContract(editingContract.id, data);
        toast.success("Contrato atualizado");
        setEditingContract(null);
      } else {
        await contractRepository.createContract({
          ...data,
          createdAt: new Date().toISOString(),
        });
        toast.success("Contrato criado");
      }

      await loadContracts();
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao salvar contrato");
    }
  }

  async function confirmDelete() {
    if (!contractToDelete) return;

    try {
      setDeleteLoading(true);

      await contractRepository.deleteContract(contractToDelete.id);

      setContracts((prev) =>
        prev.filter((c) => c.id !== contractToDelete.id)
      );

      toast.success("Contrato excluído");

      setContractToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      toast.error("Erro ao excluir contrato");
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleEdit(contract: Contract) {
    setEditingContract(contract);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(contract: Contract) {
    setContractToDelete(contract);
  }

  return (
    <>
      <div className="space-y-6">
        <PageTitle
          title="Contratos"
          subtitle="Gerencie contratos de aluguel e venda"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          <div className="w-full">
            <ContractForm
              onSubmit={handleSubmit}
              editingContract={editingContract}
              onFinish={() => {}}
            />
          </div>

          <div className="w-full">
            <ContractList
              contracts={contracts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        open={!!contractToDelete}
        title="Excluir contrato"
        description={`Tem certeza que deseja excluir o contrato de "${contractToDelete?.clientName}"?`}
        onConfirm={confirmDelete}
        onClose={() => setContractToDelete(null)}
        loading={deleteLoading}
      />
    </>
  );
}