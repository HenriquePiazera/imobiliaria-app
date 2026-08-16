import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <header className="space-y-4">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            ← Voltar ao início
          </Link>

          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Case study
          </p>

          <h1 className="text-4xl font-bold text-zinc-900">
            Imobiliária App — CRM imobiliário full-stack
          </h1>

          <p className="text-lg text-zinc-600">
            Sistema para imobiliárias gerenciarem clientes, imóveis e contratos
            com regras de negócio automatizadas, dados em tempo real e
            isolamento multi-usuário.
          </p>

          <div>
            <Link
              href="/register"
              className="inline-block rounded-xl bg-zinc-900 px-5 py-3 text-sm text-white"
            >
              Criar conta e testar
            </Link>
            <p className="mt-2 text-sm text-zinc-500">
              Cadastro gratuito — em segundos você entra no dashboard e pode
              popular dados de demonstração.
            </p>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Problema</h2>
          <p className="text-zinc-600">
            Imobiliárias pequenas e corretores autônomos costumam controlar
            clientes, imóveis e contratos em planilhas ou ferramentas
            desconectadas. Isso gera inconsistência — por exemplo, um imóvel
            aparecer como disponível mesmo com contrato ativo.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Solução</h2>
          <ul className="list-disc space-y-2 pl-5 text-zinc-600">
            <li>CRM com autenticação e dashboard em tempo real</li>
            <li>CRUD completo de clientes, imóveis e contratos</li>
            <li>Sincronização automática de status imóvel ↔ contrato</li>
            <li>Upload de fotos com Firebase Storage</li>
            <li>Exportação CSV e paginação nas listagens</li>
            <li>Dados demo com fotos reais para avaliação rápida</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Destaques técnicos</h2>

          <ul className="space-y-4 text-zinc-600">
            <li className="rounded-xl border p-4">
              <h3 className="font-semibold text-zinc-900">
                Next.js + Firebase
              </h3>
              <p className="mt-1">
                Stack moderna com autenticação, banco, storage e deploy prontos
                para produção — ideal para entregar valor rápido com qualidade
                profissional.
              </p>
            </li>

            <li className="rounded-xl border p-4">
              <h3 className="font-semibold text-zinc-900">
                Repository Pattern + React Query
              </h3>
              <p className="mt-1">
                Código organizado em camadas, com cache inteligente e
                atualização em tempo real nas telas principais.
              </p>
            </li>

            <li className="rounded-xl border p-4">
              <h3 className="font-semibold text-zinc-900">
                Transações nos contratos
              </h3>
              <p className="mt-1">
                Ao criar, editar ou excluir um contrato, o status do imóvel
                é atualizado de forma consistente e automática.
              </p>
            </li>

            <li className="rounded-xl border p-4">
              <h3 className="font-semibold text-zinc-900">
                Multi-usuário com isolamento de dados
              </h3>
              <p className="mt-1">
                Cada conta vê apenas seus próprios clientes, imóveis e
                contratos, com regras de segurança no Firestore.
              </p>
            </li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Stack</h2>
          <p className="text-zinc-600">
            Next.js 16 · React 19 · TypeScript · Firebase (Auth, Firestore,
            Storage) · TanStack Query · Tailwind CSS · Zod · React Hook Form ·
            Vitest · Vercel
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <ul className="grid gap-4 text-zinc-600 sm:grid-cols-2">
            <li className="rounded-xl border p-4">
              3 entidades de domínio integradas
            </li>
            <li className="rounded-xl border p-4">
              5+ regras de negócio automatizadas
            </li>
            <li className="rounded-xl border p-4">
              Deploy contínuo na Vercel
            </li>
            <li className="rounded-xl border p-4">
              Testes unitários nas regras críticas
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
