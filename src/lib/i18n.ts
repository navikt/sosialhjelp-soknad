import i18n, {DefaultNamespace, Namespace, ParseKeys, TOptions} from "i18next";
import {initReactI18next} from "react-i18next";
import {logWarning} from "./log/loggerUtils";
import Backend from "i18next-http-backend";
import {enGB, Locale, nb, nn} from "date-fns/locale";
import {BASE_PATH, DIGISOS_LANGUAGE_STORAGE_KEY, ENABLE_DEBUG_I18N} from "./constants";
import skjemaNb from "../locales/nb/skjema";
import skjemaNn from "../locales/nn/skjema";
import skjemaEn from "../locales/en/skjema";

import dokumentasjonNb from "../locales/nb/dokumentasjon";
import dokumentasjonNn from "../locales/nn/dokumentasjon";
import dokumentasjonEn from "../locales/en/dokumentasjon";
import {onLanguageSelect, setAvailableLanguages, setParams} from "@navikt/nav-dekoratoren-moduler";
import {DecoratorLocale} from "@navikt/nav-dekoratoren-moduler/ssr";
import {useEffect} from "react";
import {logAmplitudeEvent} from "./amplitude/Amplitude.tsx";

export const resources = {
    en: {dokumentasjon: dokumentasjonEn, skjema: skjemaEn},
    nn: {dokumentasjon: dokumentasjonNn, skjema: skjemaNn},
    nb: {dokumentasjon: dokumentasjonNb, skjema: skjemaNb},
} as const;

export const defaultNS = "skjema" as const;
export type DigisosLanguageKey<Ns extends Namespace = DefaultNamespace, TPrefix = undefined> = ParseKeys<
    Ns,
    TOptions,
    TPrefix
>;
export const SUPPORTED_LANGUAGES = ["en", "nb", "nn"] as const;
const fallbackLng = "nb";

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const dateFnLocales: Record<SupportedLanguage, Locale> = {
    en: enGB,
    nn: nn,
    nb: nb,
};

export const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);

/**
 * Returns the date-fns locale object for the current i18next language
 * Logs a warning if the language is not supported, and falls back to "nb".
 */
export const getDateFnLocale = () => {
    const {language} = i18n;

    // Ensure that the current language is supported
    if (!isSupportedLanguage(language)) {
        logWarning(`getDateFnLocale: Unsupported language "${language}", falling back to ${fallbackLng}`);
        return dateFnLocales[fallbackLng];
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
        fallbackLng,
        ns: ["skjema"],
        defaultNS,
        resources,
        debug: ENABLE_DEBUG_I18N,
        // not needed for react as it escapes by default
        interpolation: {escapeValue: false},
    });

/** Sets language for i18next, nav-dekorator, and localStorage */
const setLanguage = async (language: string) => {
    if (!isSupportedLanguage(language)) {
        localStorage.removeItem(DIGISOS_LANGUAGE_STORAGE_KEY);
        await setLanguage(fallbackLng);
        return;
    }

    await i18n.changeLanguage(language);
    await setParams({language: language as DecoratorLocale});
    localStorage.setItem(DIGISOS_LANGUAGE_STORAGE_KEY, language);
};

export const useLocalStorageLangSelector = () => {
    useEffect(() => {
        setAvailableLanguages(
            SUPPORTED_LANGUAGES.map((locale) => ({
                locale,
                BASE_PATH,
                handleInApp: true,
            }))
        ).then();

        const storedLanguage = localStorage.getItem(DIGISOS_LANGUAGE_STORAGE_KEY);

        if (storedLanguage) setLanguage(storedLanguage).then();
    }, []);

    onLanguageSelect(async ({locale: language}: {locale: DecoratorLocale}) => {
        await setLanguage(language);
        await logAmplitudeEvent("Valgt språk", {language});
    });
};

export default i18n;
