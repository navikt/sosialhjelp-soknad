import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {clearAllValideringsfeil, visValideringsfeilPanel} from "../../../digisos/redux/validering/valideringActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {useNavigate} from "react-router";

export const useSkjemaNavigation = (currentStepId: number) => {
    const {validering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoPage = (newPage: number) => {
        if (newPage < currentStepId) {
            dispatch(clearAllValideringsfeil());
        } else {
            if (validering.feil.length) {
                dispatch(visValideringsfeilPanel());
                return;
            }

            dispatch(clearAllValideringsfeil());

            logAmplitudeEvent("skjemasteg fullført", {
                ...createSkjemaEventData(),
                steg: currentStepId,
            });
        }

        navigate(`../${newPage}`);
    };

    return {
        gotoPage,
    };
};
