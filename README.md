# 🏠 Imobiliária App

CRM imobiliário completo — cadastro de clientes, imóveis e contratos, com dashboard em tempo real e regras de negócio automatizadas. Desenvolvido com Next.js e Firebase.

## 🔗 Acesse a demo

**[imobiliaria-app-mu.vercel.app](https://imobiliaria-app-mu.vercel.app/)**

A aplicação é protegida por autenticação. Para explorar o dashboard:

1. Clique em **[Criar conta](https://imobiliaria-app-mu.vercel.app/register)**
2. Preencha qualquer e-mail e uma senha com 6+ caracteres (não há verificação de e-mail — o acesso é liberado na hora)
3. Você já entra direto no dashboard, com as telas de clientes, imóveis e contratos disponíveis

---

## O que esse projeto demonstra

- **Construção de um sistema completo do zero** — autenticação, 3 entidades de domínio (clientes, imóveis, contratos) com CRUD completo, busca, filtros e exclusão com confirmação.
- **Modelagem de regras de negócio reais**: ao criar, editar ou excluir um contrato, o status do imóvel relacionado é atualizado automaticamente (Disponível → Alugado/Vendido e vice-versa), e o sistema impede que um mesmo imóvel tenha dois contratos ativos ao mesmo tempo.
- **Dashboard com dados em tempo real**, usando listeners do Firestore — as métricas atualizam na tela sem precisar recarregar a página.
- **Upload de imagens** (fotos dos imóveis) integrado a um serviço de armazenamento em nuvem (Firebase Storage).
- **Validação de formulários** ponta a ponta com Zod + React Hook Form.
- **Organização de código em camadas** (separando acesso a dados, regras de negócio e interface), pensando em manutenção e escalabilidade do projeto a longo prazo.
- **Deploy em produção** na Vercel, com variáveis de ambiente configuradas corretamente.

## 🛠️ Stack

`Next.js` · `React` · `TypeScript` · `Firebase (Auth, Firestore, Storage)` · `Tailwind CSS` · `Zod` · `React Hook Form`

## 📸 Telas

> Adicione aqui 2-3 screenshots reais do projeto (dashboard, lista de imóveis e formulário de contrato funcionam bem). Veja a dica no final desta seção sobre como gerar e inserir.

```markdown
![Dashboard](./docs/dashboard.png)
![Imóveis](./docs/imoveis.png)
![Contratos](./docs/contratos.png)
```

<details>
<summary>Como adicionar os screenshots</summary>

1. Acesse a [demo](https://imobiliaria-app-mu.vercel.app/), crie uma conta e cadastre 2-3 registros de exemplo em cada tela (clientes, imóveis, contratos) para a interface não aparecer vazia.
2. Tire prints do dashboard e de pelo menos mais uma tela.
3. Crie uma pasta `docs/` na raiz do repositório e salve as imagens ali (ex: `docs/dashboard.png`).
4. Substitua o bloco de código acima por essas imagens no README — elas vão renderizar automaticamente no GitHub.

</details>

---

<details>
<summary><strong>📐 Detalhes técnicos (arquitetura, regras de negócio e como rodar localmente)</strong></summary>

### Arquitetura

O projeto segue uma separação em camadas inspirada no **Repository Pattern**, isolando o acesso ao Firebase do restante da aplicação:

```
src/
├── app/                 # Rotas (App Router): login, register, dashboard/*
├── components/          # Componentes de UI organizados por domínio
│   ├── auth/            # Proteção de rotas
│   ├── clients/         # Formulário, lista, cards e filtros de clientes
│   ├── contracts/       # Formulário, lista e cards de contratos
│   ├── dashboard/       # Cards de métricas e resumo financeiro
│   ├── layout/          # Shell do dashboard, sidebar, header
│   ├── properties/      # Formulário, lista, cards e upload de imagem
│   └── ui/              # Componentes base (Button, Input, Modal, etc.)
├── contexts/            # AuthContext (estado global de autenticação)
├── lib/                 # Inicialização do Firebase (App, Auth, Firestore, Storage)
├── repositories/        # Acesso direto ao Firestore (1 classe por entidade)
├── schemas/             # Validação de formulários com Zod
├── services/            # Regras de orquestração (dashboard, upload, auth)
├── types/               # Tipos de domínio (Client, Property, Contract, Settings...)
└── utils/               # Helpers (formatação de moeda, etc.)
```

**Fluxo de dados:** `Página (Client Component)` → `Repository` → `Firestore`. Os repositórios encapsulam toda query, mutação e regra de consistência, enquanto as páginas cuidam apenas de estado de UI e orquestração de chamadas.

### Regras de negócio (`ContractRepository`)

- Ao **criar** um contrato, o sistema impede que um imóvel tenha dois contratos `active` simultâneos.
- Ao **criar, editar ou excluir** um contrato, o **status do imóvel é sincronizado automaticamente**:
  - contrato de aluguel ativo → imóvel fica `Alugado`
  - contrato finalizado → imóvel volta a ficar `Disponível`
  - venda ativa → imóvel fica `Vendido`

Essa sincronização evita inconsistência entre as coleções `contracts` e `properties` sem depender de Cloud Functions.

### Como rodar localmente

**Pré-requisitos:** Node.js 18+ e um projeto Firebase com Authentication (e-mail/senha), Firestore e Storage habilitados.

```bash
npm install
```

Crie um arquivo `.env.local` na raiz com as credenciais do seu projeto Firebase:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run start    # servir build de produção
npm run lint     # checagem de lint
```

### Próximos passos

- [ ] Firestore Security Rules versionadas no repositório
- [ ] Testes automatizados (unitários para repositories/services, E2E para os fluxos de CRUD)
- [ ] Paginação nas listagens
- [ ] Arquivo `.env.example`

</details>

---

📄 Projeto pessoal desenvolvido para fins de estudo e portfólio.
