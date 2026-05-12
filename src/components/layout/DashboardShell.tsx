"use client";

import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-zinc-100">
        <Header />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}