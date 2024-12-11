import { typeid } from "typeid-js";

export type ID<P extends string> = `${P}_${string}`;

export function generateIdWithPrefix<P extends string>(prefix: P): () => ID<P> {
    return () => typeid(prefix).toString() as ID<P>;
}
