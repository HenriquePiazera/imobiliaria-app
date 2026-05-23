"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  getAuthErrorMessage,
  loginUser,
} from "@/services/auth.service";

import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/Button";

export default function LoginPage() {
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

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(
        email,
        password
      );

      toast.success(
        "Login realizado com sucesso!"
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
        flex
        min-h-screen
        items-center
        justify-center
        bg-zinc-100
        p-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          space-y-5
          rounded-2xl
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="space-y-1">
          <h1
            className="
              text-2xl
              font-bold
            "
          >
            Entrar
          </h1>

          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            Acesse seu CRM imobiliário
          </p>
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            px-4
            py-2
            outline-none
            focus:border-zinc-900
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
            rounded-xl
            border
            px-4
            py-2
            outline-none
            focus:border-zinc-900
          "
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Entrar
        </Button>

        <div
          className="
            text-center
            text-sm
            text-zinc-600
          "
        >
          Não possui conta?{" "}

          <Link
            href="/register"
            className="
              font-medium
              text-zinc-900
              hover:underline
            "
          >
            Criar conta
          </Link>
        </div>
      </form>
    </main>
  );
}