import {useTranslation} from "react-i18next";
import {useValideringContext} from "../../providers/useValideringContext.ts";

import {ValidationArea} from "../../ValidationArea";
import {DigisosLanguageKey} from "../../i18n/common.ts";

export const useValidering = (faktumKey: ValidationArea) => {
    const {t} = useTranslation("skjema");

    const {state, dispatch} = useValideringContext();

    const error = state.feil?.find((f) => f.faktumKey === faktumKey);

    const errorMessage = error ? (t(error.feilkode) as string) : undefined;

    const setError = (feilkode: DigisosLanguageKey | null) => {
        if (feilkode)
            dispatch({
                type: "setValideringsfeil",
                valideringsfeil: {faktumKey, feilkode},
            });
        else dispatch({type: "clearValideringsfeil", faktumKey});
    };

    return {error, errorMessage, setError};
};
