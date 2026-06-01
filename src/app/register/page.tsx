"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  getAuthErrorMessage,
  registerUser,
} from "@/services/auth.service";

import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const { user } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(
        email,
        password
      );

      toast.success(
        "Conta criada com sucesso!"
      );

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        getAuthErrorMessage(error.code)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-zinc-100
        p-4
      "
    >
      <form
        onSubmit={handleRegister}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-sm
          w-full
          max-w-md
          space-y-4
        "
      >
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          Criar conta
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-2
          "
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-2
          "
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Criar conta
        </Button>
      </form>
    </main>
  );
}