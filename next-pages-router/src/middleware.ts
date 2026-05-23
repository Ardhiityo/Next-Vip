import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isLogin = true;

    if (isLogin) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/auth/login', request.url))
}

// path yang ingin menggunakan middleware
export const config = {
    matcher: ['/products', '/about']
}