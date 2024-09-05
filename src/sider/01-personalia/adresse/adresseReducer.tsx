import {AdresseFrontend, AdresserFrontend, AdresserFrontendValg, NavEnhetFrontend} from "../../../generated/model";

export type AdresseState =
    | {mode: "uninitialized"}
    // Dersom valg er "soknad" men soknad er null, får vi 500 fra API.
    // derav denne halv-committed state.
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
            // backend flytter valgt adresse til "soknad", så dersom den ikke er valgt må vi nullstille.
            soknad: action.backendState.valg === "soknad" ? action.backendState.soknad : null,
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
