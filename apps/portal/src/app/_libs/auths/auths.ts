import { Log } from '@comradesharf/core/Log';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import NextAuth, { type NextAuthResult } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthConfigs from '#app/_libs/auths/auth.config.ts';

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
                const user = await MemberModel.findOne({
                    email,
                }).orFail();
                await user.verifyPassword(password as string);
                return user.toJSON();
            },
        }),
    ],
    logger: {
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
