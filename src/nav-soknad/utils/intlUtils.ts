import {IntlShape} from "react-intl";

export function intlHasKey(intl: IntlShape, key: string) {
    if (!intl.messages) {
        return false;
    }
    return intl.messages[key] !== undefined;
}

export function getIntlText(intl?: IntlShape, key?: string) {
    if (!intl) return key;

    if (!key) return undefined;

    return intlHasKey(intl, key) ? intl.formatMessage({id: key}) : undefined;
}

export function getIntlTextOrKey(intl: IntlShape, key: string): string {
    if (typeof intl === "undefined") {
        return key;
    }
    const tekst = getIntlText(intl, key);
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
