export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

export function erDev(): boolean {
    const url = window.location.href;
    return url.indexOf("localhost:") > 0;
}

export function erMockMiljoEllerDev(): boolean {
    const url = window.location.href;
    if (erDev()) {
        return true;
    }
    return (
        url.indexOf("sosialhjelp-test.dev-sbs.nais.io") > 0 || erMockAltMiljo() || url.indexOf(".labs.nais.io") > 0 // Fanger også digisos.labs.nais.io
    );
}

export function erMockAltMiljo(): boolean {
    const url = window.location.href;
    return (
        url.indexOf("sosialhjelp-soknad-gcp.dev.nav.no") > 0 ||
        url.indexOf("digisos-gcp.dev.nav.no") > 0 ||
        url.indexOf("sosialhjelp-soknad-mock.dev.nav.no") > 0 ||
        url.indexOf("digisos.ekstern.dev.nav.no") > 0 // Fanger ikke opp www-q*.dev.nav.no
    );
}

export const now = (): number => {
    return new Date().getTime();
};
