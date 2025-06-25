import {PhoneNumber} from "libphonenumber-js";

/**
 * Formatterer et telefonnummer (i internasjonalt format, dersom utenfor +47).
 */
export const formatPhoneNumber = (number: PhoneNumber) =>
    number.country == "NO" ? number.formatNational() : number.formatInternational();
