# Next SaaS RBAC

This project is part of the **Rocketseat course**, where we build a complete SaaS application using modern technologies with a focus on permission management.

## 🚀 What we are building

In this project, we are creating a SaaS platform using **Next.js 14**, applying important concepts like **RBAC (Role-Based Access Control)** and **ABAC (Attribute-Based Access Control)**.

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

