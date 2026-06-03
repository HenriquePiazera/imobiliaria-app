"use client";

import {
  useEffect,
  useMemo,
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

  const [search, setSearch] =
    useState("");

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

  const filteredContracts =
    useMemo(() => {
      const term =
        search.toLowerCase();

      return contracts.filter(
        (contract) =>
          contract.clientName
            ?.toLowerCase()
            .includes(term) ||
          contract.propertyTitle
            ?.toLowerCase()
            .includes(term) ||
          contract.id
            .toLowerCase()
            .includes(term)
      );
    }, [contracts, search]);

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

      <div>
        <input
          type="text"
          placeholder="Buscar por cliente, imóvel ou ID..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />
      </div>

      <ContractList
        contracts={
          filteredContracts
        }
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