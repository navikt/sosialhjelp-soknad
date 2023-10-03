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

// Eksempel: "2019-08-01T12:12:12.123123Z" => "1. august 2019 klokken 12:12"
export function formatTidspunkt(isoDate: string | Date, t: TFunction<"skjema", "skjema">) {
    const dato: Date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;

    if (!isValid(dato)) {
        logWarning(`formatDato: Invalid date: ${isoDate}`);
        return "";
    }

    return format(dato, "PPPpp", {locale: getDateFnLocale()});
}
