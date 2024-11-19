import {DecoratorFetchProps} from "@navikt/nav-dekoratoren-moduler/ssr";
import {BASE_PATH} from "./lib/constants.ts";
import {digisosConfig} from "./lib/config.ts";

const {env, serviceDiscovery} = digisosConfig.dekorator;

export const DECORATOR_SETTINGS: DecoratorFetchProps = {
    env,
    serviceDiscovery,
    params: {
        availableLanguages: [
            {locale: "nb", url: `${BASE_PATH}/nb/`, handleInApp: true},
            {locale: "nn", url: `${BASE_PATH}/nn/`, handleInApp: true},
            {locale: "en", url: `${BASE_PATH}/en/`, handleInApp: true},
        ],
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
        logoutWarning: true,
    },
};
