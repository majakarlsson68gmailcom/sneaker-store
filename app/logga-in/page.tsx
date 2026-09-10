import type { Metadata } from 'next'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SignInForm } from '@/components/sign-in-form'

export const metadata: Metadata = {
  title: 'Logga in — Stride',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-lg border border-border p-8">
          <SignInForm callbackUrl={callbackUrl ?? '/konto'} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
