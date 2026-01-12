# Next SaaS RBAC

This project is a complete SaaS application using modern technologies with a focus on permission management.

## 🔧 Technologies Used

- **Frontend**: Next.js 14 with App Router, Server Components, and Server Actions
- **Backend**: Node.js with Fastify and Prisma
- **Monorepo management**: TurboRepo
- **Package manager**: pnpm

## 🚀 Goals

- Build a clean monorepo architecture for a full-stack application
- Implement fine-grained permissioning logic with **RBAC** and **ABAC**
- Optimize build and dev time using TurboRepo

## 👨‍💼 Roles

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

## 📋 Permissions table

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

