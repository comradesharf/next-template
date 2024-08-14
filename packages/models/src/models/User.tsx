import { modelOptions } from '@typegoose/typegoose';
import { Base } from '#models/Base.tsx';

declare module '@casl/ability' {
    interface RecordTypes {
        User: User;
    }
}

@modelOptions({
    schemaOptions: {
        discriminatorKey: 'role',
    },
    options: {
        customName: 'User',
    },
})
class User extends Base {}

export { User };
