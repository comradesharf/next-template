/**
 * Copy all files from public/_* and dist/_* to portal public
 */

import { cp, glob } from "node:fs/promises";
import path from "node:path";

for await (const $path of glob("packages/*/{public,dist}/_*", {
    cwd: "../../",
})) {
    const source = path.resolve("../..", $path);
    const destination = path.resolve(path.join("public", path.basename($path)));

    await cp(source, destination, {
        recursive: true,
    });

    console.log(`✅ Copied from ${source} to ${destination}`);
}
