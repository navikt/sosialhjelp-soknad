export const DigisosEnvironments = ["localhost", "dev-sbs", "mock", "prod-sbs", "prod", "preprod"] as const;
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
};

type DekoratorOptions = {
    serviceDiscovery: boolean;
    env: "dev" | "prod";
    logoutRedirectUrl?: string;
};

type SoknadConfig = {
    showDevPanel: boolean;
    logLocally: boolean;
    withCredentials: boolean;

    driftsmeldingUrl?: string;
    baseURL: string;
    innsynURL: string;
    minSideURL: string;
    logoutURL: string;
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

        driftsmeldingUrl: "http://localhost:3005/sosialhjelp/driftsmeldinger/api",
        baseURL: "http://localhost:8181/sosialhjelp/soknad-api/",
        innsynURL: "http://localhost:3000/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        logoutURL: "http://localhost:3008/",
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
        showDevPanel: false,
        logLocally: false,
        withCredentials: true,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad-api/",
        innsynURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
        logoutURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "http://localhost:12347/collect", // FIXME
        },
    },
    "dev-sbs": {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: false,
        },
        dekorator: {
            env: "dev",
            serviceDiscovery: false,
        },
        showDevPanel: true,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "https://digisos.ekstern.dev.nav.no/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www-q0.dev.nav.no/sosialhjelp/login-api/soknad-api/",
        innsynURL: "https://www-q0.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.dev.nav.no/minside/",
        logoutURL: "https://loginservice.dev.nav.no/slo",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "https://telemetry.ekstern.dev.nav.no/collect",
        },
    },
    "prod-sbs": {
        featureFlags: {
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: false,
        },
        dekorator: {
            env: "prod",
            serviceDiscovery: false,
        },
        showDevPanel: false,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "https://www.nav.no/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www.nav.no/sosialhjelp/login-api/soknad-api/",
        innsynURL: "https://www.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        logoutURL: "https://loginservice.nav.no/slo",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "https://telemetry.nav.no/collect",
        },
    },
    // Når prod-fss faller bort, blir -gcp som postfix meningsløst, så
    // dette blir prod i GCP når det er kjørt inn.
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
        },

        proxy: {
            hostname: "sosialhjelp-soknad-api.prod-fss-pub.nais.io",
            basePath: "/sosialhjelp/soknad-api",
            https: true,
        },

        showDevPanel: false,
        logLocally: false,
        withCredentials: false,
        driftsmeldingUrl: "http://sosialhjelp-driftsmeldinger/sosialhjelp/driftsmeldinger/api",
        baseURL: "https://www.nav.no/sosialhjelp/soknad/soknad-api/",
        innsynURL: "https://www.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.nav.no/minside/",
        logoutURL: "https://loginservice.nav.no/slo",
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
        baseURL: "https://www.ekstern.dev.nav.no/sosialhjelp/soknad/soknad-api/",
        // NB: Denne ble satt til digisos.ekstern, fordi da denne ble skrevet var det ikke innsyn i preprod enda.
        innsynURL: "https://www.ekstern.dev.nav.no/sosialhjelp/innsyn",
        minSideURL: "https://www.ansatt.dev.nav.no/minside/",
        logoutURL: "https://loginservice.nav.no/slo",
        dekoratorLoginBaseUrl: "https://login.ekstern.dev.nav.no",
        faro: {
            url: "https://telemetry.ekstern.dev.nav.no/collect",
        },
    },
};

const getConfig = (miljo: unknown): SoknadConfig => {
    if (process.env.NODE_ENV === "test") return configMap.localhost;
    if (!isValidDigisosEnvironment(miljo)) throw new Error(`Unknown SoknadMiljo: "${miljo}"`);
    return configMap[miljo];
};

export const digisosConfig = getConfig(process.env.NEXT_PUBLIC_DIGISOS_ENV);

export default digisosConfig;
export const useConfigFeatureFlags = (): FeatureFlags => digisosConfig.featureFlags;
