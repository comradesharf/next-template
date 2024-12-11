import { SessionProvider as AuthSessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { getCurrentSession } from "#app/_queries/auths.ts";

export async function SessionProvider({ children }: PropsWithChildren) {
    const session = await getCurrentSession();
    return (
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
    );
}
