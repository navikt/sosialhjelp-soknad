import {z} from "zod";
import {ValideringsFeilKode} from "../../../../lib/validering.ts";

export const BelopSchema = z.preprocess(
    (input) => {
        if (typeof input === "string") {
            if (!input.trim().length) return undefined;
            return Number(input);
        }
        return input;
    },
    z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL).optional()
) as z.ZodEffects<z.ZodOptional<z.ZodNumber>, number | undefined, number | undefined>;
//   ^^^ https://github.com/colinhacks/zod/issues/3537#issuecomment-2829790481
