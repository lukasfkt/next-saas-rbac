import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../../lib/prisma'
import { createSlug } from '../../../utils/create-slug'
import { getUserPermissions } from '../../../utils/get-user-permissions'
import { UnauthorizedError } from '../../_errors/unauthorized-error'
import { auth } from '../../middlewares/auth'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project',
          security: [
            {
              bearerAuth: [],
            },
          ],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError('You are not allowed to create a project')
        }

        const { name, description } = request.body

        const project = await prisma.project.create({
          data: {
            name,
            description,
            ownerId: userId,
            organizationId: organization.id,
            slug: createSlug(name),
          },
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      },
    )
}
