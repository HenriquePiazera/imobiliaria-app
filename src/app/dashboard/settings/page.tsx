"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  getSettings,
  saveSettings,
} from "@/repositories/settings/settings.repository";

export default function SettingsPage() {
  const [loading, setLoading] =
    useState(true);

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [
    primaryColor,
    setPrimaryColor,
  ] = useState("#18181b");

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings =
          await getSettings();

        if (settings) {
          setCompanyName(
            settings.companyName
          );

          setEmail(
            settings.email
          );

          setPhone(
            settings.phone
          );

          setAddress(
            settings.address
          );

          setPrimaryColor(
            settings.primaryColor
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          "Erro ao carregar configurações"
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSave() {
    try {
      await saveSettings({
        companyName,
        email,
        phone,
        address,
        primaryColor,
      });

      toast.success(
        "Configurações salvas"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Erro ao salvar configurações"
      );
    }
  }

  if (loading) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          h-[60vh]
        "
      >
        <p>
          Carregando
          configurações...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Configurações
        </h1>

        <p
          className="
            text-zinc-500
          "
        >
          Gerencie as
          informações da
          imobiliária
        </p>
      </div>

      <div
        className="
          bg-white
          border
          rounded-2xl
          p-6
          shadow-sm
          space-y-6
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Nome da
              imobiliária
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Telefone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Endereço
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Cor principal
            </label>

            <input
              type="color"
              value={primaryColor}
              onChange={(e) =>
                setPrimaryColor(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                border
                rounded-xl
                p-1
              "
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="
              bg-zinc-900
              hover:bg-zinc-800
              transition-colors
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Salvar
            configurações
          </button>
        </div>
      </div>
    </div>
  );
}