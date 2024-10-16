import {useNavigate} from "react-router";
import {useContext} from "react";
import {ValideringsContext} from "../../valideringContextProvider";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";

export const useSkjemaNavigation = (steg: number) => {
    const {
        state: {feil},
        dispatch,
    } = useContext(ValideringsContext);
    const navigate = useNavigate();

    const gotoPage = (newPage: number) => {
        if (newPage > steg) {
            if (feil.length) {
                dispatch({type: "visValideringsfeilPanel"});
                return;
            }
            logAmplitudeEvent("skjemasteg fullført", {steg}).then();
        }

        navigate(`../${newPage}`);
    };

    return {
        gotoPage,
    };
};
