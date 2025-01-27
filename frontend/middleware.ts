import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const PUBLIC_ROUTES = ["/", '/login', "/signup", "/activate-account"]

export function middleware(request: NextRequest) {

    // Checking if route is protected
    if (request.nextUrl.pathname.startsWith('/home')) {

        // Checking if user is logged in
        if (!request.cookies.has('accessToken')) {
            // if accesstoken not found redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }

    }

    // Checking if route is public
    if (PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {

        // If logged in, redirect to home
        if (request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/home', request.url))
        }

        // If not logged in, redirect to login
        if (request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/login', request.url))

    }
    return NextResponse.next()
}

