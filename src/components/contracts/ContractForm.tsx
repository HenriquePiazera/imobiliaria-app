"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Contract } from "@/types/contract";
import { Client } from "@/types/client";
import { Property } from "@/types/property";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Props {
  onSubmit: (data: Contract) => Promise<void>;
  editingContract: Contract | null;
  onFinish?: () => void;
}

export function ContractForm({
  onSubmit,
  editingContract,
  onFinish,
}: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    propertyId: "",
    type: "rent" as Contract["type"],
    value: 0,
    status: "active" as Contract["status"],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function load() {
      const cSnap = await getDocs(collection(db, "clients"));
      const pSnap = await getDocs(collection(db, "properties"));

      setClients(
        cSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Client[]
      );

      setProperties(
        pSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Property[]
      );
    }

    load();
  }, []);

  useEffect(() => {
    if (!editingContract) return;

    setForm({
      clientId: editingContract.clientId,
      propertyId: editingContract.propertyId,
      type: editingContract.type,
      value: editingContract.value,
      status: editingContract.status,
      startDate: editingContract.startDate,
      endDate: editingContract.endDate || "",
    });
  }, [editingContract]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const client = clients.find((c) => c.id === form.clientId);
      const property = properties.find((p) => p.id === form.propertyId);

      await onSubmit({
        ...form,
        value: Number(form.value),
        clientName: client?.name,
        propertyTitle: property?.title,
      } as Contract);

      toast.success("Contrato salvo");

      setForm({
        clientId: "",
        propertyId: "",
        type: "rent",
        value: 0,
        status: "active",
        startDate: "",
        endDate: "",
      });

      onFinish?.();
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar contrato");
    } finally {
      setLoading(false);
    }
  }

  const available = properties.filter(
    (p) => p.status === "Disponível"
  );

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">
          {editingContract ? "Editar contrato" : "Novo contrato"}
        </h2>

        <select
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Cliente</option>
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
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Imóvel</option>
          {available.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="rent">Aluguel</option>
          <option value="sale">Venda</option>
        </select>

        <Input
          type="number"
          name="value"
          value={form.value}
          onChange={handleChange}
          placeholder="Valor"
        />

        <Input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <Button type="submit" loading={loading}>
          Salvar contrato
        </Button>
      </form>
    </Card>
  );
}