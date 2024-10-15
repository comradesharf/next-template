import { getDiscriminatorModelForClass } from '@typegoose/typegoose';
import { Member } from '#models/Member.tsx';
import { UserModel } from '#models/UserModel.tsx';

export const MemberModel = getDiscriminatorModelForClass(
    UserModel,
    Member,
    'MEMBER',
);
