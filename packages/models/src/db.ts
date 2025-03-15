import { setGlobalOptions } from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import {
    connect as $connect,
    type Collection,
    ConnectionStates,
    connection,
    set,
} from "mongoose";
import { MongooseSchemaOptions } from "#SchemaOptions.ts";

setGlobalOptions({
    schemaOptions: MongooseSchemaOptions,
});

set(MongooseSchemaOptions);

if (process.env.MONGODB_DEBUG) {
    set(
        "debug",
        function (
            this: Collection,
            collectionName: string,
            methodName: string,
            ...methodArgs: unknown[]
        ) {
            Log.info({
                msg: `${collectionName}.${methodName}`,
                query: methodArgs[0],
                params: methodArgs[1],
            });
        },
    );
}

/**
 * Connects to the MongoDB database using Mongoose and provides the connection object.
 *
 * @async
 */
export async function connect() {
    if (connection.readyState === ConnectionStates.disconnected) {
        connection.removeAllListeners();

        await import("#models.ts");

        const MongoUri =
            process.env.MONGODB_URI ??
            "mongodb://user:Sgf82jEO25@127.0.0.1:27017/db?authSource=admin";

        await $connect(MongoUri);
    }

    await connection.asPromise();
}

export const transaction: typeof connection.transaction =
    connection.transaction.bind(connection);

export const destroy: typeof connection.destroy =
    connection.destroy.bind(connection);

export const close: typeof connection.close = connection.close.bind(connection);

export const createCollections: typeof connection.createCollections =
    connection.createCollections.bind(connection);

export const syncIndexes: typeof connection.syncIndexes =
    connection.syncIndexes.bind(connection);

export async function ping() {
    await connection.db!.command({ ping: 1 });
}
