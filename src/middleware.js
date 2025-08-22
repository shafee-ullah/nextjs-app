import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = [
  '/',
  '/login',
  '/register',
  '/products',
  '/products/[id]',
  '/api/auth/signin',
  '/api/auth/signup',
  '/_next',
  '/favicon.ico'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public paths and API routes
  if (
    publicPaths.some(path => 
      pathname === path || 
      pathname.startsWith(`${path}/`) ||
      pathname.startsWith('/api/auth/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/_vercel/')
    )
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Redirect to login if not authenticated
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
