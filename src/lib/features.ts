export type FeatureFlags = {
    // Ny tekst i Begrunnelse
    begrunnelseNyTekst: boolean;
};

export const useFeatureFlags = (): FeatureFlags => {
    if (["mock", "localhost"].includes(process.env.REACT_APP_ENVIRONMENT ?? "")) {
        return {begrunnelseNyTekst: true};
    }
    return {begrunnelseNyTekst: false};
};
