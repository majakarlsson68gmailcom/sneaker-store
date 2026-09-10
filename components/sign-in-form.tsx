'use client'

import { useActionState } from 'react'
import { MailCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { sendMagicLink, type SignInState } from '@/app/logga-in/actions'

const initialState: SignInState = { status: 'idle' }

export function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, isPending] = useActionState(
    sendMagicLink,
    initialState,
  )

  if (state.status === 'sent') {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <MailCheck size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight">
          Kolla din inkorg
        </h1>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          Vi har skickat en inloggningslänk till{' '}
          <span className="font-medium text-foreground">{state.email}</span>.
          Öppna länken i mejlet för att logga in. Den är giltig i 24 timmar.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Logga in</h1>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Ange din e-postadress så skickar vi en inloggningslänk. Inget lösenord
          behövs.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <label htmlFor="email" className="sr-only">
          E-postadress
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="du@exempel.se"
          className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />

        {state.status === 'error' && (
          <p role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-11 text-sm"
        >
          {isPending ? 'Skickar…' : 'Skicka inloggningslänk'}
        </Button>
      </form>
    </div>
  )
}
