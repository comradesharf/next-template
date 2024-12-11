import { compact, uniq } from "lodash-es";

export function normalizeLocale(locale: string): string[] {
    const [head, tail] = locale.split("-");
    return uniq([
        compact([head.toLocaleLowerCase(), tail?.toUpperCase()]).join(""),
        head.toLocaleLowerCase(),
    ]);
}
