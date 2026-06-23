import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-up', '/sso-callback'])
const isAuthRoute = createRouteMatcher(['/', '/sign-up'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Redirect signed-in users away from the sign-in/sign-up pages
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/feed', req.url))
  }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
