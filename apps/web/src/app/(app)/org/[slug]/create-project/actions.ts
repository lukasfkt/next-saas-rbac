'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const createProjectSchema = z.object({
  name: z.string().min(4, {
    message: 'Project name must have at least 4 characters',
  }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const org = await getCurrentOrg()

  if (!org) {
    return {
      success: false,
      message: 'Organization not found',
      errors: null,
    }
  }

  const result = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await createProject({
      org,
      name,
      description,
    })

    return {
      success: true,
      message: 'Project created successfully',
      errors: null,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }
}
