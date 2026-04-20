import { createServerClient } from '@supabase/ssr' // Only Supabase stuff here
import { NextResponse, type NextRequest } from 'next/server' // Next.js stuff here

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  console.log("---------------- MIDDLEWARE DEBUG ----------------")
console.log("Current Path:", request.nextUrl.pathname)
console.log("User Email from Supabase:", user?.email)
console.log("Admin Email from ENV:", process.env.ADMIN_EMAIL)
console.log("--------------------------------------------------")

  // PROTECT ADMIN ROUTES
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 1. If not logged in at all
    if (!user) {
      console.log("DEBUG: No user found, redirecting to /login")
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If logged in but NOT the owner
    if (user.email !== process.env.ADMIN_EMAIL) {
      console.log("DEBUG: Email mismatch! Redirecting to home")
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}