import {Dispatch} from "redux";
import {Valideringsfeil, ValideringsFeilKode} from "../../digisos/redux/reduxTypes";
import {onEndretValideringsfeil} from "../../digisos/redux/soknadsdata/soknadsdataContainerUtils";
import {clearValideringsfeil, setValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {maksLengde} from "./valideringer";

export const validateAndDispatchTextFieldMaxLength = (
    verdi: string,
    faktumKey: string,
    max: number,
    feil: Valideringsfeil[],
    dispatch: Dispatch
) => {
    const erInnenforMaksLengde = maksLengde(verdi, max);
    onEndretValideringsfeil(erInnenforMaksLengde ? undefined : ValideringsFeilKode.MAX_LENGDE, faktumKey, feil, () => {
        erInnenforMaksLengde
            ? dispatch(clearValideringsfeil(faktumKey))
            : dispatch(setValideringsfeil(ValideringsFeilKode.MAX_LENGDE, faktumKey));
    });
    return erInnenforMaksLengde;
};
