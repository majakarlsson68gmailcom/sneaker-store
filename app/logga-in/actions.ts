'use server'

import { signIn } from '@/auth'

export type SignInState =
  | { status: 'idle' }
  | { status: 'sent'; email: string }
  | { status: 'error'; message: string }

export async function sendMagicLink(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Ange en giltig e-postadress.' }
  }

  const callbackUrl = String(formData.get('callbackUrl') ?? '/konto')

  try {
    // redirect: false gör att vi kan visa en bekräftelsevy istället för att
    // skickas vidare till Auth.js standardsida.
    await signIn('resend', { email, redirectTo: callbackUrl, redirect: false })
    return { status: 'sent', email }
  } catch (error) {
    console.error('[v0] Kunde inte skicka inloggningslänk:', error)
    return {
      status: 'error',
      message: 'Kunde inte skicka länken just nu. Försök igen.',
    }
  }
}
