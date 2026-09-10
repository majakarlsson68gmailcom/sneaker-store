import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'

import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  trustHost: true,
  pages: {
    signIn: '/logga-in',
  },
  providers: [
    Resend({
      // Auth.js läser AUTH_RESEND_KEY som standard; vi använder RESEND_API_KEY.
      apiKey: process.env.RESEND_API_KEY,
      // Avsändare. Byt till en verifierad domän i Resend för produktion.
      from: 'Stride <onboarding@resend.dev>',
    }),
  ],
})
