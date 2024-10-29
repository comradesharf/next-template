import { getModelForClass } from '@typegoose/typegoose';
import { SignUpSession } from '#models/SignUpSession.ts';

export const SignUpSessionModel = getModelForClass(SignUpSession);
