// Should have better test coverage!
import {parsePhoneNumberWithError} from "libphonenumber-js";
import {logger} from "@navikt/next-logger";

/**
 *  uses libphonenumber to parse a string to a phone number.
 *  @returns undefined if the input is undefined or invalid, otherwise PhoneNumber object
 */
export const phoneNumberParsedOrUndefined = (telefonNr: string | undefined) => {
    if (!telefonNr) return undefined;

    const parsedNumber = parsePhoneNumberWithError(telefonNr, "NO");

    if (!parsedNumber.isValid()) {
        logger.error(`attempt to parse invalid phone number, returning undefined`);
        return undefined;
    }

    return parsedNumber;
};
