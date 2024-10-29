import { modelOptions, prop } from '@typegoose/typegoose';
import { generateIdWithPrefix } from '#models/Base.ts';
import { User } from '#models/User.ts';

declare module '@casl/ability' {
    interface RecordTypes {
        Admin: Admin;
    }
}

@modelOptions({
    options: {
        customName: 'Admin',
    },
})
class Admin extends User {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix('adm'),
    })
    _id!: string;

    declare role: 'ADMIN';
}

export { Admin };
