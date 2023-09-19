import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {logWarning} from "./nav-soknad/utils/loggerUtils";

// Supported languages - add new languages here
import skjemaNn from "./locales/nn/skjema.json";
import skjemaNb from "./locales/nb/skjema.json";
import skjemaEn from "./locales/en/skjema.json";
import {enGB, nb, nn} from "date-fns/locale";

export const SUPPORTED_LANGUAGES = ["en", "nb", "nn"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);

const storedLanguage = localStorage.getItem("language");

/**
 * Returns the date-fns locale object for the current i18next language
 * Logs a warning if the language is not supported, and falls back to "nb".
 */
export const getDateFnLocale = () => {
    const lang = i18n.language;

    // Ensure that the current language is supported
    if (!isSupportedLanguage(lang)) {
        logWarning(`getDateFnLocale: Unsupported language "${lang}", falling back to "nb"`);
        return nb;
    }

    return dateFnLocales[lang];
};

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // Added January 2023 by Tore Sinding Bekkedal
        // For compatibility with legacy design components, we make t() return string,
        // and not string | null. Might be irrelevant at some future point.
        // See also src/@types/i18next.d.ts
        returnNull: false,
        lng: storedLanguage || "nb",
        fallbackLng: "nb",
        ns: ["skjema"],
        defaultNS: "skjema",
        debug: window.location.hostname === "localhost",

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            nn: {skjema: skjemaNn},
            nb: {skjema: skjemaNb},
            en: {skjema: skjemaEn},
        },
    });

export default i18n;
const dateFnLocales: Record<SupportedLanguage, Locale> = {
    en: enGB,
    nn: nn,
    nb: nb,
};
