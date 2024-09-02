import {DecoratorFetchProps} from "@navikt/nav-dekoratoren-moduler/ssr";
import {BASE_PATH} from "./lib/constants.ts";

export const DECORATOR_SETTINGS: DecoratorFetchProps = {
    env: process.env.NEXT_PUBLIC_DIGISOS_ENV == "prod-sbs" ? "prod" : "dev",
    serviceDiscovery: false,
    params: {
        availableLanguages: [
            {locale: "nb", url: BASE_PATH, handleInApp: true},
            {locale: "nn", url: BASE_PATH, handleInApp: true},
            {locale: "en", url: BASE_PATH, handleInApp: true},
        ],
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
        logoutWarning: true,
    },
};
