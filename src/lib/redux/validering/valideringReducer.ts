import {ValideringActionTypeKeys, Valideringsfeil} from "../validering/valideringActionTypes";
import {ValideringActionTypes} from "./valideringActionTypes";

export interface ValideringState {
    feil: Valideringsfeil[];
    visValideringsfeil: boolean;
}

const defaultState: ValideringState = {
    feil: [],
    visValideringsfeil: false,
};

export const valideringsReducer = (
    state: ValideringState = defaultState,
    action: ValideringActionTypes
): ValideringState => {
    switch (action.type) {
        case ValideringActionTypeKeys.VIS_VALIDERINGSFEIL_PANEL:
            return {
                ...state,
                visValideringsfeil: true,
            };
        case ValideringActionTypeKeys.SKJUL_VALIDERINGSFEIL_PANEL:
            return {
                ...state,
                visValideringsfeil: false,
            };
        case ValideringActionTypeKeys.SET_VALIDERINGSFEIL: {
            const previousFeil: Valideringsfeil[] = state.feil;
            const nyFeilSomSkalRegistreres = action.valideringsfeil;
            const feilUpdated: Valideringsfeil[] = previousFeil.map((f) => f);
            if (
                nyFeilSomSkalRegistreres &&
                nyFeilSomSkalRegistreres.faktumKey &&
                nyFeilSomSkalRegistreres.faktumKey !== "" &&
                nyFeilSomSkalRegistreres.feilkode
            ) {
                const feilAlledeRegistrert: Valideringsfeil | undefined = previousFeil.find(
                    (f) =>
                        f.faktumKey === nyFeilSomSkalRegistreres.faktumKey &&
                        f.feilkode === nyFeilSomSkalRegistreres.feilkode
                );
                if (feilAlledeRegistrert === undefined) {
                    feilUpdated.push(nyFeilSomSkalRegistreres);
                }
            }
            return {
                ...state,
                feil: feilUpdated,
            };
        }
        case ValideringActionTypeKeys.CLEAR_VALIDERINGSFEIL: {
            const feil: Valideringsfeil[] = state.feil;
            const feilUpdated: Valideringsfeil[] = feil.filter((f) => {
                return f.faktumKey !== action.faktumKey;
            });
            return {
                ...state,
                feil: feilUpdated,
                visValideringsfeil: feilUpdated.length === 0 ? false : state.visValideringsfeil,
            };
        }
        case ValideringActionTypeKeys.CLEAR_ALL_VALIDERINGSFEIL: {
            return {
                ...state,
                feil: [],
            };
        }
        default:
            return state;
    }
};
