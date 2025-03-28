import {logError} from "../../../../lib/log/loggerUtils.ts";

const belopTekstfeltPreprocessor = (inputString: unknown) => {
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

export default belopTekstfeltPreprocessor;
