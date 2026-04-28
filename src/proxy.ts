import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}