import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import AuthConfigs from "#app/_libs/auths/auth.config.ts";
import {
    CookieName,
    getRequestLocale,
} from "#app/_libs/locales/getRequestLocale.ts";
import linguiConfig from "#app/_libs/locales/lingui.config.ts";

export const _auth = NextAuth(AuthConfigs);

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const middleware: unknown = _auth.auth((request) => {
    const { pathname } = request.nextUrl;

    let locale = linguiConfig.locales.find(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (locale) {
        const response = NextResponse.next();
        response.cookies.set(CookieName, locale);
        return response;
    }

    // Redirect if there is no locale
    locale = getRequestLocale(request.headers);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl, {
        headers: {
            "Set-Cookie": `${CookieName}=${locale}`,
        },
    });
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|monitoring|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
