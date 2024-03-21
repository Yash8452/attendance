// pages/api/middleware/checkRole.js
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/auth";

    const token = request.cookies.get(".Tunnels.Relay.WebForwarding.Cookies")?.value || "";
    // console.log(token);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/auth", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/auth"],
};