import {NavigasjonActionTypes, NavigasjonActions} from "./navigasjonTypes";

export function navigerTilFinnDittNavKontor(): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR,
    };
}

export function navigerTilDittNav(): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_DITT_NAV,
    };
}

export function gaTilbake(stegnummer: number, behandlingsId: string): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.GA_TILBAKE,
        stegnummer,
        behandlingsId,
    };
}

export function gaVidere(stegnummer: number, behandlingsId: string): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.GA_VIDERE,
        stegnummer,
        behandlingsId,
    };
}

export function tilSteg(stegnummer: number, behandlingsId: string): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_STEG,
        stegnummer,
        behandlingsId,
    };
}

export function tilStart(): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_START,
    };
}

export function navigerTilKvittering(brukerbehandlingId: string): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_KVITTERING,
        brukerbehandlingId,
    };
}
