# Guia Técnico — Imobiliária App

Documento para estudo, entrevistas técnicas e apresentação a clientes.

---

## 1. O que é este projeto?

CRM imobiliário full-stack que permite:

- Cadastrar **clientes** (leads, clientes ativos, inativos)
- Cadastrar **imóveis** com fotos
- Criar **contratos** de aluguel ou venda
- Visualizar **dashboard** com métricas e resumo financeiro em tempo real

**Demo:** https://imobiliaria-app-mu.vercel.app/

---

## 2. Stack e por que cada escolha

| Tecnologia | Papel | Por que usei |
|------------|-------|--------------|
| **Next.js 16** | Framework React, rotas, deploy | App Router, SSR/SSG onde faz sentido, deploy nativo na Vercel |
| **React 19** | UI | Ecossistema maduro, componentização |
| **TypeScript** | Tipagem | Menos bugs, melhor DX, credibilidade em entrevistas |
| **Firebase Auth** | Autenticação | E-mail/senha pronto, sem backend custom |
| **Firestore** | Banco NoSQL | Tempo real, escala automática, free tier generoso |
| **Firebase Storage** | Imagens | Integração nativa com Auth e Rules |
| **TanStack Query** | Estado servidor | Cache, mutations, sync com listeners Firestore |
| **Zod + RHF** | Formulários | Validação tipada e UX de forms |
| **Tailwind CSS** | Estilo | Produtividade, consistência visual |
| **Vitest** | Testes | Rápido, integrado ao TypeScript |
| **Vercel** | Deploy | CI/CD automático com GitHub |

---

## 3. Arquitetura em camadas

```
Página (UI)
    ↓ hooks (React Query)
Repository (acesso Firestore)
    ↓
Firebase (Auth, Firestore, Storage)
```

### Repository Pattern

Cada entidade tem um repository em `src/repositories/`:

- Encapsula queries e mutations
- Filtra por `ownerId` (multi-tenant)
- Expõe `subscribe()` para tempo real

**Por que?** Se amanhã trocar Firestore por API REST, muda só os repositories.

### React Query + listeners

```typescript
// Padrão usado em useClients, useProperties, useContracts
useEffect(() => {
  return repository.subscribe((data) => {
    queryClient.setQueryData(["clients", ownerId], data);
  });
}, [ownerId]);
```

**Trade-off:** Duas fontes de verdade potenciais (queryFn inicial + listener). Mitigado com `staleTime: Infinity` — o listener é a fonte após mount.

---

## 4. Modelo de dados

### Cliente (`clients`)
- `ownerId`, `name`, `email`, `phone`, `document`, `city`, `state`, `address`
- `status`: `lead` | `client` | `inactive`

### Imóvel (`properties`)
- `ownerId`, `title`, `type`, `purpose` (Venda/Aluguel), `price`, `city`, `district`
- `status`: Disponível | Alugado | Vendido
- `imageUrl`, `description`

### Contrato (`contracts`)
- `ownerId`, `clientId`, `propertyId`, `type` (rent/sale), `value`, `status`
- `startDate`, `endDate`, `clientName`, `propertyTitle` (denormalizados para listagem)

### Settings (`settings/{ownerId}`)
- Dados da imobiliária por usuário (white-label básico)

---

## 5. Regras de negócio (ponto forte do projeto)

Implementadas em `ContractRepository` + `src/utils/contract-rules.ts`:

1. **Um imóvel não pode ter dois contratos ativos**
2. **Contrato ativo de aluguel** → imóvel fica `Alugado`
3. **Contrato ativo de venda** → imóvel fica `Vendido`
4. **Contrato finalizado (aluguel)** → imóvel volta a `Disponível`
5. **Contrato cancelado** → imóvel volta a `Disponível`
6. **Exclusão de contrato** → imóvel volta a `Disponível`

### Transações Firestore

Create/update/delete usam `runTransaction` para garantir que contrato e imóvel mudem juntos.

**Como explicar ao recrutador:**
> "Evitei inconsistência eventual entre coleções sem Cloud Functions, usando transações atômicas no cliente — com Security Rules validando ownership."

---

## 6. Segurança multi-tenant

### Problema original
Todos os usuários viam todos os dados.

### Solução
- Campo `ownerId` em todo documento
- Queries filtradas: `where("ownerId", "==", uid)`
- **Firestore Rules** em `firebase/firestore.rules`
- **Storage Rules** em `firebase/storage.rules` — path `users/{uid}/...`

