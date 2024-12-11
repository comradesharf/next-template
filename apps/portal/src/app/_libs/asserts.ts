import type { Session } from "next-auth";
import { redirect } from "next/navigation";

export function assertAuthenticated(session?: Session | null) {
    if (!session) {
        redirect("/sign-in");
    }
}

export function assertUnauthenticated(session?: Session | null) {
    if (session) {
        redirect("/overview");
    }
}
