import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          Imobiliária App
        </h1>

        <Link href="/login">
          Ir para login
        </Link>
      </div>
    </main>
  );
}