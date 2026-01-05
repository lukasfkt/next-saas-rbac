'use client'

import { AlertTriangle, Loader2, XOctagon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useFormState } from '@/hooks/use-form-state'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export function RevokeInviteButton({ inviteId }: RevokeInviteButtonProps) {
  const [{ message, success }, handleSubmit, isPending] = useFormState(
    revokeInviteAction.bind(null, inviteId),
  )

  return (
    <div className="space-y-2">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Revoke failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Button size="sm" variant="destructive" disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <XOctagon className="mr-2 size-4" />
          )}
          Revoke invite
        </Button>
      </form>
    </div>
  )
}
