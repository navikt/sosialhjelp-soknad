import {logError} from "../../lib/utils/loggerUtils";

/**
 * React form hook preprocessor for tekstfelt beløp.
 *
 * Konverterer en tekststreng til number.
 *
 * Ved konverteringsfeil returnerer den en streng, som vil flagges
 * i form-hook med invalid_type_error som vi bruker til å gi en
 * vennlig feilmelding
 *
 * @param inputString Brukerdata skjemaverdi (i praksis event.target.value)
 * @returns number dersom tolkning lykkes, string dersom ikke
 * @todo Testdekning
 */
export const belopTekstfeltPreprocessor = (inputString: unknown) => {
    if (inputString === undefined || inputString === null) return null;

    if (typeof inputString === "number") return inputString;

    if (typeof inputString !== "string") {
        logError(`Input value to zodBelopTekstfelt "${inputString}" was neither number nor string`);
        return "feil";
    }

    const deWhitespacedString = inputString.replace(/\s+/g, "");

    if (deWhitespacedString === "") return null;

    const isNumeric = new RegExp("^\\d+$");

    if (!isNumeric.test(deWhitespacedString))
        return "this string is passed as a hack to trigger the invalid_type_error";

    const num = parseInt(deWhitespacedString, 10);

    if (isNaN(num)) return "this string is passed as a hack to trigger the invalid_type_error";

    return num;
};
