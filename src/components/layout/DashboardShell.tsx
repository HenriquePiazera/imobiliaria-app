"use client";

import {
  ReactNode,
  useState,
} from "react";

import { Sidebar } from "./Sidebar";

import { Header } from "./Header";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="flex-1 bg-zinc-100">
        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main
          className="
            p-4
            md:p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}