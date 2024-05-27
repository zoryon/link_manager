import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  await updateSession(request)

  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  /******************************************************************************************************/
  /* 
    CASE: not logged in user try to access login page
    RESULT: continue
  */
  /******************************************************************************************************/
  if (request.nextUrl.pathname === '/login' && !data.user) {
    return NextResponse.next()
  }

  /******************************************************************************************************/
  /* 
    CASE: logged in user try to access login page
    RESULT: redirect to home
  */
  /******************************************************************************************************/
  if (request.nextUrl.pathname === '/login' && data.user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  /******************************************************************************************************/
  /* 
    CASE: not logged in user try to access the normal website
    RESULT: redirect to login
  */
  /******************************************************************************************************/
  if (!data.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  } 

  /******************************************************************************************************/
  /* 
    CASE: logged in user try to access the normal website
    RESULT: continue
  */
  /******************************************************************************************************/
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
    */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
