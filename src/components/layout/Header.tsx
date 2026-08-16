"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/hooks/useSettings";
import { logoutUser } from "@/services/auth.service";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: settings } = useSettings();

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-zinc-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold md:text-xl">
            {settings?.companyName || "Imobiliária App"}
          </h1>
          <p className="hidden text-xs text-zinc-500 sm:block">Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">Usuário</p>
          <p className="text-xs text-zinc-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
