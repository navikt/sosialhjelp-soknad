import {createContext, Dispatch, useReducer} from "react";
import {initialValideringState, ValideringActionTypes, valideringsReducer, ValideringState} from "./validering";

export const ValideringsContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(valideringsReducer, initialValideringState);

    return <ValideringsContext.Provider value={{state, dispatch}}>{children}</ValideringsContext.Provider>;
};
/**
 * Kopiert inn fra Redux for kompatibilitet, iom. at resten av Redux er fjernet.
 * Bør på sikt erstattes med validering per side.
 */
export const ValideringsContext = createContext<{
    state: ValideringState;
    dispatch: Dispatch<ValideringActionTypes>;
}>({
    state: initialValideringState,
    dispatch: () => {},
});
