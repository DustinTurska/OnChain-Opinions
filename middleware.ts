import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_ADDRESS = '0x829d9E61EFb24636Ec631446859CF5c5D210f919';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin')) {
    // We can't directly access the wallet address in middleware
    // So we'll let the page handle the authentication
    console.log("Middleware: Allowing access to admin page");
    return NextResponse.next();
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}