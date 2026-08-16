"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  getAuthErrorMessage,
  loginUser,
  registerUser,
} from "@/services/auth.service";

type AuthMode = "login" | "register";

type AuthFormProps = {
  initialMode?: AuthMode;
};

export function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      if (mode === "login") {
        await loginUser(email, password);
        toast.success("Login realizado com sucesso!");
      } else {
        await registerUser(email, password);
        toast.success("Conta criada com sucesso!");
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      const code =
        error instanceof Object && "code" in error
          ? String(error.code)
          : undefined;

      toast.error(getAuthErrorMessage(code ?? ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="text-sm text-zinc-500">
          {mode === "login"
            ? "Acesse seu CRM imobiliário"
            : "Cadastre-se e comece a usar o sistema"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-xl bg-zinc-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "login"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "register"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Criar conta
        </button>
      </div>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-xl border px-4 py-2 outline-none focus:border-zinc-900"
      />

      <input
        type="password"
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:border-zinc-900"
      />

      <Button type="submit" loading={loading} className="w-full">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </Button>

      <div className="text-center text-sm text-zinc-600">
        <Link href="/" className="font-medium text-zinc-900 hover:underline">
          ← Voltar ao início
        </Link>
      </div>
    </form>
  );
}
