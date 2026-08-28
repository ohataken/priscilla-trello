import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isAuthorized } from '@/lib/basic-auth'

export function proxy(request: NextRequest) {
  const secret = process.env.APP_SECRET
  if (!secret) {
    return NextResponse.next()
  }

  if (isAuthorized(request.headers.get('authorization'), secret)) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="priscilla-trello"' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
