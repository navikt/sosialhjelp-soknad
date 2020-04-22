import {IntlShape} from "react-intl";

export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

export function erDev(): boolean {
    const url = window.location.href;
    return url.indexOf("localhost:") > 0 || url.indexOf("devillo.no:3000") > 0;
}

export function erMockMiljoEllerDev(): boolean {
    const url = window.location.href;
    if (erDev()) {
        return true;
    }
    return (
        url.indexOf("sosialhjelp-test.dev-sbs.nais.io") > 0 ||
        url.indexOf("soknadsosialhjelp-t1.nais.oera") > 0 ||
        url.indexOf(".dev-nav.no") > 0 ||
        url.indexOf(".labs.nais.io") > 0 || // Fanger også digisos.labs.nais.io
        url.indexOf("digisos-test.com") > 0
    );
}

export const now = (): number => {
    return new Date().getTime();
};

export interface IntlProps {
    intl: IntlShape;
}
