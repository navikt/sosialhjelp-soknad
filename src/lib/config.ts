const SoknadMiljoTypes = ["localhost", "dev-sbs", "mock", "prod-sbs"] as const;

type SoknadMiljo = (typeof SoknadMiljoTypes)[number];

type SoknadConfig = {
    baseURL: string;
    innsynURL: string;
    minSideURL: string;
    logoutURL: string;
    faro: {
        url: string;
    };
};

const isValidDigisosEnvironment = (miljo: unknown): miljo is SoknadMiljo =>
    SoknadMiljoTypes.includes(miljo as SoknadMiljo);

const getConfig = (miljo: unknown): SoknadConfig => {
    if (!isValidDigisosEnvironment(miljo)) throw new Error(`Unknown SoknadMiljo ${miljo}`);

    switch (miljo) {
        case "localhost":
            return {
                baseURL: "http://localhost:8181/sosialhjelp/soknad-api/",
                innsynURL: "http://localhost:3000/sosialhjelp/innsyn/",
                minSideURL: "https://www.nav.no/minside/",
                logoutURL: "http://localhost:3008/",
                faro: {
                    url: "http://localhost:12347/collect",
                },
            };
        case "mock":
            return {
                baseURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad-api/",
                innsynURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
                logoutURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
                faro: {
                    url: "http://localhost:12347/collect", // FIXME
                },
            };
        case "dev-sbs":
            return {
                baseURL: "https://www-q0.dev.nav.no/sosialhjelp/login-api/soknad-api/",
                innsynURL: "https://www-q0.dev.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://www.dev.nav.no/minside/",
                logoutURL: "https://loginservice.dev.nav.no/slo",
                faro: {
                    url: "https://telemetry.ekstern.dev.nav.no/collect",
                },
            };
        case "prod-sbs":
            return {
                baseURL: "https://www.nav.no/sosialhjelp/login-api/soknad-api/",
                innsynURL: "https://www.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://www.nav.no/minside/",
                logoutURL: "https://loginservice.nav.no/slo",
                faro: {
                    url: "https://telemetry.nav.no/collect",
                },
            };
    }
};

const config = getConfig(import.meta.env.REACT_APP_DIGISOS_ENV);
export const baseURL = config.baseURL;
export const innsynURL = config.innsynURL;
export const minSideURL = config.minSideURL;
export const logoutURL = config.logoutURL;
// Note: This value is duplicated in server.js because the imports are weird
export const basePath = "/sosialhjelp/soknad" as const;
export default config;
