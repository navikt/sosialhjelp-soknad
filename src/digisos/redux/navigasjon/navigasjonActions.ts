import {NavigasjonActionTypes, NavigasjonActions} from "./navigasjonTypes";

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
