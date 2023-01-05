import {
    Samtykke,
    SoknadActionType,
    SoknadActionTypeKeys,
    VisIkkePakobletPanel,
    VisMidlertidigDeaktivertPanel,
    VisNedetidPanel,
} from "./soknadActionTypes";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {
    FornavnResponse,
    HarNyligInnsendteSoknaderResponse,
    NedetidResponse,
    PabegynteSoknaderResponse,
    TilgangResponse,
} from "./soknadTypes";
import {History} from "history";

export function startSoknadDone() {
    return {
        type: SoknadActionTypeKeys.START_SOKNAD_DONE,
    };
}

export function opprettSoknadFeilet() {
    return {
        type: SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET,
    };
}

export function opprettSoknadOk(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK,
        behandlingsId,
    };
}

// This function only sets the soknad REST status to Pending
export function hentSoknad(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SOKNAD,
        behandlingsId,
    };
}

// This function sets xsrfCookieReceived and behandlingsId
export function hentSoknadOk(xsrfCookieReceived: boolean, behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
        xsrfCookieReceived,
        behandlingsId,
    };
}

export function sendSoknadPending(): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SEND_SOKNAD_KNAPP_PENDING,
    };
}

export function sendSoknad(behandlingsId: string, history: History): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SEND_SOKNAD,
        behandlingsId,
        history,
    };
}

export function setSendSoknadServiceUnavailable(): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SET_SEND_SOKNAD_SERVICE_UNAVAILABLE,
    };
}

export function resetSendSoknadServiceUnavailable(): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.RESET_SEND_SOKNAD_SERVICE_UNAVAILABLE,
    };
}

export function sendSoknadOk(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SEND_SOKNAD_OK,
        behandlingsId,
    };
}

export function avbrytSoknad(): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.AVBRYT_SOKNAD,
    };
}

export function fortsettSoknad(): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.FORTSETT_SOKNAD,
    };
}

export function oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker: NavEnhet): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS,
        valgtSoknadsmottaker,
    };
}

export const getErSystemdataEndret = (behandlingsId: string): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET,
        behandlingsId,
    };
};

export const setErSystemdataEndret = (erSystemdataEndret: boolean): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET,
        erSystemdataEndret,
    };
};

export const oppdaterSamtykke = (
    behandlingsId: string,
    harSamtykket: boolean,
    samtykker: Samtykke[],
    history: History
): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.OPPDATER_SAMTYKKE,
        behandlingsId: behandlingsId,
        harSamtykket: harSamtykket,
        samtykker: samtykker,
        history,
    };
};

export function hentSamtykker(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SAMTYKKE,
        behandlingsId,
    };
}

export function hentSamtykkerOk(samtykker: Samtykke[]): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SAMTYKKE_OK,
        samtykker,
    };
}

export const lagreRessurserPaStore = (
    tilgangResponse: TilgangResponse,
    fornavnResponse: FornavnResponse
): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.LAGRE_TILGANG_OG_FORNAVN_PA_STORE,
        tilgangResponse,
        fornavnResponse,
    };
};

export const lagreNedetidPaStore = (nedetidResponse: NedetidResponse): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.LAGRE_NEDETID_PA_STORE,
        nedetidResponse,
    };
};

export const lagreHarNyligInnsendteSoknaderPaStore = (
    harNyligInnsendteSoknaderResponse: HarNyligInnsendteSoknaderResponse
): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.LAGRE_HAR_NYLIG_INNSENDTE_SOKNADER_PA_STORE,
        harNyligInnsendteSoknaderResponse,
    };
};

export const lagrePabegynteSoknaderPaStore = (pabegynteSoknader: PabegynteSoknaderResponse[]): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.LAGRE_PABEGYNTE_SOKNADER_PA_STORE,
        pabegynteSoknader,
    };
};

export const visSamtykkeInfo = (skalVises: boolean): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.VIS_SAMTYKKE_INFO,
        skalVises,
    };
};

export const visLasteOppVedleggModal = (skalVises: boolean): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL,
        skalVises,
    };
};

export function setShowServerError(shouldShow: boolean): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SHOW_SERVER_FEIL,
        shouldShow: shouldShow,
    };
}

export function showSendingFeiletPanel(shouldShow: boolean): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SHOW_SENDING_FEILET_PANEL,
        shouldShow: shouldShow,
    };
}

export function setShowPageNotFound(shouldShow: boolean): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET,
        shouldShow,
    };
}

export const visMidlertidigDeaktivertPanel = (shouldShow: boolean): VisMidlertidigDeaktivertPanel => {
    return {
        type: SoknadActionTypeKeys.VIS_MIDLERTIDIG_DEAKTIVERT_PANEL,
        shouldShow,
    };
};

export const showDowntimeError = (shouldShow: boolean): VisNedetidPanel => {
    return {
        type: SoknadActionTypeKeys.VIS_NEDETID_PANEL,
        shouldShow,
    };
};

export const visIkkePakobletPanel = (shouldShow: boolean): VisIkkePakobletPanel => {
    return {
        type: SoknadActionTypeKeys.VIS_IKKE_PAKOBLET_PANEL,
        shouldShow,
    };
};
