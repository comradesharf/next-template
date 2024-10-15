import { getDiscriminatorModelForClass } from '@typegoose/typegoose';
import { Admin } from '#models/Admin.tsx';
import { UserModel } from '#models/UserModel.tsx';

export const AdminModel = getDiscriminatorModelForClass(
    UserModel,
    Admin,
    'ADMIN',
);
