"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Contract } from "@/types/contract";
import { Client } from "@/types/client";
import { Property } from "@/types/property";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface ContractFormProps {
  onSubmit: (data: Contract) => Promise<void>;

  editingContract: Contract | null;

  onFinish?: () => void;
}

export function ContractForm({
  onSubmit,
  editingContract,
  onFinish,
}: ContractFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    propertyId: "",
    value: 0,
    status: "active" as Contract["status"],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function loadData() {
      const clientsSnap = await getDocs(collection(db, "clients"));
      const propertiesSnap = await getDocs(collection(db, "properties"));

      setClients(
        clientsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Client[]
      );

      setProperties(
        propertiesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[]
      );
    }

    loadData();
  }, []);

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
      setLoading(true);

      const selectedClient = clients.find(
        (c) => c.id === form.clientId
      );

      const selectedProperty = properties.find(
        (p) => p.id === form.propertyId
      );

      const contractData: Contract = {
        ...form,
        value: Number(form.value),
        clientName: selectedClient?.name || "",
        propertyTitle: selectedProperty?.title || "",
      } as Contract;

      await onSubmit(contractData);

      toast.success(
        editingContract ? "Contrato atualizado" : "Contrato criado"
      );

      setForm({
        clientId: "",
        propertyId: "",
        value: 0,
        status: "active",
        startDate: "",
        endDate: "",
      });

      if (onFinish) onFinish();
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao salvar contrato");
    } finally {
      setLoading(false);
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

      <select
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      >
        <option value="">Selecione um cliente</option>

        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="propertyId"
        value={form.propertyId}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      >
        <option value="">Selecione um imóvel</option>

        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="value"
        value={form.value}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        placeholder="Valor"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
      >
        <option value="active">Ativo</option>
        <option value="finished">Finalizado</option>
        <option value="canceled">Cancelado</option>
      </select>

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-xl"
      >
        {loading
          ? "Salvando..."
          : editingContract
          ? "Atualizar contrato"
          : "Criar contrato"}
      </button>
    </form>
  );
}