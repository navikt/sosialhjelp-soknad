export type FeatureFlags = {
    // Bruk ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;

    // Ny tekst i Oppsummering
    viStolerPaaDeg: boolean;

    // Ny versjon av Personalia oppsummering
    nyOppsummering: boolean;

    // Ny NAV-kontor-visning i oppsummering
    oppsummeringNavEnhet: boolean;
};

export const useFeatureFlags = (): FeatureFlags => {
    if (["mock", "localhost"].includes(process.env.REACT_APP_ENVIRONMENT ?? "")) {
        return {
            begrunnelseNyTekst: true,
            viStolerPaaDeg: true,
            nyOppsummering: false,
            oppsummeringNavEnhet: process.env.REACT_APP_ENVIRONMENT === "localhost",
        };
    }
    return {
        begrunnelseNyTekst: false,
        viStolerPaaDeg: false,
        nyOppsummering: false,
        oppsummeringNavEnhet: false,
    };
};
