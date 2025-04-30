import * as z from "zod";
import {isPossibleNumber} from "libphonenumber-js";

export const TelefonnummerFormSchema = z
    .object({
        phoneNumber: z.union([
            z
                .string()
                .min(1, "kontakt.telefon.feil.tom")
                .min(6, "kontakt.telefon.feil.ugyldig")
                .max(11, "kontakt.telefon.feil.maxLength"),
            z.null(),
        ]),
    })
    // just fall back to a known-good valid phone number so that we don't get validation errors if it's null or undefined
    .refine(({phoneNumber}) => isPossibleNumber(phoneNumber ?? "+4781549300", "NO"), {
        message: "kontakt.telefon.feil.ugyldig",
        path: ["phoneNumber"],
    });
