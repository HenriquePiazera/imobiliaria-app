"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import { useSettings } from "@/hooks/useSettings";
import { mergeWithDefaults } from "@/utils/theme";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/clients", label: "Clientes" },
  { href: "/dashboard/properties", label: "Imóveis" },
  { href: "/dashboard/contracts", label: "Contratos" },
  { href: "/dashboard/settings", label: "Configurações" },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: settings } = useSettings();
  const theme = mergeWithDefaults(settings ?? undefined);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`sidebar-surface fixed top-0 left-0 z-50 h-screen w-64 transform p-6 transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            {theme.logoUrl ? (
              <img
                src={theme.logoUrl}
                alt={theme.companyName}
                className="mb-2 h-10 w-auto max-w-[180px] object-contain"
              />
            ) : null}
            <h2 className="text-xl font-bold">{theme.companyName}</h2>
            {theme.tagline ? (
              <p className="mt-1 text-xs opacity-80">{theme.tagline}</p>
            ) : null}
          </div>

          <button onClick={onClose} className="md:hidden">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-4 py-3 transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "color-mix(in srgb, var(--brand-accent) 35%, transparent)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
