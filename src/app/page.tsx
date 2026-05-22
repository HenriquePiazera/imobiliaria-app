 feature/properties-module
export default function DashboardPage() {
  return (
    <section>
      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Dashboard
      </h1>

      <p className="mt-4">
        Bem-vindo ao sistema imobiliário.
      </p>
    </section>

"use client";

import { useState } from "react";

import {
  registerUser,
  loginUser,
} from "@/services/auth.service";

export default function AuthPage() {
  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit() {
    try {
      if (isLogin) {
        await loginUser(
          email,
          password
        );

        alert(
          "Login realizado com sucesso"
        );
      } else {
        await registerUser(
          email,
          password
        );

        alert(
          "Conta criada com sucesso"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Erro na autenticação"
      );
    }
  }

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-md
          space-y-4
          p-6
        "
      >
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          {isLogin
            ? "Entrar"
            : "Criar conta"}
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            rounded
            border
            p-3
          "
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            rounded
            border
            p-3
          "
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            rounded
            bg-black
            p-3
            text-white
          "
        >
          {isLogin
            ? "Entrar"
            : "Cadastrar"}
        </button>

        <button
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
          className="w-full"
        >
          {isLogin
            ? "Criar uma conta"
            : "Já tenho conta"}
        </button>
      </div>
    </main>
 master
  );
}