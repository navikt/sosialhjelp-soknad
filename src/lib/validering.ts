export type ValideringActionTypes =
    | {type: "visValideringsfeilPanel"}
    | {type: "setValideringsfeil"; valideringsfeil: Valideringsfeil}
    | {type: "clearValideringsfeil"; faktumKey: string}
    | {type: "clearAllValideringsfeil"};

export enum ValideringsFeilKode {
    FIL_EKSISTERER_IKKE = "validering.filEksistererIkke",
    MAX_LENGDE = "validering.maksLengde",
    ER_TALL = "validering.erTall",
    ER_FDATO = "validering.erFdato",
    ER_SAMVAERSGRAD = "validering.erSamvaersgrad",
}

export type Valideringsfeil = {
    faktumKey: string;
    feilkode: ValideringsFeilKode;
};

export interface ValideringState {
    feil: Valideringsfeil[];
    visValideringsfeil: boolean;
}

export const initialValideringState: ValideringState = {
    feil: [],
    visValideringsfeil: false,
};

const alreadyHasFeil = (feil: Valideringsfeil[], valideringsfeil: Valideringsfeil) =>
    feil.some(
        ({faktumKey, feilkode}) => faktumKey === valideringsfeil.faktumKey && feilkode === valideringsfeil.feilkode
    );

export const valideringsReducer = (state: ValideringState, action: ValideringActionTypes): ValideringState => {
    switch (action.type) {
        case "visValideringsfeilPanel":
            return {...state, visValideringsfeil: true};
        case "setValideringsfeil": {
            const {valideringsfeil} = action;
            const {feil} = state;

            if (valideringsfeil.faktumKey === "") throw new Error("FaktumKey is required");

            if (!alreadyHasFeil(feil, valideringsfeil)) feil.push(valideringsfeil);

            return {...state, feil};
        }
        case "clearValideringsfeil": {
            const feil = state.feil.filter(({faktumKey}) => faktumKey !== action.faktumKey);
            return {...state, feil, visValideringsfeil: feil.length === 0 ? false : state.visValideringsfeil};
        }
        case "clearAllValideringsfeil": {
            return {...state, feil: []};
        }
    }
};
