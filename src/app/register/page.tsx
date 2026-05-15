"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Conta criada com sucesso!");

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(error.message);
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
      "
    >
      <form
        onSubmit={handleRegister}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow
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