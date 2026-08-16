import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
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

          <div className="flex flex-wrap gap-3">
            <Link
              href="https://imobiliaria-app-mu.vercel.app/"
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm text-white"
              target="_blank"
            >
              Ver demo ao vivo
            </Link>
            <Link
              href="/register"
              className="rounded-xl border px-5 py-3 text-sm"
            >
              Criar conta
            </Link>
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
          <h2 className="text-2xl font-semibold">Decisões técnicas</h2>

          <div className="space-y-6 text-zinc-600">
            <div>
              <h3 className="font-semibold text-zinc-900">
                Next.js + Firebase em vez de API própria
              </h3>
              <p>
                Reduz complexidade de infraestrutura para um MVP profissional.
                Auth, banco, storage e deploy ficam prontos. Trade-off: regras
                de segurança ficam no Firestore Rules, não em controllers
                Node.js.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900">
                Repository Pattern + React Query
              </h3>
              <p>
                Repositories encapsulam Firestore; hooks com React Query
                centralizam cache, mutations e listeners em tempo real.
                Trade-off: mais camadas, porém código previsível e testável.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900">
                Transações Firestore nos contratos
              </h3>
              <p>
                Criar/editar/excluir contrato atualiza o imóvel na mesma
                transação, evitando inconsistência parcial. Trade-off: queries
                compostas exigem índices no Firestore.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900">
                Multi-tenant por ownerId
              </h3>
              <p>
                Cada documento pertence a um usuário autenticado. Security
                Rules garantem isolamento no backend. Trade-off: dados legados
                sem ownerId precisam migração.
              </p>
            </div>
          </div>
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
          <h2 className="text-2xl font-semibold">Resultados mensuráveis</h2>
          <ul className="grid gap-4 sm:grid-cols-2 text-zinc-600">
            <li className="rounded-xl border p-4">3 entidades de domínio integradas</li>
            <li className="rounded-xl border p-4">5+ regras de negócio automatizadas</li>
            <li className="rounded-xl border p-4">Deploy contínuo na Vercel</li>
            <li className="rounded-xl border p-4">Testes unitários nas regras críticas</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
