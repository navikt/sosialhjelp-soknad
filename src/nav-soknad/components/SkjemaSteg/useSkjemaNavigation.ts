import {logAmplitudeEvent} from "../../utils/amplitude";
import {clearAllValideringsfeil, visValideringsfeilPanel} from "../../../digisos/redux/validering/valideringActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {useNavigate} from "react-router";
import {Opplysning} from "../../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";

export const useSkjemaNavigation = (steg: number) => {
    const {validering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const uploadedDocumentsCount = useSelector((state: State) =>
        state.okonomiskeOpplysninger.opplysningerSortert
            .map((opplysning: Opplysning) => opplysning.filer.length)
            .reduce((total: number, fileCount: number) => total + fileCount)
    );

    const gotoPage = (newPage: number) => {
        if (newPage < steg) {
            dispatch(clearAllValideringsfeil());
        } else {
            if (validering.feil.length) {
                dispatch(visValideringsfeilPanel());
            } else {
                if (steg === 8 && uploadedDocumentsCount === 0) {
                    logAmplitudeEvent("skjemasteg 8 - no documents uploaded");
                }
                dispatch(clearAllValideringsfeil());
                logAmplitudeEvent("skjemasteg fullført", {steg});
            }
        }

        navigate(`../${newPage}`);
    };

    return {
        gotoPage,
    };
};
