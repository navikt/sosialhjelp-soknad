import {useNavigate} from "react-router";
import {useContext} from "react";
import {ValideringsContext} from "../../valideringContextProvider";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {logWarning} from "../../log/loggerUtils";
//import {useAmplitude} from "../../amplitude/useAmplitude";

export const useSkjemaNavigation = (steg: number) => {
    const {
        state: {feil},
        dispatch,
    } = useContext(ValideringsContext);
    const navigate = useNavigate();
    //const {logEvent} = useAmplitude();

    const gotoPage = (newPage: number) => {
        if (newPage < steg) {
            dispatch({type: "clearAllValideringsfeil"});
        } else {
            if (feil.length) {
                dispatch({type: "visValideringsfeilPanel"});
                return;
            } else {
                dispatch({type: "clearAllValideringsfeil"});
                logAmplitudeEvent("skjemasteg fullført", {steg}).catch((e) => logWarning(`Amplitude error: ${e}`));
            }
        }

        navigate(`../${newPage}`);
    };

    return {
        gotoPage,
    };
};
