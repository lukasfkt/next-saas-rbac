import { organizationSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../../lib/prisma'
import { getUserPermissions } from '../../../utils/get-user-permissions'
import { UnauthorizedError } from '../../_errors/unauthorized-error'
import { auth } from '../../middlewares/auth'

export async function shutDownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Shutdown organization',
          security: [
            {
              bearerAuth: [],
            },
          ],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to update this organization.',
          )
        }

        await prisma.$transaction([
          prisma.member.deleteMany({
            where: {
              organizationId: organization.id,
            },
          }),
          prisma.organization.delete({
            where: {
              id: organization.id,
            },
          }),
        ])
        return reply.status(204).send()
      },
    )
}
