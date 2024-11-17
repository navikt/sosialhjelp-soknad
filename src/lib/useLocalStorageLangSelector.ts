"use client";

import {useEffect} from "react";
import {DIGISOS_LANGUAGE_STORAGE_KEY} from "./constants.ts";
import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {DecoratorLocale} from "@navikt/nav-dekoratoren-moduler/ssr";
import {logAmplitudeEvent} from "./amplitude/Amplitude.tsx";
import i18n from "./i18n/reacti18Next.ts";
import {fallbackLng, isSupportedLanguage} from "./i18n/common.ts";
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
        const storedLanguage = localStorage.getItem(DIGISOS_LANGUAGE_STORAGE_KEY);

        if (storedLanguage) setLanguage(storedLanguage).then();
    }, []);

    onLanguageSelect(async ({locale: language}: {locale: DecoratorLocale}) => {
        await setLanguage(language);
        await logAmplitudeEvent("Valgt språk", {language});
    });
};
