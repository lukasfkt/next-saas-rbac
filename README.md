# NextSaaS RBAC

In this project, we build a SaaS platform using **Next.js** with a focus on implementing **role-based (RBAC)** and **attribute-based (ABAC)** access control models.

## 🧱 Stack Overview

- **Frontend**: [Next.js 14](https://nextjs.org/) with **Server Components** and **Server Actions**
- **Backend**: [Node.js](https://nodejs.org/), [Fastify](https://fastify.dev/), [Prisma](https://www.prisma.io/)
- **Monorepo**: Managed using [TurboRepo](https://turbo.build/repo) to coordinate backend and frontend together

## 🚀 Goals

- Build a clean monorepo architecture for a full-stack application
- Implement fine-grained permissioning logic with **RBAC** and **ABAC**
- Optimize build and dev time using TurboRepo
- Adjust ESLint and Prettier settings to be compatible with **ESLint v9 Flat Config**

### Roles

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

### Permissions table

|                          | Administrator | Member | Billing | Anonymous |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Update organization      | ✅            | ❌     | ❌      | ❌        |
| Delete organization      | ✅            | ❌     | ❌      | ❌        |
| Invite a member          | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite         | ✅            | ❌     | ❌      | ❌        |
| List members             | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership       | ⚠️            | ❌     | ❌      | ❌        |
| Update member role       | ✅            | ❌     | ❌      | ❌        |
| Delete member            | ✅            | ⚠️     | ❌      | ❌        |
| List projects            | ✅            | ✅     | ✅      | ❌        |
| Create a new project     | ✅            | ✅     | ❌      | ❌        |
| Update a project         | ✅            | ⚠️     | ❌      | ❌        |
| Delete a project         | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details      | ✅            | ❌     | ✅      | ❌        |
| Export billing details   | ✅            | ❌     | ✅      | ❌        |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions

