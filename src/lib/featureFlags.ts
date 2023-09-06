export type FeatureFlags = {
    // Bruk ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;

    // Ny versjon av Personalia oppsummering
    nyOppsummering: boolean;

    // Ny NAV-kontor-visning i oppsummering
    oppsummeringNavEnhet: boolean;

    // Tilgjengeliggjør flere filformater
    tilgjengeliggjorFlereFilformater: boolean;

    // Tilgjengeliggjør språkvelger
    tilgengeliggjorSprakvelger: boolean;
};

export const useFeatureFlags = (): FeatureFlags => {
    if (["mock", "localhost"].includes(process.env.REACT_APP_DIGISOS_ENV ?? "")) {
        return {
            begrunnelseNyTekst: true,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
            tilgjengeliggjorFlereFilformater: true,
            tilgengeliggjorSprakvelger: true,
        };
    }
    return {
        begrunnelseNyTekst: false,
        nyOppsummering: false,
        oppsummeringNavEnhet: false,
        tilgjengeliggjorFlereFilformater: false,
        tilgengeliggjorSprakvelger: true,
    };
};
