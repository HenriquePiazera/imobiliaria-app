"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useClients } from "@/hooks/useClients";
import { useProperties } from "@/hooks/useProperties";
import { Contract } from "@/types/contract";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  onSubmit: (data: Contract) => Promise<void>;
  editingContract: Contract | null;
  onFinish?: () => void;
};

const emptyForm = {
  clientId: "",
  propertyId: "",
  type: "rent" as Contract["type"],
  value: 0,
  status: "active" as Contract["status"],
  startDate: "",
  endDate: "",
};

function buildFormState(editingContract: Contract | null) {
  if (!editingContract) return emptyForm;

  return {
    clientId: editingContract.clientId,
    propertyId: editingContract.propertyId,
    type: editingContract.type,
    value: editingContract.value,
    status: editingContract.status,
    startDate: editingContract.startDate,
    endDate: editingContract.endDate || "",
  };
}

export function ContractForm({
  onSubmit,
  editingContract,
  onFinish,
}: Props) {
  const { data: clients = [] } = useClients();
  const { data: properties = [] } = useProperties();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(() => buildFormState(editingContract));

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

      if (!client || !property) {
        toast.error("Cliente ou imóvel inválido");
        return;
      }

      const payload: Contract = {
        id: editingContract?.id ?? "",
        ownerId: editingContract?.ownerId ?? "",
        clientId: form.clientId,
        propertyId: form.propertyId,
        clientName: client.name,
        propertyTitle: property.title,
        type: form.type,
        value: Number(form.value),
        status: form.status,
        startDate: form.startDate,
        endDate: form.endDate,
        createdAt: editingContract?.createdAt ?? new Date().toISOString(),
      };

      await onSubmit(payload);

      if (!editingContract) {
        setForm(emptyForm);
      }

      onFinish?.();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao salvar contrato"
      );
    } finally {
      setLoading(false);
    }
  }

  const available = properties.filter(
    (property) =>
      property.status === "Disponível" ||
      property.id === editingContract?.propertyId
  );

  return (
    <Card>
      <form
        key={editingContract?.id ?? "new-contract"}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingContract ? "Editar contrato" : "Novo contrato"}
        </h2>

        <select
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        >
          <option value="">Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <select
          name="propertyId"
          value={form.propertyId}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        >
          <option value="">Imóvel</option>
          {available.map((property) => (
            <option key={property.id} value={property.id}>
              {property.title}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="rent">Aluguel</option>
          <option value="sale">Venda</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="active">Ativo</option>
          <option value="finished">Finalizado</option>
          <option value="canceled">Cancelado</option>
        </select>

        <Input
          type="number"
          name="value"
          placeholder="Valor"
          value={form.value}
          onChange={handleChange}
          required
        />

        <Input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
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
