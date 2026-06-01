"use client";

import {
  useEffect,
  useState,
} from "react";

import { PageTitle } from "@/components/ui/PageTitle";

import { ContractForm } from "@/components/contracts/ContractForm";

import { ContractList } from "@/components/contracts/ContractList";

import { DeleteModal } from "@/components/ui/DeleteModal";

import { Contract } from "@/types/contract";

import { ContractRepository } from "@/repositories/contracts/contract.repository";

const contractRepository =
  new ContractRepository();

export default function ContractsPage() {
  const [contracts, setContracts] =
    useState<Contract[]>([]);

  const [editingContract, setEditingContract] =
    useState<Contract | null>(null);

  const [contractToDelete, setContractToDelete] =
    useState<Contract | null>(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  async function loadContracts() {
    try {
      const data =
        await contractRepository.getContracts();

      setContracts(data);

    } catch (error) {
      console.error(
        "Erro ao carregar contratos:",
        error
      );
    }
  }

  function handleEdit(
    contract: Contract
  ) {
    setEditingContract(contract);
  }

  function handleOpenDeleteModal(
    contract: Contract
  ) {
    setContractToDelete(contract);
  }

  function handleCloseDeleteModal() {
    setContractToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!contractToDelete) return;

    try {
      setDeleteLoading(true);

      await contractRepository.deleteContract(
        contractToDelete.id
      );

      setContracts((prev) =>
        prev.filter(
          (contract) =>
            contract.id !==
            contractToDelete.id
        )
      );

      handleCloseDeleteModal();

    } catch (error) {
      console.error(
        "Erro ao excluir contrato:",
        error
      );

    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageTitle
        title="Contratos"
        subtitle="Gerencie os contratos cadastrados"
      />

      <ContractForm
        editingContract={
          editingContract
        }
        onFinish={loadContracts}
      />

      <ContractList
        contracts={contracts}
        onEdit={handleEdit}
        onDelete={
          handleOpenDeleteModal
        }
      />

      <DeleteModal
        open={!!contractToDelete}
        title="Excluir contrato"
        description="Tem certeza que deseja excluir este contrato?"
        onClose={
          handleCloseDeleteModal
        }
        onConfirm={
          handleConfirmDelete
        }
        loading={deleteLoading}
      />
    </div>
  );
}