import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p>
          Área protegida do sistema.
        </p>
      </main>
    </ProtectedRoute>
  );
}