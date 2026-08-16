import Link from "next/link";

import {
  DemoVideoButtonWithIcon,
  DemoVideoSection,
} from "@/components/landing/DemoVideo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold text-zinc-900">Imobiliária App</p>

          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              Entrar
            </Link>
            <Link
              href="/login?mode=register"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 text-center">
        <p className="rounded-full border px-4 py-1 text-sm text-zinc-600">
          CRM imobiliário · Next.js + Firebase · Produção na Vercel
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl">
          Controle clientes, imóveis e contratos em um só lugar
        </h1>

        <p className="max-w-2xl text-lg text-zinc-500">
          Sistema completo com dashboard em tempo real, regras de negócio
          automatizadas, upload de fotos, exportação CSV, temas personalizáveis
          e isolamento de dados por usuário.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/login?mode=register"
            className="rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Criar conta grátis
          </Link>

          <DemoVideoButtonWithIcon className="rounded-xl border px-6 py-3 font-medium transition-colors hover:bg-zinc-50" />

          <Link
            href="/case-study"
            className="rounded-xl border px-6 py-3 font-medium transition-colors hover:bg-zinc-50"
          >
            Case study
          </Link>
        </div>

        <p className="text-sm text-zinc-500">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-zinc-900 hover:underline">
            Entrar no sistema
          </Link>
        </p>
      </section>

      <section className="border-t bg-zinc-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <article className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Regras de negócio reais</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Contratos sincronizam automaticamente o status do imóvel e impedem
              duplicidade de contratos ativos.
            </p>
          </article>

          <article className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Pronto para demonstração</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Botão de dados demo com clientes, imóveis com fotos reais,
              contratos e resumo financeiro.
            </p>
          </article>

          <article className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Arquitetura profissional</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Repositories, React Query, Security Rules, transações e testes
              automatizados.
            </p>
          </article>
        </div>
      </section>

      <DemoVideoSection />

      <section className="border-t py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-zinc-900">
            Pronto para começar?
          </h2>
          <p className="mt-3 text-zinc-500">
            Crie sua conta em segundos e explore o dashboard com dados de
            demonstração.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/login?mode=register"
              className="rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white"
            >
              Criar conta grátis
            </Link>
            <Link
              href="/login"
              className="rounded-xl border px-6 py-3 font-medium"
            >
              Entrar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
