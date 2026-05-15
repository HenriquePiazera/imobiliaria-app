"use client";

import { ReactNode } from "react";

import { ProtectedRoute }
from "@/components/auth/ProtectedRoute";

import { DashboardShell }
from "@/components/layout/DashboardShell";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <DashboardShell>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}