"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const modeParam = searchParams.get("mode");
  const initialMode =
    modeParam === "register"
      ? "register"
      : modeParam === "forgot"
        ? "forgot"
        : "login";

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return <AuthForm initialMode={initialMode} />;
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <Suspense fallback={<p className="text-sm text-zinc-500">Carregando...</p>}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
