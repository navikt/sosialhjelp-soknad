import * as z from "zod";
import {isPossibleNumber} from "libphonenumber-js";

const TelefonnummerSchema = z.preprocess(
    (v) => (v === "" ? null : v),
    z
        .string()
        .min(1, "kontakt.telefon.feil.tom")
        .min(6, "kontakt.telefon.feil.ugyldig")
        .max(11, "kontakt.telefon.feil.maxLength")
        .nullable()
) as z.ZodEffects<z.ZodNullable<z.ZodString>, string | null, string | null>;

export const TelefonnummerFormSchema = z
    .object({phoneNumber: TelefonnummerSchema})
    // just fall back to a known-good valid phone number so that we don't get validation errors if it's null or undefined
    .refine(({phoneNumber}) => isPossibleNumber(phoneNumber ?? "+4781549300", "NO"), {
        message: "kontakt.telefon.feil.ugyldig",
        path: ["phoneNumber"],
    });

//   ^^^ https://github.com/colinhacks/zod/issues/3537#issuecomment-2829790481
