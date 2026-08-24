import {parsePhoneNumberWithError} from "libphonenumber-js";
import getLogger from "@log/logger";

/**
 *  uses libphonenumber to parse a string to a phone number.
 *  @returns undefined if the input is undefined or invalid, otherwise PhoneNumber object
 */
export const phoneNumberParsedOrUndefined = (telefonNr: string | undefined) => {
    if (!telefonNr) return undefined;

    try {
        const parsedNumber = parsePhoneNumberWithError(telefonNr, "NO");

        if (!parsedNumber.isPossible()) {
            getLogger().error(`attempt to parse invalid phone number, returning undefined`);
            return undefined;
        }

        return parsedNumber;
    } catch (e) {
        getLogger().error(`error parsing phone number: ${e}`);
        return undefined;
    }
};
