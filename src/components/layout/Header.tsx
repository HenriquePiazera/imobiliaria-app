"use client";

import { Menu } from "lucide-react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import { logoutUser } from "@/services/auth.service";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({
  onMenuClick,
}: HeaderProps) {
  const router = useRouter();

  const { user } = useAuth();

  async function handleLogout() {
    await logoutUser();

    router.push("/login");
  }

  return (
    <header
      className="
        h-16
        border-b
        bg-white
        flex
        items-center
        justify-between
        px-4
        md:px-6
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-zinc-100
          "
        >
          <Menu size={22} />
        </button>

        <h1
          className="
            text-lg
            md:text-xl
            font-semibold
          "
        >
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium">
            Usuário
          </p>

          <p className="text-xs text-zinc-500">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            transition-colors
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
          "
        >
          Sair
        </button>
      </div>
    </header>
  );
}