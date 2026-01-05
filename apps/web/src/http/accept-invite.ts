import { api } from './api-client'

export async function acceptInvite(inviteId: string) {
  try {
    await api.post(`invites/${inviteId}/accept`)
  } catch {}
}
