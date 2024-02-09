# API Node.js WebSockets

## 🚧 Sobre

- Aplicação construida em [Node.js](https://nodejs.org/en)
- Para registro de enquetes (polls) em banco de dados [PostgreSQL](https://www.postgresql.org/) e [Redis](https://redis.io)
- Utilizando [WebSockets](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API) para comunicação em tempo real

## 🛠️ Construção

- Gere arquivo `package.json`: `npm init -y`

- Instale [Typescript](https://www.typescriptlang.org/) e integração com Node: `npm i typescript @types/node -D`

- Crie `tsconfig.json`, instale o tsc: `npx tsc --init`

- Configure `tsconfig.json`, conforme [Node Target Mapping](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)

- Crie estrutura `src > http > server.ts`

- Instale [tsx](https://www.npmjs.com/package/tsx) que converte código `.ts` pra `.js`, e executa código com node: `npm i tsx -D`

- Crie em `package.json` o script `"dev": "tsx watch src/http/server.ts"`

## 🎯 [Fastify](https://fastify.dev/)

Cria serviços RESTFul

- Instale: `npm i fastify`
- Trabalhe com [cookie](https://github.com/fastify/fastify-cookie?tab=readme-ov-file#example): `npm i @fastify/cookie`
- Trabalhe com [websocket](https://github.com/fastify/fastify-websocket?tab=readme-ov-file#usage): `npm i @fastify/websocket`

## 🐳 [Docker](https://www.docker.com/)

Cria/gerencia imagens e containers

- Roda no modo detach: `docker compose up -d`
- Lista containers: `docker ps`
- Vê logs do container: `docker logs <container_id>`

## 💾 [Prisma](https://www.npmjs.com/package/prisma)

Cria/gerencia banco de dados

- Instale: `npm i prisma -D`
- Configure: `npx prisma init`
- Aplica migração: `npx prisma migrate dev`
- Abre studio: `npx prisma studio`

## 🔌 [Hoppscotch](https://hoppscotch.io/)

Client para testar requests HTTP, WS, etc

- Configura: configuração > extensões > selecionar chrome > marcar checkbox "use a extensão..."

## 🎬 [Zod](https://www.npmjs.com/package/zod)

Realiza validações de dados

- Instale: `npm i zod`

## 🔥 [Redis](https://www.npmjs.com/package/ioredis)

Banco de dados em memória (cache)

- Instale: `npm i ioredis` para manipular Redis dentro do Node
- Alguns comandos usados:
  - [ZINCRBY](https://redis.io/commands/zincrby/)
  - [ZRANGE](https://redis.io/commands/zrange/)
