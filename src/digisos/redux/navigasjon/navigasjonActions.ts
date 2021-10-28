import {NavigasjonActionTypes, NavigasjonActions} from "./navigasjonTypes";

export function gaTilbake(stegnummer: number, behandlingsId: string): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.GA_TILBAKE,
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
