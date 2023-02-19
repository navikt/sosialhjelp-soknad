export type FeatureFlags = {
    // Bruk ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;

    // Ny tekst i Oppsummering
    viStolerPaaDeg: boolean;
};

export const useFeatureFlags = (): FeatureFlags => {
    if (["mock", "localhost"].includes(process.env.REACT_APP_ENVIRONMENT ?? "")) {
        return {
            begrunnelseNyTekst: true,
            viStolerPaaDeg: true,
        };
    }
    return {
        begrunnelseNyTekst: false,
        viStolerPaaDeg: false,
    };
};
