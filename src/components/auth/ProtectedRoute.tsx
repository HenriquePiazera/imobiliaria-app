"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}