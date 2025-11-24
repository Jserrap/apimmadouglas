# MMA Manager

**Gerenciador de Eventos MMA** — frontend (React + Vite + Tailwind) + backend (Node/Express + Prisma + PostgreSQL).

Este README é um manual completo para desenvolver localmente, testar a API, resolver os erros mais comuns e fazer deploy.

---

## Índice
- [Visão geral](#visão-geral)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução local (passo a passo)](#instalação-e-execução-local-passo-a-passo)
  - Backend
  - Frontend
- [Variáveis de ambiente (exemplo)](#variáveis-de-ambiente-exemplo)
- [Prisma / Banco de dados](#prisma--banco-de-dados)
- [API — endpoints principais](#api---endpoints-principais)
- [Swagger / Documentação](#swagger--documentação)
- [Como testar (curl / Postman)](#como-testar-curl--postman)
- [Erros comuns & soluções rápidas](#erros-comuns--soluções-rápidas)
- [Boas práticas e próximas melhorias](#boas-práticas-e-próximas-melhorias)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Assets (logo/test images)](#assets-logo-test-images)

---

## Visão geral
Este projeto fornece:
- backend com rotas REST para `cards`, `lutas` e `lutadores` (ex.: `/api/cards`, `/api/lutas`, `/api/lutadores`);
- frontend React (Vite) com layout dark, sidebar fixa e pages para `Home`, `Cards`, `Lutas`, `Lutadores`;
- integração com Prisma para Postgres;
- documentação Swagger disponível em `/api-docs` no backend.

---

## Estrutura do repositório
Estrutura sugerida usada neste projeto:

```
/ (repo root)
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ services/
│  │  ├─ routes/
│  │  ├─ prisma.ts
│  │  ├─ app.ts
│  │  └─ server.ts
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ package.json
│  └─ .env.example
├─ front/   (ou frontend/)
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  └─ lib/api.ts
│  ├─ public/
│  ├─ package.json
│  └─ vite.config.ts
├─ README.md
```

---

## Pré-requisitos
- Node.js (v18+ recomendado)
- npm ou yarn
- PostgreSQL (local ou remoto)
- Git
- Opcional: Docker (se preferir rodar Postgres em container)

---

## Instalação e execução local (passo a passo)

> Trabalhe na raiz do repositório (onde estão as pastas `backend` e `front`).

### Backend

1. Abra um terminal na pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure variáveis de ambiente:
   - copie `.env.example` para `.env` e ajuste conforme seu ambiente (ex.: `DATABASE_URL`, `PORT`, `FRONT_ORIGIN`).

4. Gere/atualize Prisma client e execute migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Rodar servidor em dev:
   ```bash
   npm run dev
   # ou
   # npm run start:dev
   ```
   O servidor, por padrão, roda em `http://localhost:3000` (verifique `server.ts`).

---

### Frontend

1. Abra outro terminal na pasta `front`:
   ```bash
   cd front
   ```

2. Instale dependências:
   ```bash
   npm install
   ```

3. Ajuste variáveis (opcional): se usar Vite, edite `vite.config` ou `src/lib/api.ts` para apontar para o backend (`VITE_API_URL`).

4. Rodar dev server:
   ```bash
   npm run dev
   ```
   Acesse o front em `http://localhost:5173` (ou porta configurada).

---

## Variáveis de ambiente (exemplo)
Crie `backend/.env` com algo do tipo:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/mma_db?schema=public"
PORT=3000
FRONT_ORIGIN=http://localhost:5173
```

No frontend (`front/.env`):

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE="MMA Manager"
```

> **IMPORTANTE:** não commit .env com credenciais reais. Adicione `.env` em `.gitignore`.

---

## Prisma / Banco de dados
- O `schema.prisma` define `Lutador`, `Luta`, `Card` e relacionamentos.  
- Comandos úteis:
  - `npx prisma generate` — gera o client Prisma.
  - `npx prisma migrate dev --name <nome>` — cria/atualiza migrações e aplica no banco.
  - `npx prisma db seed` — (se tiver script de seed) popula dados iniciais.
  - `npx prisma studio` — abre UI para inspecionar dados.

Se o Prisma reclamar `Can't reach database server at localhost:5433` (P1000), verifique:
- se o Postgres está rodando;
- se `DATABASE_URL` aponta para a porta correta;
- se firewall local ou container impede conexão.

Se o Prisma reclamar `Authentication failed`:
- confirme usuário/senha no `DATABASE_URL`.

---

## API — endpoints principais

> O backend expõe rota base: `/api`.

Exemplos principais (assumindo `http://localhost:3000`):

- `GET /api/cards` — lista todos os cards  
- `GET /api/cards/:id` — obter card por id  
- `POST /api/cards` — criar card  
- `PUT /api/cards/:id` — atualizar card  
- `DELETE /api/cards/:id` — deletar card

- `GET /api/lutas` — lista lutas  
- `POST /api/lutas` — criar luta (ver nota sobre FK abaixo)  
- `GET /api/lutas/:id` — obter luta

- `GET /api/lutadores` — lista lutadores  
- `POST /api/lutadores` — criar lutador  
- `PUT /api/lutadores/:id` — atualizar lutador  
- `DELETE /api/lutadores/:id` — deletar lutador

---

### Observação importante (FK / criar luta)
Ao criar uma `Luta` que referencia `Lutador` (ex.: `lutadorAId` e `lutadorBId`), **os ids devem existir no banco**. Se enviar um id inexistente, o banco (Prisma/Postgres) retornará erro de foreign key (P2003). Veja exemplo de payload:

```json
{
  "lutadorAId": 1,
  "lutadorBId": 2,
  "peso": "Peso Médio",
  "rounds": 5,
  "data": "2025-11-15T00:00:00.000Z",
  "local": "T-Mobile Arena"
}
```

O backend idealmente valida se os lutadores existem antes de tentar criar a `Luta`. Se não existir validação, você verá erro 500 / P2003 no servidor — implemente validação para retornar 400 com mensagem clara.

---

## Swagger / Documentação
- A documentação Swagger UI está exposta em:
  ```
  http://localhost:3000/api-docs
  ```

Lá você pode testar endpoints (POST/GET) diretamente no navegador.

---

## Como testar (curl / Postman)

Ex.: listar cards
```bash
curl http://localhost:3000/api/cards
```

Ex.: criar lutador
```bash
curl -X POST http://localhost:3000/api/lutadores \
  -H "Content-Type: application/json" \
  -d '{"nome":"Conor McGregor","apelido":"The Notorious","pais":"Irlanda"}'
```

Ex.: criar luta (atenção às FK)
```bash
curl -X POST http://localhost:3000/api/lutas \
  -H "Content-Type: application/json" \
  -d '{"lutadorAId":1,"lutadorBId":2,"peso":"Peso Leve","rounds":3}'
```

---

## Erros comuns & soluções rápidas

### 1. `PrismaClientInitializationError: Can't reach database server`
- Verifique `DATABASE_URL` e se Postgres está rodando.
- Cheque porta (5432 vs 5433).
- Teste com `psql` ou `pgadmin`.

### 2. `PrismaClientKnownRequestError: P2003` (foreign key violated)
- Significa que você tentou `create()` ligando a FK a um id que não existe.
- Solução: validar existência dos `lutadorAId`/`lutadorBId` antes de criar a `Luta`.
- Alternativa (se fizer sentido) usar `connectOrCreate` para criar lutadores automaticamente.

### 3. Erro de CORS no front (`No 'Access-Control-Allow-Origin' header`)
- Backend precisa executar `app.use(cors(...))` **antes** das rotas:
  ```ts
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  ```
- Em dev, alternativa rápida: configurar proxy no Vite (`vite.config.ts`) para `/api` → `http://localhost:3000`.

### 4. Erro React Router: `You cannot render a <Router> inside another <Router>`
- Só tenha **um** `<BrowserRouter>` no app. Coloque-o em `main.tsx` ou `App.tsx`, **não nos dois**.

### 5. `TypeError: Missing parameter name at index 1: *` (path-to-regexp)
- Evite `app.options('*', ...)` com `'*'` literal em algumas versões do Express — prefira middleware global `app.use(cors(...))` e um handler `if (req.method === 'OPTIONS') res.sendStatus(204)`.

---

## Boas práticas e próximas melhorias
- Estruturar tipos TypeScript em `/src/types`.
- Mover lógica de fetch para `services/hooks` (ex.: `useLutas`, `useCards`).
- Implementar autenticação (JWT + rotas protegidas).
- Implementar modais para criar/editar lutadores e lutas (melhora UX).
- Adicionar testes unitários / de integração (Jest / Supertest).
- Paginação e filtros nas rotas que retornam listas.
- Monitoramento e logs (Sentry / Logflare) no backend.

---

## Contribuição
1. Fork este repositório.
2. Crie branch `feature/<nome>` e faça commits claros.
3. Abra PR descrevendo a mudança.
4. Código limpo, comentários e testes sempre que possível.

---

## Licença
Licença MIT — veja o arquivo `LICENSE` incluído no repositório.

---

## Assets / logo / imagens de teste
Durante o desenvolvimento usamos imagens locais como exemplo. **Não** use caminhos como `/mnt/data/...` em produção — coloque arquivos estáticos dentro de `front/public/` e referencie por `/nome-da-imagem.png`.

Uma imagem usada durante o desenvolvimento (referência local do ambiente):  
`./frontend/public/lutador.jpg`

---
