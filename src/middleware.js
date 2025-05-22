import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin/:path*']);

export default clerkMiddleware((auth, request) => {

  if (isAdminRoute(request)) {

    if (!auth().userId) {
   
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/admin/:path*',
  ],
};