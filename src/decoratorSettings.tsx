import {DecoratorFetchProps} from "@navikt/nav-dekoratoren-moduler/ssr";
import {BASE_PATH} from "./lib/constants.ts";
import {digisosConfig} from "./lib/config.ts";

export const DECORATOR_SETTINGS: DecoratorFetchProps = {
    env: digisosConfig.dekoratorMiljo,
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
