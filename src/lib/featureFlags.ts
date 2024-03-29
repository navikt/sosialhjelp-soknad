export type FeatureFlags = {
    // Bruk ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;

    // Ny versjon av Personalia oppsummering
    nyOppsummering: boolean;

    // Ny NAV-kontor-visning i oppsummering
    oppsummeringNavEnhet: boolean;
};

export const useFeatureFlags = (): FeatureFlags => {
    if (["mock", "localhost"].includes(import.meta.env.REACT_APP_DIGISOS_ENV ?? "")) {
        return {
            begrunnelseNyTekst: true,
            nyOppsummering: false,
            oppsummeringNavEnhet: false,
        };
    }
    return {
        begrunnelseNyTekst: false,
        nyOppsummering: false,
        oppsummeringNavEnhet: false,
    };
};
