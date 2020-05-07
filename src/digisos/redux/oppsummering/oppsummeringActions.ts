import {OppsummeringActionTypeKeys, OppsummeringActionTypes} from "./oppsummeringTypes";

export function bekreftOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING,
    };
}

export function setVisBekreftMangler(visBekreftMangler: boolean): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER,
        visBekreftMangler,
    };
}

export function hentOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.HENT_OPPSUMMERING,
    };
}

export function setOppsumering(oppsummering: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_OPPSUMMERING,
        oppsummering,
    };
}

export function hentOppsumeringFeilet(feilmelding: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.FEILET,
        feilmelding,
    };
}
