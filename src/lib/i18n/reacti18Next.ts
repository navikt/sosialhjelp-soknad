import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-http-backend";
import {ENABLE_DEBUG_I18N} from "../constants.ts";
import {resources} from "./resources.ts";
import {defaultNS, fallbackLng} from "./common.ts";

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

export default i18n;
