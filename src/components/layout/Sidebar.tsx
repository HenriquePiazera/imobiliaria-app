"use client";

import Link from "next/link";

import { X } from "lucide-react";

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

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-zinc-900
          text-white
          p-6
          transform
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
          md:static
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >
          <h2 className="text-2xl font-bold">
            Imobiliária App
          </h2>

          <button
            onClick={onClose}
            className="md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  rounded-lg
                  px-4
                  py-3
                  transition-colors

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
    </>
  );
}