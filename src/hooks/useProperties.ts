import { useEffect } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { PropertyRepository } from "@/repositories/properties/property.repository";
import { PropertyFormData } from "@/schemas/property.schema";
import { Property } from "@/types/property";
import { useOwnerId } from "./useOwnerId";

export function useProperties() {
  const { ownerId, loading: authLoading } = useOwnerId();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ownerId) return;

    const repository = new PropertyRepository(ownerId);

    return repository.subscribe((properties) => {
      queryClient.setQueryData(["properties", ownerId], properties);
    });
  }, [ownerId, queryClient]);

  return useQuery({
    queryKey: ["properties", ownerId],
    queryFn: async () => {
      if (!ownerId) return [];
      return new PropertyRepository(ownerId).getProperties();
    },
    enabled: !!ownerId && !authLoading,
    staleTime: Infinity,
  });
}

export function useCreateProperty() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (data: PropertyFormData) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new PropertyRepository(ownerId).createProperty({
        ...data,
        ownerId,
        imageUrl: data.imageUrl ?? "",
        createdAt: new Date().toISOString(),
      });
    },
  });
}

export function useUpdateProperty() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Property>;
    }) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new PropertyRepository(ownerId).updateProperty(id, data);
    },
  });
}

export function useDeleteProperty() {
  const { ownerId } = useOwnerId();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!ownerId) throw new Error("Usuário não autenticado");
      return new PropertyRepository(ownerId).deleteProperty(id);
    },
  });
}
