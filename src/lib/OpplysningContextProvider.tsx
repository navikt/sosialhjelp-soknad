import React, {createContext, useContext, useReducer} from "react";
import {VedleggFrontend} from "../generated/model";

// Define types for actions
type Action =
    | {type: "SET_RADER"; payload: VedleggFrontend["rader"]}
    | {type: "ADD_ROW"; payload: any}
    | {type: "REMOVE_ROW"; index: number};

// Define initial state and reducer function
interface State {
    rader: VedleggFrontend["rader"];
}

const initialState: State = {
    rader: [], // Add any initial form state if needed
};

const OpplysningContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => {},
});

function opplysningReducer(state: State, action: Action): State {
    const rader = state?.rader ?? [];
    switch (action.type) {
        case "SET_RADER":
            return {...state, rader: action.payload};
        case "ADD_ROW":
            return {...state, rader: [...rader, action.payload]};
        case "REMOVE_ROW":
            return {...state, rader: rader.filter((_, i) => i !== action.index)};
        default:
            return state;
    }
}

export const OpplysningProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(opplysningReducer, initialState);
    return <OpplysningContext.Provider value={{state, dispatch}}>{children}</OpplysningContext.Provider>;
};

export const useOpplysningContext = () => useContext(OpplysningContext);
