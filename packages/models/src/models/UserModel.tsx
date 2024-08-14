import { getModelForClass } from '@typegoose/typegoose';
import { User } from '#models/User.tsx';

export const UserModel = getModelForClass(User);
