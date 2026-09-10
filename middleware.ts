import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Skyddar /konto. Vi kontrollerar bara om en sessionscookie finns – själva
// sessionsvalideringen sker i /konto via auth() (Prisma kan inte köras i
// edge-runtime). Saknas cookien omdirigeras användaren till /logga-in.
export function middleware(request: NextRequest) {
  const hasSession =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token')

  if (!hasSession) {
    const url = new URL('/logga-in', request.url)
    url.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/konto/:path*'],
}
