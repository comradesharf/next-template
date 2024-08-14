import { Log } from '@comradesharf/core/Log';
import {
    type Collection,
    ConnectionStates,
    connect,
    connection,
    set,
} from 'mongoose';

/**
 * Connects to the MongoDB database using Mongoose and provides the connection object.
 *
 * @async
 */
export async function db() {
    if (connection.readyState === ConnectionStates.disconnected) {
        connection.removeAllListeners();

        set('strictQuery', true);
        set('autoCreate', process.env.NODE_ENV === 'development');
        set('bufferCommands', process.env.NODE_ENV === 'development');
        set('autoIndex', process.env.NODE_ENV === 'development');
        set('toJSON', {
            virtuals: true,
            flattenObjectIds: true,
        });

        if (process.env.MONGODB_DEBUG) {
            connection.setMaxListeners(0);
            connection.on('connected', () => Log.info('connected'));
            connection.on('open', () => Log.info('open'));
            connection.on('disconnected', () => Log.info('disconnected'));
            connection.on('reconnected', () => Log.info('reconnected'));
            connection.on('disconnecting', () => Log.info('disconnecting'));
            connection.on('close', () => Log.info('close'));
            connection.on('error', (error) =>
                Log.error('mongoose_error', error),
            );
            set(
                'debug',
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
            'mongodb://user:Sgf82jEO25@127.0.0.1:27017/db?authSource=admin';

        await connect(MongoUri);
    }

    await connection.asPromise();
}
