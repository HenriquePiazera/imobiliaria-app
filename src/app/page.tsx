import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        gap-6
      "
    >
      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Imobiliária App
      </h1>

      <p className="text-zinc-500">
        CRM imobiliário desenvolvido com
        Next.js + Firebase
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="
            rounded
            bg-black
            px-6
            py-3
            text-white
          "
        >
          Login
        </Link>

        <Link
          href="/register"
          className="
            rounded
            border
            px-6
            py-3
          "
        >
          Criar conta
        </Link>
      </div>
    </main>
  );
}