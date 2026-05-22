"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/dashboard/clients",
    label: "Clientes",
  },
  {
    href: "/dashboard/properties",
    label: "Imóveis",
  },
  {
    href: "/dashboard/contracts",
    label: "Contratos",
  },
  {
    href: "/dashboard/settings",
    label: "Configurações",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Imobiliária App
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                rounded-lg px-4 py-3 transition-colors
                ${
                  isActive
                    ? "bg-zinc-700"
                    : "hover:bg-zinc-800"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}