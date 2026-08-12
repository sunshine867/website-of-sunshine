import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value || 
                request.cookies.get('accessToken')?.value;
  
  // Check if user has token in localStorage (client-side only)
  // For middleware, we check cookies or authorization header
  
  // Public routes - no auth required
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/callback',
    '/about',
    '/services',
    '/countries',
    '/universities',
    '/blog',
    '/gallery',
    '/events',
    '/faq',
    '/success-stories',
    '/careers',
    '/news',
    '/notices',
    '/apply',
    '/contact',
    '/terms',
    '/privacy',
    '/courses',
   '/free-exam',    // Both singular
    '/free-exams',   // and plural
  ];

  // Check if current path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );

  // Allow API routes, static files, etc.
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/static') ||
      pathname.includes('.') ||
      pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  // If it's a public path, allow access
  if (isPublicPath) {
    // If user is already logged in and trying to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes (dashboard, admin, etc.)
  if (!token) {
    // No token found, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow access to protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};