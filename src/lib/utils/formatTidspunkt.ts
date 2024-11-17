import {getDateFnLocale} from "../i18n/dateFns.ts";
import {format, isValid} from "date-fns";
import {logWarning} from "../log/loggerUtils";

// Eksempel: "2019-08-01T12:12:12.123123Z" => "1. august 2019 klokken 12:12"
export function formatTidspunkt(isoDate: string | Date) {
    const dato: Date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;

    if (!isValid(dato)) {
        logWarning(`formatDato: Invalid date: ${isoDate}`);
        return "";
    }

    return format(dato, "PPPpp", {locale: getDateFnLocale()});
}
