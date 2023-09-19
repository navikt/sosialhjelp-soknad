import {formatDato} from "../nav-soknad/utils";
import i18next from "i18next";

/**
 * Formats a date to the current language (i18next.language)
 * @param date - Date in ISO-8601 format
 * @returns Formatted date, or "" if date is null or undefined
 * @example
 *  <LocalizedDate date={"2021-01-01"} />
 *  -> "1. august 2019"
 */
export const LocalizedDate = ({date}: {date: string | null | undefined}) =>
    date ? formatDato(date, i18next.language) : "";
