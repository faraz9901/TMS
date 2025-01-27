import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    // Checking if route is protected
    if (request.nextUrl.pathname.startsWith('/home')) {

        // Checking if user is logged in
        if (request.cookies.has('accessToken')) {
            return NextResponse.next()
        }

        // If not logged in, redirect to login
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

