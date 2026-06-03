"use client";

import {
  useEffect,
  useState,
} from "react";

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
  editingContract:
    | Contract
    | null;

  onFinish: () => void;
}

export function ContractForm({
  editingContract,
  onFinish,
}: ContractFormProps) {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      clientId: "",

      propertyId: "",

      value: 0,

      status:
        "active" as Contract["status"],

      startDate: "",

      endDate: "",
    });

  useEffect(() => {
    async function loadData() {
      const clientsSnap =
        await getDocs(
          collection(
            db,
            "clients"
          )
        );

      const propertiesSnap =
        await getDocs(
          collection(
            db,
            "properties"
          )
        );

      setClients(
        clientsSnap.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Client[]
      );

      setProperties(
        propertiesSnap.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Property[]
      );
    }

    loadData();
  }, []);

  useEffect(() => {
    if (editingContract) {
      setForm({
        clientId:
          editingContract.clientId,

        propertyId:
          editingContract.propertyId,

        value:
          editingContract.value,

        status:
          editingContract.status,

        startDate:
          editingContract.startDate,

        endDate:
          editingContract.endDate ||
          "",
      });
    }
  }, [editingContract]);

  function handleChange(
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  }

  async function updatePropertyStatus() {
    if (!form.propertyId) return;

    const propertyStatus =
      form.status === "active"
        ? "Alugado"
        : "Disponível";

    await updateDoc(
      doc(
        db,
        "properties",
        form.propertyId
      ),
      {
        status: propertyStatus,
      }
    );
  }

  async function validatePropertyAvailability() {
    if (editingContract)
      return true;

    const contractsSnap =
      await getDocs(
        collection(
          db,
          "contracts"
        )
      );

    const activeContract =
      contractsSnap.docs.find(
        (doc) => {
          const data =
            doc.data() as Contract;

          return (
            data.propertyId ===
              form.propertyId &&
            data.status ===
              "active"
          );
        }
      );

    if (activeContract) {
      toast.error(
        "Este imóvel já possui um contrato ativo."
      );

      return false;
    }

    return true;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const isAvailable =
        await validatePropertyAvailability();

      if (!isAvailable) {
        return;
      }

      const selectedClient =
        clients.find(
          (client) =>
            client.id ===
            form.clientId
        );

      const selectedProperty =
        properties.find(
          (property) =>
            property.id ===
            form.propertyId
        );

      const contractData = {
        ...form,

        value: Number(
          form.value
        ),

        clientName:
          selectedClient?.name || "",

        propertyTitle:
          selectedProperty?.title ||
          "",
      };

      if (editingContract) {
        await updateDoc(
          doc(
            db,
            "contracts",
            editingContract.id
          ),
          contractData
        );

        await updatePropertyStatus();

        toast.success(
          "Contrato atualizado"
        );
      } else {
        await addDoc(
          collection(
            db,
            "contracts"
          ),
          {
            ...contractData,

            createdAt:
              new Date().toISOString(),
          }
        );

        await updatePropertyStatus();

        toast.success(
          "Contrato criado"
        );
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
      console.error(
        "Erro ao salvar contrato:",
        error
      );

      toast.error(
        "Erro ao salvar contrato"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
      onSubmit={handleSubmit}
    >
      <h2
        className="
          text-lg
          font-semibold
        "
      >
        {editingContract
          ? "Editar contrato"
          : "Novo contrato"}
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Cliente
        </label>

        <select
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          disabled={
            !!editingContract
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            disabled:bg-zinc-100
            disabled:cursor-not-allowed
          "
          required
        >
          <option value="">
            Selecione um cliente
          </option>

          {clients.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Imóvel
        </label>

        <select
          name="propertyId"
          value={form.propertyId}
          onChange={handleChange}
          disabled={
            !!editingContract
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            disabled:bg-zinc-100
            disabled:cursor-not-allowed
          "
          required
        >
          <option value="">
            Selecione um imóvel
          </option>

          {properties
            .filter(
              (p) =>
                p.status ===
                  "Disponível" ||
                p.id ===
                  form.propertyId
            )
            .map((p) => (
              <option
                key={p.id}
                value={p.id}
              >
                {p.title}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Valor do aluguel
        </label>

        <input
          type="number"
          name="value"
          value={form.value}
          onChange={handleChange}
          placeholder="Ex.: 2500"
          className="
            w-full
            border
            p-3
            rounded-xl
          "
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        >
          <option value="active">
            Ativo
          </option>

          <option value="finished">
            Finalizado
          </option>

          <option value="canceled">
            Cancelado
          </option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Data de entrada
        </label>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-xl
          "
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Data de encerramento
        </label>

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          bg-black
          hover:bg-zinc-800
          transition-colors
          text-white
          px-4
          py-3
          rounded-xl
          w-full
        "
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