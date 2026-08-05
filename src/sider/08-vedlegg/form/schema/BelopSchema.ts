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
    z.number({message: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL).optional()
);
