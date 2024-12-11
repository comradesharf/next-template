import { z } from "zod";

export const PhoneNumberSchema = z.object({
    phone: z.string().trim(),
    inputValue: z.string().trim(),
    country: z.object({
        name: z.string().trim(),
        iso2: z.string().trim(),
        dialCode: z.string().trim(),
        format: z.preprocess(
            (value) => {
                if (typeof value === "string") {
                    return { default: value };
                }
                return value;
            },
            z.record(z.string().trim(), z.string().trim()),
        ),
        priority: z.number().optional(),
        areCodes: z.array(z.string().trim()).optional(),
    }),
});
