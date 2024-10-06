import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin-login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const authToken = req.cookies.get('authToken')?.value;

    if (!authToken || authToken !== process.env.Token) {
      console.log('redirecting to admin login');
      return NextResponse.redirect(new URL('/admin-login', req.url));
    }
  }

  return NextResponse.next();
}
