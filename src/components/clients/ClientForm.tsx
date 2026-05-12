"use client";

import { useState } from "react";

type ClientFormProps = {
  onSubmit: (
    data: {
      name: string;
      email: string;
      phone: string;
    }
  ) => Promise<void>;
};

export function ClientForm({
  onSubmit,
}: ClientFormProps) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (!name || !email || !phone) {
      alert("Preencha todos os campos");

      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        name,
        email,
        phone,
      });

      setName("");
      setEmail("");
      setPhone("");
    } catch {
      alert(
        "Erro ao cadastrar cliente"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full border p-3 rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          bg-zinc-900
          text-white
          px-4
          py-3
          rounded-lg
          disabled:opacity-50
        "
      >
        {loading
          ? "Cadastrando..."
          : "Cadastrar Cliente"}
      </button>
    </div>
  );
}