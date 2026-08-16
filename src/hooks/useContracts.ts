import { useEffect } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ContractRepository,
  CreateContractDTO,
} from "@/repositories/contracts/contract.repository";
import { Contract } from "@/types/contract";
import { useOwnerId } from "./useOwnerId";

export function useContracts() {
  const { ownerId, loading: authLoading } = useOwnerId();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ownerId) return;

    const repository = new ContractRepository(ownerId);

    return repository.subscribe((contracts) => {
      queryClient.setQueryData(["contracts", ownerId], contracts);
    });
  }, [ownerId, queryClient]);

  return useQuery({
    queryKey: ["contracts", ownerId],
    queryFn: async () => {
      if (!ownerId) return [];
      return new ContractRepository(ownerId).getContracts();
    },
    enabled: !!ownerId && !authLoading,
    staleTime: Infinity,
  });
}

export function useCreateContract() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (data: CreateContractDTO) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ContractRepository(ownerId).createContract({
        ...data,
        ownerId,
      });
    },
  });
}

export function useUpdateContract() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Contract>;
    }) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ContractRepository(ownerId).updateContract(id, data);
    },
  });
}

export function useDeleteContract() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ContractRepository(ownerId).deleteContract(id);
    },
  });
}
