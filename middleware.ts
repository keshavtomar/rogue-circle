import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin-login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const authToken = req.cookies.get('authToken')?.value;

    console.log(process.env.Token);
    if (!authToken || authToken !== process.env.Token) {
      return NextResponse.redirect(new URL('/admin-login', req.url));
    }
  }

  return NextResponse.next();
}
