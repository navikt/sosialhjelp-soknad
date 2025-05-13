import * as z from "zod";
import {isPossibleNumber} from "libphonenumber-js";

const ValidationMessages = {
    empty: "kontakt.telefon.feil.tom",
    invalid: "kontakt.telefon.feil.ugyldig",
    tooLong: "kontakt.telefon.feil.maxLength",
} as const;

export const PhoneNumberStringSchema = z
    .string()
    .min(1, ValidationMessages.empty)
    .min(6, ValidationMessages.invalid)
    .max(11, ValidationMessages.tooLong)
    .refine((phoneNumber) => isPossibleNumber(phoneNumber, "NO"), ValidationMessages.invalid);
