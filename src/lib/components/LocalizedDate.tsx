import {format, isValid} from "date-fns";
import {logWarning} from "../utils/loggerUtils";
import {getDateFnLocale} from "../i18n";

/**
 * Formats a date to the current language (i18next.language)
 * @param date - Date as Date or as ISO-8601 string
 * @returns Formatted date, or "" if date is null or undefined
 * @example
 *  <LocalizedDate date={"2021-01-01"} /> -> "1. august 2019"
 */
export const LocalizedDate = ({date}: {date: Date | string | null | undefined}): string => {
    if (!date) return "";

    const dato = typeof date === "string" ? new Date(date) : date;

    if (!isValid(dato)) {
        logWarning(`formatDato: Invalid date: ${date}`);
        return date.toString();
    }

    return format(dato, "PPP", {locale: getDateFnLocale()});
};
