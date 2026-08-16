"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  getAuthErrorMessage,
  loginUser,
  registerUser,
  resetPassword,
} from "@/services/auth.service";

type AuthMode = "login" | "register" | "forgot";

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

      if (mode === "forgot") {
        await resetPassword(email);
        toast.success("Link de recuperação enviado para seu e-mail.");
        setMode("login");
        return;
      }

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

  const titles = {
    login: "Fazer login",
    register: "Criar conta",
    forgot: "Recuperar senha",
  } as const;

  const subtitles = {
    login: "Use sua conta Imobiliária App",
    register: "Preencha os dados para começar",
    forgot: "Informe seu e-mail para receber o link de redefinição",
  } as const;

  return (
    <div className="w-full max-w-[448px]">
      <div className="rounded-3xl border border-zinc-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
            🏠
          </div>
          <h1 className="text-2xl font-normal text-zinc-900">
            {titles[mode]}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">{subtitles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-zinc-700"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full rounded-full bg-blue-600 py-3 hover:bg-blue-700"
          >
            {mode === "login" && "Entrar"}
            {mode === "register" && "Criar conta"}
            {mode === "forgot" && "Enviar link de recuperação"}
          </Button>
        </form>

        <div className="mt-6 space-y-3 border-t border-zinc-100 pt-6 text-center text-sm">
          {mode === "login" && (
            <>
              <p className="text-zinc-600">Não tem uma conta?</p>
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-medium text-blue-600 hover:underline"
              >
                Criar conta
              </button>
            </>
          )}

          {mode === "register" && (
            <>
              <p className="text-zinc-600">Já possui uma conta?</p>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-medium text-blue-600 hover:underline"
              >
                Fazer login
              </button>
            </>
          )}

          {mode === "forgot" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-medium text-blue-600 hover:underline"
            >
              Voltar ao login
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500">
        <Link href="/" className="hover:underline">
          Voltar ao início
        </Link>
        {" · "}
        <Link href="/case-study" className="hover:underline">
          Case study
        </Link>
      </p>
    </div>
  );
}
