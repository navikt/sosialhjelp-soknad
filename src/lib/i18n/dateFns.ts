import {DEFAULT_LANGUAGE, isSupportedLanguage, SupportedLanguage} from "./common.ts";
import {enGB, Locale, nb, nn} from "date-fns/locale";
import i18n from "i18next";
import {logWarning} from "../log/loggerUtils.ts";

const dateFnLocales: Record<SupportedLanguage, Locale> = {
    en: enGB,
    nn: nn,
    nb: nb,
};
/**
 * Returns the date-fns locale object for the current i18next language
 * Logs a warning if the language is not supported, and falls back to "nb".
 */
export const getDateFnLocale = () => {
    const {language} = i18n;

    // Ensure that the current language is supported
    if (!isSupportedLanguage(language)) {
        logWarning(`getDateFnLocale: Unsupported language "${language}", falling back to ${DEFAULT_LANGUAGE}`);
        return dateFnLocales[DEFAULT_LANGUAGE];
    }

    return dateFnLocales[language];
};