### Middleware Next.js
Cookie `auth-session` + `middleware.ts` redireciona rotas `/dashboard/*`.

**Trade-off:** Cookie é complementar à Auth Firebase (não substitui Rules). Protege UX; Rules protegem dados.

---

## 7. Fluxos principais

### Login
1. `loginUser()` → Firebase Auth
2. `AuthContext` detecta user → seta cookie
3. Redirect para `/dashboard`

### Criar contrato
1. `ContractForm` → escolhe cliente + imóvel disponível
2. `useCreateContract` → `ContractRepository.createContract`
3. Transação: valida duplicata → cria contrato → atualiza status do imóvel
4. Listener atualiza dashboard e listas

### Dados demo
1. Botão no dashboard → `SeedDemoService`
2. Cria clientes, imóveis (fotos Unsplash), contratos, settings
3. Contratos disparam sync de status via repository

---

## 8. Como explicar trade-offs em entrevista

### Firebase vs API Node + PostgreSQL
- **Pró Firebase:** velocidade, tempo real, menos infra
- **Contra:** queries complexas limitadas, regras no Rules DSL, vendor lock-in moderado
- **Quando migraria:** relatórios pesados, billing complexo, equipe grande com backend dedicado

### Client-side transactions vs Cloud Functions
- **Pró client:** sem custo extra, simplicidade
- **Contra:** lógica visível no bundle (mas Rules protegem)
- **Cloud Functions seriam melhor se:** regras ultra-sensíveis ou integrações server-side

### Denormalização (clientName, propertyTitle no contrato)
- **Pró:** listagens rápidas sem joins
- **Contra:** pode desatualizar se renomear cliente
- **Mitigação:** aceitável para CRM pequeno; em escala, trigger de sync

---

## 9. Testes

```bash
npm test        # Vitest — regras de contrato, paginação, formatCurrency
npm run lint
npm run build
```

Arquivos de teste:
- `src/utils/contract-rules.test.ts`
- `src/utils/paginate.test.ts`
- `src/utils/formatCurrency.test.ts`

---

## 10. Scripts úteis

```bash
npm run dev              # desenvolvimento
npm run build            # build produção
npm test                 # testes
npm run screenshots      # captura telas (ver abaixo)
```

### Capturar screenshots para portfólio

1. Suba o app: `npm run dev`
2. Configure no `.env.local`:
   ```
   SCREENSHOT_EMAIL=seu@email.com
   SCREENSHOT_PASSWORD=suasenha
   ```
3. Execute: `npm run screenshots`
4. Imagens em `docs/screenshots/`

---

## 11. Deploy e Firebase Rules

### Vercel
Push na `master` → deploy automático (se integração GitHub ativa).

Variáveis `NEXT_PUBLIC_FIREBASE_*` no painel Vercel.

### Publicar Security Rules

```bash
# Requer Firebase CLI instalado e login
firebase deploy --only firestore:rules,storage
```

---

## 12. Roteiro de pitch (2 minutos)

> "Desenvolvi um CRM imobiliário completo com Next.js e Firebase. O diferencial está nas regras de domínio: quando um contrato é criado ou alterado, o status do imóvel sincroniza automaticamente em transação atômica. Implementei multi-tenant com Security Rules, React Query com listeners em tempo real, exportação CSV, paginação e seed de demonstração com dados reais. Está em produção na Vercel, com testes nas regras críticas e CI no GitHub Actions."

---

## 13. Estrutura de pastas

```
src/
├── app/                    # Rotas Next.js
│   ├── dashboard/          # Área autenticada
│   ├── case-study/         # Página de case study
│   ├── login/ register/
├── components/             # UI por domínio
├── contexts/               # AuthContext
├── hooks/                  # React Query hooks
├── lib/                    # Firebase, helpers
├── providers/              # QueryProvider
├── repositories/           # Acesso Firestore
├── schemas/                # Zod
├── services/               # Seed, upload, auth
├── types/
└── utils/                  # Regras puras, formatação, CSV
firebase/                   # Security Rules
docs/                       # Screenshots, guias
scripts/                    # Automações
```

---

## 14. Próximos passos sugeridos

- [ ] Roles (admin / corretor) dentro da mesma imobiliária
- [ ] Testes E2E com Playwright no fluxo crítico
- [ ] Notificações de contratos a vencer
- [ ] Geração de PDF de contrato
- [ ] Migração de dados legados sem ownerId

---

📄 Use este guia junto com o [Case Study](/case-study) e o README do repositório.
