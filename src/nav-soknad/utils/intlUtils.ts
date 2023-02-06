import {TFunction} from "i18next";

export const getIntlText = (t: TFunction<"skjema", undefined, "skjema">, key: string) =>
    key !== t(key) ? t(key) : undefined;

export function getIntlTextOrKey(t: TFunction<"skjema", undefined, "skjema">, key: string): string {
    if (typeof t === "undefined") {
        return key;
    }
    const tekst = t(key);
    return tekst || key;
}

export const replaceDotWithUnderscore = (verdi: string): string => {
    return verdi.replace(/\./g, "_");
};

// Eksempel: "2019-08-01" => "1. august 2019"
export function formatDato(isoDate: string) {
    const dato: Date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat("nb-NO", {day: "numeric", month: "long", year: "numeric"});
    return formatter.format(dato).replace(/([0-9]) /, "$1. ");
}
// Eksempel: "2019-08-01T12:12:12.123123Z" => "1. august 2019 klokken 12:12"
export function formatTidspunkt(isoDate: string) {
    const dato: Date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat("nb-NO", {hour: "numeric", minute: "numeric"});
    return formatDato(isoDate) + " klokken " + formatter.format(dato);
}
