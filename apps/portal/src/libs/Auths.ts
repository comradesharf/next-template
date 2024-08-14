import NextAuth, { type NextAuthResult } from 'next-auth';
import AuthConfigs from '#libs/AuthConfigs.ts';

const _auth = NextAuth({
    session: { strategy: 'jwt' },
    ...AuthConfigs,
});

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const auth: NextAuthResult['auth'] = _auth.auth;

export const signIn: NextAuthResult['signIn'] = _auth.signIn;

export const signOut: NextAuthResult['signOut'] = _auth.signOut;

export const handlers: NextAuthResult['handlers'] = _auth.handlers;
