import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {logWarning} from "./utils/loggerUtils";
import Backend from "i18next-http-backend";
import {enGB, Locale, nb, nn} from "date-fns/locale";
import {DecoratorLocale, onLanguageSelect, setAvailableLanguages, setParams} from "@navikt/nav-dekoratoren-moduler";
import {logAmplitudeEvent} from "./utils/amplitude";
import {basePath as url} from "./config";

export const SUPPORTED_LANGUAGES = ["en", "nb", "nn"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const dateFnLocales: Record<SupportedLanguage, Locale> = {
    en: enGB,
    nn: nn,
    nb: nb,
};

export const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);

const storedLanguage = localStorage.getItem("language");

/**
 * Returns the date-fns locale object for the current i18next language
 * Logs a warning if the language is not supported, and falls back to "nb".
 */
export const getDateFnLocale = () => {
    const {language} = i18n;

    // Ensure that the current language is supported
    if (!isSupportedLanguage(language)) {
        logWarning(`getDateFnLocale: Unsupported language "${language}", falling back to "nb"`);
        return nb;
    }

    return dateFnLocales[language];
};

i18n.use(Backend)
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
        backend: {
            loadPath: `${window.location.origin}/sosialhjelp/soknad/locales/{{lng}}/{{ns}}.json`,
        },

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;

const handleLanguageSelect = ({locale}: {locale: DecoratorLocale}) => {
    i18n.changeLanguage(locale);
    setParams({language: locale});
    localStorage.setItem("digisos-language", locale);

    logAmplitudeEvent("Valgt språk", {language: locale});
};

export const i18nSetLangFromLocalStorage = () => {
    setAvailableLanguages(SUPPORTED_LANGUAGES.map((locale) => ({locale, url, handleInApp: true})));

    const storedLanguage = localStorage.getItem("digisos-language");
    if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        setParams({language: storedLanguage as DecoratorLocale});
    }

    onLanguageSelect(handleLanguageSelect);
};
