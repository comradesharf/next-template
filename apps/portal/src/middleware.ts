import Negotiator from 'negotiator';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import AuthConfigs from '#libs/AuthConfigs.ts';
import linguiConfig from '#libs/locales/lingui.config.ts';

export const _auth = NextAuth(AuthConfigs);

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const middleware: unknown = _auth.auth((request) => {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getRequestLocale(request.headers);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl);
});

const { locales } = linguiConfig;

function getRequestLocale(requestHeaders: Headers): string {
    const langHeader = requestHeaders.get('accept-language') || undefined;
    const languages = new Negotiator({
        headers: { 'accept-language': langHeader },
    }).languages(locales.slice());
    return languages[0] || locales[0] || 'en';
}

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
        '/((?!_next/static|_next/image|favicon.ico|monitoring|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
