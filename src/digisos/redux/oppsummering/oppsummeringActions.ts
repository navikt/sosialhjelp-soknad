import {OppsummeringActionTypeKeys, OppsummeringActionTypes, NyOppsummeringResponse} from "./oppsummeringTypes";

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

export function hentOppsumeringFeilet(feilmelding: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.FEILET,
        feilmelding,
    };
}

export function setNyOppsummering(response: NyOppsummeringResponse): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING,
        response,
    };
}
