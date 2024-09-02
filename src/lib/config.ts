const SoknadMiljoTypes = ["localhost", "dev-sbs", "mock", "prod-sbs"] as const;

type FeatureFlags = {
    // Bruk ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;

    // Ny versjon av Personalia oppsummering
    nyOppsummering: boolean;

    // Ny NAV-kontor-visning i oppsummering
    oppsummeringNavEnhet: boolean;

    // Vis valg for søknadstype ved opprettelse
    soknadstypeValg: boolean;
};

type SoknadMiljo = (typeof SoknadMiljoTypes)[number];

type SoknadConfig = {
    showDevPanel: boolean;
    logLocally: boolean;
    withCredentials: boolean;

    baseURL: string;
    innsynURL: string;
    minSideURL: string;
    logoutURL: string;

    featureFlags: FeatureFlags;

    faro: {
        url: string;
    };
};

const isValidDigisosEnvironment = (miljo: unknown): miljo is SoknadMiljo =>
    SoknadMiljoTypes.includes(miljo as SoknadMiljo);

const configMap: Record<SoknadMiljo, SoknadConfig> = {
    localhost: {
        featureFlags: {
            begrunnelseNyTekst: true,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
        },
        logLocally: true,
        showDevPanel: true,
        withCredentials: true,

        baseURL: "http://localhost:8181/sosialhjelp/soknad-api/",
        innsynURL: "http://localhost:3000/sosialhjelp/innsyn/",
        minSideURL: "https://www.nav.no/minside/",
        logoutURL: "http://localhost:3008/",
        faro: {
            url: "http://localhost:12347/collect",
        },
    },
    mock: {
        featureFlags: {
            begrunnelseNyTekst: true,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
        },
        showDevPanel: false,
        logLocally: false,
        withCredentials: true,
        baseURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad-api/",
        innsynURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/innsyn/",
        minSideURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
        logoutURL: "https://sosialhjelp-mock-alt-mock.ekstern.dev.nav.no/sosialhjelp/mock-alt/",
        faro: {
            url: "http://localhost:12347/collect", // FIXME
        },
    },
    "dev-sbs": {
        featureFlags: {
            begrunnelseNyTekst: false,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: true,
        },
        showDevPanel: true,
        logLocally: false,
        withCredentials: false,
        baseURL: "https://www-q0.dev.nav.no/sosialhjelp/login-api/soknad-api/",
        innsynURL: "https://www-q0.dev.nav.no/sosialhjelp/innsyn/",
        minSideURL: "https://www.dev.nav.no/minside/",
        logoutURL: "https://loginservice.dev.nav.no/slo",
        faro: {
            url: "https://telemetry.ekstern.dev.nav.no/collect",
        },
    },
    "prod-sbs": {
        featureFlags: {
            begrunnelseNyTekst: false,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            soknadstypeValg: false,
        },
        showDevPanel: false,
        logLocally: false,
        withCredentials: false,
        baseURL: "https://www.nav.no/sosialhjelp/login-api/soknad-api/",
        innsynURL: "https://www.nav.no/sosialhjelp/innsyn/",
        minSideURL: "https://www.nav.no/minside/",
        logoutURL: "https://loginservice.nav.no/slo",
        faro: {
            url: "https://telemetry.nav.no/collect",
        },
    },
};

const getConfig = (miljo: unknown): SoknadConfig => {
    if (!isValidDigisosEnvironment(miljo)) throw new Error(`Unknown SoknadMiljo ${miljo}`);
    return configMap[miljo];
};

export const digisosConfig = getConfig(process.env.NEXT_PUBLIC_DIGISOS_ENV);

export default digisosConfig;
export const useFeatureFlags = (): FeatureFlags => digisosConfig.featureFlags;
