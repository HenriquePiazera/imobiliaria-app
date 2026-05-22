"use client";

import { useEffect, useState } from "react";

import { Contract } from "@/types/contract";
import { Client } from "@/types/client";
import { Property } from "@/types/property";

import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface ContractFormProps {
  editingContract: Contract | null;
  onFinish: () => void;
}

export function ContractForm({
  editingContract,
  onFinish,
}: ContractFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  const [form, setForm] = useState({
    clientId: "",
    propertyId: "",
    value: 0,
    status: "active" as Contract["status"],
    startDate: "",
    endDate: "",
  });

  // 🔹 carregar clientes e imóveis
  useEffect(() => {
    async function loadData() {
      const clientsSnap = await getDocs(collection(db, "clients"));
      const propertiesSnap = await getDocs(collection(db, "properties"));

      const clientsData = clientsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];

      const propertiesData = propertiesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[];

      setClients(clientsData);
      setProperties(propertiesData);
    }

    loadData();
  }, []);

  // 🔹 preencher edição
  useEffect(() => {
    if (editingContract) {
      setForm({
        clientId: editingContract.clientId,
        propertyId: editingContract.propertyId,
        value: editingContract.value,
        status: editingContract.status,
        startDate: editingContract.startDate,
        endDate: editingContract.endDate || "",
      });
    }
  }, [editingContract]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingContract) {
        const contractRef = doc(db, "contracts", editingContract.id);

        await updateDoc(contractRef, {
          ...form,
          value: Number(form.value),
        });
      } else {
        await addDoc(collection(db, "contracts"), {
          ...form,
          value: Number(form.value),
          createdAt: new Date().toISOString(),
        });
      }

      setForm({
        clientId: "",
        propertyId: "",
        value: 0,
        status: "active",
        startDate: "",
        endDate: "",
      });

      onFinish();
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {editingContract ? "Editar contrato" : "Novo contrato"}
      </h2>

      {/* CLIENTE */}
      <select
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Selecione um cliente</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* IMÓVEL */}
      <select
        name="propertyId"
        value={form.propertyId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Selecione um imóvel</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      {/* VALOR */}
      <input
        type="number"
        name="value"
        placeholder="Valor"
        value={form.value}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* STATUS */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="active">Ativo</option>
        <option value="finished">Finalizado</option>
        <option value="canceled">Cancelado</option>
      </select>

      {/* DATAS */}
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        {editingContract ? "Atualizar" : "Criar contrato"}
      </button>
    </form>
  );
}