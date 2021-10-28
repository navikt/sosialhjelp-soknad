import {NavigasjonActionTypes, NavigasjonActions} from "./navigasjonTypes";

export function tilStart(): NavigasjonActions {
    return {
        type: NavigasjonActionTypes.TIL_START,
    };
}
