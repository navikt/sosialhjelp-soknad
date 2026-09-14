import {z} from "zod";
import {ValideringsFeilKode} from "../../../../lib/validering.ts";

export const BelopSchema = z.preprocess(
    (input: unknown) => {
        if (typeof input === "string") {
            if (!input.trim().length) return undefined;
            return Number(input);
        }
        return input;
    },
    z.number({message: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL).optional()
) as z.ZodType<number | undefined, number | undefined>;
//   ^^^ https://github.com/colinhacks/zod/issues/3537#issuecomment-2829790481
//   `input: unknown` er påkrevd: uten den utleder zod 4.5+ input-typen fra castet over
//   (ZodPreprocess<B, In>), og `typeof input === "string"` narrower da til `never`.
//   Bakgrunn: https://github.com/colinhacks/zod/issues/5966
