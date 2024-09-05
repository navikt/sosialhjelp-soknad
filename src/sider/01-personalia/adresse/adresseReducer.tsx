import {AdresseFrontend, AdresserFrontend, AdresserFrontendValg, NavEnhetFrontend} from "../../../generated/model";

export type AdresseState =
    | {mode: "uninitialized"}
    | ({mode: "uncommittedChanges"} & AdresserFrontend)
    | ({mode: "synchronized"} & AdresserFrontend);

type AdresseAction =
    | {type: "synchronize"; backendState: AdresserFrontend}
    | {type: "adresseValg"; adresseValg: AdresserFrontendValg}
    | {
          type: "adresseSoknadChange";
          soknad: AdresseFrontend;
          navEnhet: NavEnhetFrontend;
      }
    | {type: "setNavEnhet"; navEnhet: NavEnhetFrontend | undefined};

export const adresseReducer = (state: AdresseState, action: AdresseAction): AdresseState => {
    const {type} = action;
    if (type == "synchronize")
        return {
            ...state,
            ...action.backendState,
            mode: "synchronized",
        };

    if (state.mode === "uninitialized") return state;

    switch (type) {
        case "adresseValg":
            if (action.adresseValg === "soknad")
                return {
                    ...state,
                    navEnhet: undefined,
                    mode: "uncommittedChanges",
                    valg: action.adresseValg,
                };
            return {
                ...state,
                mode: "synchronized",
                soknad: null,
                valg: action.adresseValg,
            };
        case "adresseSoknadChange":
            return {
                ...state,
                navEnhet: action.navEnhet,
                soknad: action.soknad,
                mode: "synchronized",
            };
        case "setNavEnhet":
            return {...state, navEnhet: action.navEnhet};
        default:
            return state;
    }
};
