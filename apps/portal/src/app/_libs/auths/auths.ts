import { Log } from "app-core/Log";
import { MemberModel } from "app-models/models/MemberModel";
import NextAuth, {
    type DefaultSession,
    type NextAuthConfig,
    type NextAuthResult,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import AuthConfigs from "#app/_libs/auths/auth.config.ts";

const logger: NextAuthConfig["logger"] = {
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

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            timezone: string;
        } & DefaultSession["user"];
    }

    interface User {
        timezone: string;
    }
}

const _auth = NextAuth({
    ...AuthConfigs,
    session: { strategy: "jwt" },
    providers: [
        ...AuthConfigs.providers,
        Credentials({
            credentials: {
                email: {},
                password: {},
                type: {},
            },
            async authorize({ email, password, type }) {
                try {
                    const user = await MemberModel.authorize({
                        email: email as string,
                        password: password as string,
                        type: type as "system" | "user",
                    });

                    if (!user) {
                        return null;
                    }

                    return {
                        id: user._id,
                        name: user.display_name,
                        email: user.email,
                        timezone: user.timezone,
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
                    id: token.user_id as string,
                    timezone: token.timezone as string,
                },
            };
        },
        jwt({ token, user }) {
            if (user) {
                token.timezone = user.timezone;
                token.user_id = user.id;
            }
            return token;
        },
    },
});

/**
 * Export the auth, signIn, signOut, and handlers functions from the NextAuth instance to silence the following error:
 * @link https://github.com/nextauthjs/next-auth/issues/10568
 */

export const auth: NextAuthResult["auth"] = _auth.auth;

export const signIn: NextAuthResult["signIn"] = _auth.signIn;

export const signOut: NextAuthResult["signOut"] = _auth.signOut;

export const handlers: NextAuthResult["handlers"] = _auth.handlers;
