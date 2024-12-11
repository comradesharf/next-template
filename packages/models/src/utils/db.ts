import { setGlobalOptions } from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import {
    type Collection,
    ConnectionStates,
    connect,
    connection,
    set,
} from "mongoose";
import {
    MongooseSchemaOptions,
    TypegooseSchemaOptions,
} from "#utils/SchemaOptions.ts";

setGlobalOptions({
    schemaOptions: TypegooseSchemaOptions,
});

set(MongooseSchemaOptions);

/**
 * Connects to the MongoDB database using Mongoose and provides the connection object.
 *
 * @async
 */
export async function db() {
    if (connection.readyState === ConnectionStates.disconnected) {
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

        const MongoUri =
            process.env.MONGODB_URI ??
            "mongodb://user:Sgf82jEO25@127.0.0.1:27017/db?authSource=admin";

        await connect(MongoUri);
    }

    await connection.asPromise();
}
