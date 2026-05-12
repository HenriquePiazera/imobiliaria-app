"use client";

import { useRouter } from "next/navigation";

import { logoutUser } from "@/services/auth.service";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();

    router.push("/login");
  }

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

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
        "
      >
        Sair
      </button>
    </header>
  );
}