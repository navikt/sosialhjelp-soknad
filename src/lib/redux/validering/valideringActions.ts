import {
    ClearAllValideringsfeilAction,
    ClearValideringsfeilAction,
    SetValideringsfeilAction,
    ValideringActionTypeKeys,
    ValideringsFeilKode,
    VisValideringsfeilPanelAction,
} from "./valideringActionTypes";

export function visValideringsfeilPanel(): VisValideringsfeilPanelAction {
    return {
        type: ValideringActionTypeKeys.VIS_VALIDERINGSFEIL_PANEL,
    };
}

export function setValideringsfeil(feilkode: ValideringsFeilKode, faktumKey: string): SetValideringsfeilAction {
    return {
        type: ValideringActionTypeKeys.SET_VALIDERINGSFEIL,
        valideringsfeil: {faktumKey, feilkode},
    };
}

export function clearValideringsfeil(faktumKey: string): ClearValideringsfeilAction {
    return {
        type: ValideringActionTypeKeys.CLEAR_VALIDERINGSFEIL,
        faktumKey,
    };
}

export function clearAllValideringsfeil(): ClearAllValideringsfeilAction {
    return {
        type: ValideringActionTypeKeys.CLEAR_ALL_VALIDERINGSFEIL,
    };
}
