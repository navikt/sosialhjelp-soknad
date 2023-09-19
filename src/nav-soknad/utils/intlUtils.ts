import {TFunction} from "i18next";
import {getDateFnLocale} from "../../i18n";
import {format, isValid} from "date-fns";
import {logWarning} from "./loggerUtils";

export const getIntlText = (t: TFunction<"skjema", "skjema">, key: string) => (key !== t(key) ? t(key) : undefined);

export const getIntlTextOrKey = (t: TFunction<"skjema", "skjema">, key: string): string => {
    if (typeof t === "undefined") return key;

    const tekst = t(key);
    return tekst || key;
};

export const replaceDotWithUnderscore = (verdi: string) => verdi.replace(/\./g, "_");

/**
 * Formats an ISO-8601 date to a string
 * @param isoDate ISO-8601 date string
 * @param lang Two-letter locale code (currently only "en" and "nb" are supported!)
 * @example formatDato("2019-08-01", "nb") => "1. august 2019"
 */
export function formatDato(isoDate: string, lang: string) {
    const dato: Date = new Date(isoDate);

    if (!isValid(dato)) {
        logWarning(`formatDato: Invalid date: ${isoDate}`);
        return isoDate;
    }

    return format(dato, "PPP", {locale: getDateFnLocale()});
}

// Eksempel: "2019-08-01T12:12:12.123123Z" => "1. august 2019 klokken 12:12"
export function formatTidspunkt(isoDate: string, t: TFunction<"skjema", "skjema">) {
    const dato: Date = new Date(isoDate);

    if (!isValid(dato)) {
        logWarning(`formatDato: Invalid date: ${isoDate}`);
        return isoDate;
    }

    return format(dato, "PPPpp", {locale: getDateFnLocale()});
}
