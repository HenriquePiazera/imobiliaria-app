"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ContractForm } from "@/components/contracts/ContractForm";
import { ContractList } from "@/components/contracts/ContractList";
import { Button } from "@/components/ui/Button";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";
import { Pagination } from "@/components/ui/Pagination";

import {
  useContracts,
  useCreateContract,
  useDeleteContract,
  useUpdateContract,
} from "@/hooks/useContracts";

import { Contract } from "@/types/contract";
import { toCreateContractDTO, toUpdateContractDTO } from "@/utils/contract-mappers";
import { exportToCsv } from "@/utils/exportCsv";
import { getTotalPages, paginate } from "@/utils/paginate";

const PAGE_SIZE = 6;

export default function ContractsPage() {
  const { data: contracts = [], isLoading } = useContracts();
  const createContract = useCreateContract();
  const updateContract = useUpdateContract();
  const deleteContract = useDeleteContract();

  const [editingContract, setEditingContract] =
    useState<Contract | null>(null);
  const [contractToDelete, setContractToDelete] =
    useState<Contract | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = getTotalPages(contracts.length, PAGE_SIZE);
  const paginatedContracts = paginate(contracts, page, PAGE_SIZE);

  async function handleSubmit(data: Contract) {
    try {
      if (editingContract) {
        await updateContract.mutateAsync({
          id: editingContract.id,
          data: toUpdateContractDTO(data),
        });
        toast.success("Contrato atualizado");
        setEditingContract(null);
      } else {
        await createContract.mutateAsync(toCreateContractDTO(data));
        toast.success("Contrato criado");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao salvar contrato"
      );
    }
  }

  async function confirmDelete() {
    if (!contractToDelete) return;

    try {
      await deleteContract.mutateAsync(contractToDelete.id);
      toast.success("Contrato excluído");
      setContractToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir contrato");
    }
  }

  function handleExport() {
    exportToCsv("contratos.csv", contracts, [
      { key: "clientName", label: "Cliente" },
      { key: "propertyTitle", label: "Imóvel" },
      { key: "type", label: "Tipo" },
      { key: "value", label: "Valor" },
      { key: "status", label: "Status" },
      { key: "startDate", label: "Início" },
    ]);
    toast.success("Exportação iniciada");
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle
            title="Contratos"
            subtitle="Gerencie contratos de aluguel e venda"
          />

          <Button type="button" onClick={handleExport}>
            Exportar CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="w-full">
            <ContractForm
              key={editingContract?.id ?? "new-contract-form"}
              onSubmit={handleSubmit}
              editingContract={editingContract}
              onFinish={() => setEditingContract(null)}
            />
          </div>

          <div className="w-full">
            {isLoading ? (
              <p className="text-sm text-zinc-500">Carregando contratos...</p>
            ) : paginatedContracts.length === 0 ? (
              <EmptyState message="Nenhum contrato cadastrado. Crie o primeiro ou use os dados demo no dashboard." />
            ) : (
              <>
                <ContractList
                  contracts={paginatedContracts}
                  onEdit={(contract) => {
                    setEditingContract(contract);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onDelete={setContractToDelete}
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        open={!!contractToDelete}
        title="Excluir contrato"
        description={`Tem certeza que deseja excluir o contrato de "${contractToDelete?.clientName}"?`}
        onConfirm={confirmDelete}
        onClose={() => setContractToDelete(null)}
        loading={deleteContract.isPending}
      />
    </>
  );
}
