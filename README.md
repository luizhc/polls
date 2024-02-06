# API Node.js WebSockets

## 🚧 Sobre

- Aplicação construida em [Node.js](https://nodejs.org/en)
- Para registro de enquetes (polls) em banco de dados [PostgreSQL](https://www.postgresql.org/)
- Utilizando [WebSockets](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API) para comunicação em tempo real

## 🛠️ Construção

- Gerar arquivo `package.json`: `npm init -y`

- Instalar Typescript e integração com Node: `npm i typescript @types/node -D`

- Criar tsconfig.json: `npx tsc --init`

- Configurar tsconfig.json conforme: https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping

- Criar estrutura `src > http > server.ts`

- Instalar conversor de código .ts pra .js e executar código com node: `npm i tsx -D`

- Criar em `package.json` script `"dev": "tsx watch src/http/server.ts"`

## 🎯 Fastify

- Criar serviços RESTFul
- Instalar: `npm i fastify`

## 🐳 Docker

- Criar/gerenciar imagens e containers
- Rodar no modo detach: `docker compose up -d`
- Listar containers: `docker ps`
- Ver logs do container: `docker logs <container_id>`

## 💾 Prisma

- Criar/gerenciar banco de dados
- Instalar: `npm i prisma -D`
- Configurar: `npx prisma init`
- Aplicar migração: `npx prisma migrate dev`
- Abrir studio: `npx prisma studio`

## 🔌 Hoppscotch

- Client para testar HTTP requests
- Acessar: https://hoppscotch.io/
- Configurar: configuração > extensões > selecionar chrome > marcar checkbox "use a extensão..."

## 🎬 Zod

- Implementar validação de dados
- Instalar: `npm i zod`
