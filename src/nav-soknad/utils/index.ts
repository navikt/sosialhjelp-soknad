export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

export function erDev(): boolean {
    const url = window.location.href;
    return url.indexOf("localhost:") > 0;
}

export function erMockMiljoEllerDev(): boolean {
    if (erDev()) {
        return true;
    }
    return erMockAltMiljo();
}

export function erMockAltMiljo(): boolean {
    const url = window.location.href;
    return (
        url.indexOf("sosialhjelp-soknad-mock.dev.nav.no") > 0 || url.indexOf("digisos.ekstern.dev.nav.no") > 0 // Fanger ikke opp www-q*.dev.nav.no
    );
}

export const now = (): number => {
    return new Date().getTime();
};
