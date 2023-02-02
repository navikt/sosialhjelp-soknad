import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import Backend from "i18next-http-backend";
import {isLocalhost} from "./nav-soknad/utils";

i18n
    // load translation using http
    .use(Backend)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // Added January 2023 by Tore Sinding Bekkedal
        // For compatibility with legacy design components, we make t() return string,
        // and not string | null. Might be irrelevant at some future point.
        // See also src/@types/i18next.d.ts
        returnNull: false,
        fallbackLng: "nb",
        defaultNS: "skjema",
        debug: isLocalhost(window.location.href),

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {loadPath: "/sosialhjelp/soknad/locales/{{lng}}/{{ns}}.json"},
    });

export default i18n;
