import * as Locales from "app-core/Locales";
import locales from "app-core/locales.json";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import AuthConfigs from "#app/_libs/auths/auth.config.ts";

export const _auth = NextAuth(AuthConfigs);

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const middleware: unknown = _auth.auth((request) => {
    const { pathname } = request.nextUrl;

    let locale = locales.find(
        ({ value: locale }) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    )?.value;

    const response = NextResponse.next();

    if (locale) {
        response.cookies.set(Locales.CookieName, locale, {
            path: "/",
            httpOnly: true,
        });
        return response;
    }

    // Redirect if there is no locale
    locale = Locales.getRequestLocale(request.headers);

    response.cookies.set(Locales.CookieName, locale, {
        path: "/",
        httpOnly: true,
    });

    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl, {
        headers: response.headers,
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
        "/((?!_next/static|_next/image|favicon.ico|schema|monitoring|api|_widgets|_emails|_pdfs|ping|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
