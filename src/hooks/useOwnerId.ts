import { useAuth } from "@/contexts/AuthContext";

export function useOwnerId() {
  const { user, loading } = useAuth();
  return { ownerId: user?.uid ?? null, loading };
}
