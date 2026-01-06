export const DigisosEnvironments = ["localhost", "mock", "prod", "preprod", "dev", "e2e"] as const;
export type DigisosEnvironment = (typeof DigisosEnvironments)[number];

type FeatureFlags = {
    // Ny versjon av Personalia oppsummering
    nyOppsummering: boolean;

    // Ny Nav-kontor-visning i oppsummering
    oppsummeringNavEnhet: boolean;

    // Vis valg for søknadstype ved opprettelse
    soknadstypeValg: boolean;

    // Dette er en testversjon som er blitt gitt en ingress på nav.no.
    // Forhindrer at siden blir indeksert, og viser en synlig advarsel.
    publicFacingTestVersion?: true;
};

type SoknadApiProxyOptions = {
    hostname: string;
    basePath: string; // no trailing slash
    https: boolean;
    port?: string;
};

type DekoratorOptions = {
    serviceDiscovery: boolean;
    env: "dev" | "prod";
    logoutRedirectUrl?: string;
    dekoratorApiBaseUrl?: string;
};

type SoknadConfig = {
    showDevPanel: boolean;
    logLocally: boolean;
    withCredentials: boolean;

    driftsmeldingUrl?: string;
    baseURL: string;
    innsynURL: string;
    minSideURL: string;
    dekoratorLoginBaseUrl: string;

    featureFlags: FeatureFlags;
    proxy?: SoknadApiProxyOptions;
    dekorator: DekoratorOptions;

    faro?: {
        url: string;
    };
};

const isValidDigisosEnvironment = (miljo: unknown): miljo is DigisosEnvironment =>
    DigisosEnvironments.includes(miljo as DigisosEnvironment);

const configMap: Record<DigisosEnvironment, SoknadConfig> = {
    e2e: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
            publicFacingTestVersion: true,
        },
        dekorator: {
            env: "dev",
            serviceDiscovery: false,
        },
        logLocally: true,
        showDevPanel: true,
        withCredentials: true,
        proxy: {
            hostname: "localhost",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
            port: "8181",
        },
        driftsmeldingUrl: "http://localhost:3005/sosialhjelp/driftsmeldinger/api",
        baseURL: "http://localhost:3001/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "http://localhost:3002/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
    },
    localhost: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
            publicFacingTestVersion: true,
        },

        dekorator: {
            env: "dev",
            serviceDiscovery: false,
        },
        logLocally: true,
        showDevPanel: true,
        withCredentials: true,
        proxy: {
            hostname: "localhost",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
            port: "8181",
        },
        driftsmeldingUrl: "http://localhost:3005/sosialhjelp/driftsmeldinger/api",
        baseURL: "http://localhost:3000/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "http://localhost:3000/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        // faro: {
        //     url: "http://localhost:12347/collect",
        // },
    },
    mock: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
        },
        dekorator: {
            env: "dev",
            serviceDiscovery: true,
        },
        proxy: {
            hostname: "sosialhjelp-soknad-api-mock",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
        },
        showDevPanel: false,
        logLocally: false,
        withCredentials: true,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "http://localhost:12347/collect", // FIXME
        },
    },
    prod: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: false,
            publicFacingTestVersion: true,
        },

        dekorator: {
            env: "prod",
            serviceDiscovery: true,
            logoutRedirectUrl: "https://www.nav.no/sosialhjelp/soknad/oauth2/logout",
            dekoratorApiBaseUrl: "https://www.nav.no/person/nav-dekoratoren-api",
        },

        proxy: {
            hostname: "sosialhjelp-soknad-api",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
        },

        showDevPanel: false,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www.nav.no/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "https://www.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        dekoratorLoginBaseUrl: "https://login.nav.no",
        faro: {
            url: "https://telemetry.nav.no/collect",
        },
    },
    preprod: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: false,
        },

        dekorator: {
            env: "dev",
            serviceDiscovery: true,
            logoutRedirectUrl: "https://www.ekstern.dev.nav.no/sosialhjelp/soknad/oauth2/logout",
            dekoratorApiBaseUrl: "https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api",
        },

        proxy: {
            hostname: "sosialhjelp-soknad-api.teamdigisos",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
        },

        showDevPanel: false,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www.ekstern.dev.nav.no/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "https://www.ekstern.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.ansatt.dev.nav.no/minside/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "https://telemetry.ekstern.dev.nav.no/collect",
        },
    },
    dev: {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
        },

        dekorator: {
            env: "dev",
            serviceDiscovery: true,
            logoutRedirectUrl: "https://www.ansatt.dev.nav.no/sosialhjelp/soknad/oauth2/logout",
            dekoratorApiBaseUrl: "https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api",
        },

        proxy: {
            hostname: "sosialhjelp-soknad-api-dev.teamdigisos",
            basePath: "/sosialhjelp/soknad-api",
            https: false,
        },

        showDevPanel: true,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www.ansatt.dev.nav.no/sosialhjelp/soknad/api/soknad-api/",
        innsynURL: "https://www.ansatt.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.ansatt.dev.nav.no/minside/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "https://telemetry.ekstern.dev.nav.no/collect",
        },
    },
};

const getConfig = (miljo: unknown): SoknadConfig => {
    if (miljo !== "e2e" && process.env.NODE_ENV === "test") return configMap.localhost;
    if (!isValidDigisosEnvironment(miljo)) throw new Error(`Unknown SoknadMiljo: "${miljo}"`);
    return configMap[miljo];
};

export const digisosConfig = getConfig(process.env.NEXT_PUBLIC_DIGISOS_ENV);

export default digisosConfig;
export const useConfigFeatureFlags = (): FeatureFlags => digisosConfig.featureFlags;
