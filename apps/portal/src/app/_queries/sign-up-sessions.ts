import { SignUpSessionModel } from "app-models/models/SignUpSessionModel";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getSignUpSessionById = cache((id: string) =>
    SignUpSessionModel.findById(id).lean().orFail(notFound),
);
