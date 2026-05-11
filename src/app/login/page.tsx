"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await loginUser(email, password);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}