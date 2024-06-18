import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {ValideringsContext} from "../../valideringContextProvider";

import {ValidationArea} from "../../ValidationArea";

export const useValidering = (faktumKey: ValidationArea) => {
    const {t} = useTranslation("skjema");

    const {state, dispatch} = useContext(ValideringsContext);

    const error = state.feil?.find((f) => f.faktumKey === faktumKey);

    const errorMessage = error ? (t(error.feilkode) as string) : undefined;

    const setError = (feilkode: string | null) => {
        if (feilkode)
            dispatch({
                type: "setValideringsfeil",
                valideringsfeil: {faktumKey, feilkode},
            });
        else dispatch({type: "clearValideringsfeil", faktumKey});
    };

    return {error, errorMessage, setError};
};
