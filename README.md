<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

### 🎯 **Objetivo**

Criar uma API com NestJS e MongoDB para gerenciar uma **plataforma de cursos**, onde você poderá:

- Cadastrar usuários (com email único)
- Criar cursos compostos por módulos e aulas
- Matricular usuários nos cursos
- Buscar dados com filtros, paginação e agregações
- Simular um relacionamento entre coleções (joins via `$lookup`)
- Aplicar validações, índices e boas práticas

---

## 🧱 **Modelagem esperada**

### 👤 `User`

```tsx
{
  _id: ObjectId,
  name: string,
  active: boolean
  email: string (único),
  role: 'student' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### `Role`

```tsx
{
  _id: Object,
  name: string,
  description: string
}
```

### 📚 `Course`

```tsx
{
  _id: ObjectId,
  title: string,
  description: string,
  modules: [ObjectId], // referência a Module
  active: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 🧩 `Module`

```tsx
{
  _id: ObjectId,
  courseId: ObjectId,
  title: string,
  lessons: [ObjectId], // referência a Lesson
}
```

### 🎥 `Lesson`

```tsx
{
  _id: ObjectId,
  title: string,
  content: string,
  duration: number (minutos)
}
```

### 📝 `Enrollment`

```tsx
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  enrolledAt: Date
}
```

## 🔧 **Requisitos técnicos do desafio**

### ✅ CRUD completo com NestJS + Mongoose:

- Usuários
- Cursos
- Módulos e aulas
- Matrículas

### ✅ Funcionalidades obrigatórias:

- ✅ Criar usuários com email único
- ✅ Listar todos os cursos ativos com paginação (`limit + skip`)
- ✅ Buscar aulas de um módulo
- ✅ Buscar cursos com filtros (`active`, `title`)
- ✅ Matricular um usuário em um curso (via `Enrollment`)
- ✅ Exibir lista de alunos matriculados em um curso (usando `$lookup`)

---

## 🚀 Funcionalidades bônus (nível avançado)

### 🧠 Se quiser ir além:

- ✅ Criar índice composto: `userId + courseId` único em `Enrollment`
- ✅ Validar criação de `Enrollment` (usuário não pode se matricular 2x no mesmo curso)
- ✅ Endpoint para retornar todos os cursos que um usuário está matriculado
- ✅ Endpoint que retorna o número total de alunos por curso
- ✅ Endpoint que busca os cursos com mais alunos (ranking)

---

## ✅ Tecnologias esperadas

- NestJS com `@nestjs/mongoose`
- MongoDB local ou Docker
- Swagger para documentação
- Validação com `class-validator`
- Testes (pelo menos 1 unitário + 1 de integração)
- Uso de DTOs, services, controllers, módulos

---

## 📂 Estrutura de pastas sugerida

```bash
src/
│
├── users/
├── courses/
├── modules/
├── lessons/
├── enrollments/
└── common/
    └── schemas/
```

---

## 🧪 Testes esperados

- [ ]  ✅ Teste unitário de criação de curso
- [ ]  ✅ Teste de integração para rota de matrícula
- [ ]  ✅ Teste de rejeição ao tentar cadastrar email duplicado


## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
