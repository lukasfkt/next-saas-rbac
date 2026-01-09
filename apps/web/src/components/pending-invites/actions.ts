'use server'

import { revalidateTag } from 'next/cache'

import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'

export async function acceptInviteAction(inviteId: string) {
  try {
    await acceptInvite(inviteId)
  } catch (error) {
    console.log(error)
  }

  revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
  try {
    await rejectInvite(inviteId)
  } catch (error) {
    console.log(error)
  }
}
