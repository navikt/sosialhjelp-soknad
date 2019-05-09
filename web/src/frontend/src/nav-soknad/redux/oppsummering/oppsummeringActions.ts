import {OppsummeringActionTypeKeys, OppsummeringActionTypes} from "./oppsummeringTypes";

export function bekreftOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING
    };
}

export function setVisBekreftMangler(visBekreftMangler: boolean): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER,
        visBekreftMangler
    };
}

export function hentOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.HENT_OPPSUMMERING
    };
}

export const getErSystemdataEndret = (): OppsummeringActionTypes => {
    return {
        type: OppsummeringActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET
    };
};

export const setErSystemdataEndret = (erSystemdataEndret: boolean): OppsummeringActionTypes => {
    return {
        type: OppsummeringActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET,
        erSystemdataEndret
    }
};

export function setOppsumering(oppsummering: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_OPPSUMMERING,
        oppsummering
    };
}

export function hentOppsumeringFeilet(feilmelding: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.FEILET,
        feilmelding
    };
}
