import { useEffect } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { ClientRepository } from "@/repositories/clients/client.repository";
import { Client } from "@/types/client";
import { useOwnerId } from "./useOwnerId";

export function useClients() {
  const { ownerId, loading: authLoading } = useOwnerId();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ownerId) return;

    const repository = new ClientRepository(ownerId);

    return repository.subscribe((clients) => {
      queryClient.setQueryData(["clients", ownerId], clients);
    });
  }, [ownerId, queryClient]);

  return useQuery({
    queryKey: ["clients", ownerId],
    queryFn: async () => {
      if (!ownerId) return [];
      return new ClientRepository(ownerId).getClients();
    },
    enabled: !!ownerId && !authLoading,
    staleTime: Infinity,
  });
}

export function useCreateClient() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (data: Omit<Client, "id" | "createdAt" | "ownerId">) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ClientRepository(ownerId).createClient({
        ...data,
        ownerId,
        createdAt: new Date().toISOString(),
      });
    },
  });
}

export function useUpdateClient() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Client>;
    }) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ClientRepository(ownerId).updateClient(id, data);
    },
  });
}

export function useDeleteClient() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new ClientRepository(ownerId).deleteClient(id);
    },
  });
}
