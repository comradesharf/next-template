import { Log } from '@comradesharf/core/Log';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import NextAuth, {
    type DefaultSession,
    type NextAuthConfig,
    type NextAuthResult,
} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthConfigs from '#app/_libs/auths/auth.config.ts';

const logger: NextAuthConfig['logger'] = {
    error(err) {
        Log.error({
            err,
        });
    },
    debug(message, metadata) {
        Log.debug({
            message,
            metadata,
        });
    },
    warn(code) {
        Log.debug({
            code,
        });
    },
};

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

const _auth = NextAuth({
    ...AuthConfigs,
    session: { strategy: 'jwt' },
    providers: [
        ...AuthConfigs.providers,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize({ email, password }) {
                try {
                    const user = await MemberModel.authorize({
                        email: email as string,
                        password: password as string,
                    });
                    if (!user) {
                        return null;
                    }
                    return {
                        id: user._id,
                        name: user.display_name,
                        email: user.email,
                    };
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    logger,
    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
    },
});

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const auth: NextAuthResult['auth'] = _auth.auth;

export const signIn: NextAuthResult['signIn'] = _auth.signIn;

export const signOut: NextAuthResult['signOut'] = _auth.signOut;

export const handlers: NextAuthResult['handlers'] = _auth.handlers;
