import {logAmplitudeEvent} from "../../utils/amplitude";
import {clearAllValideringsfeil, visValideringsfeilPanel} from "../../../digisos/redux/validering/valideringActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {useNavigate} from "react-router";
import {useOpplysninger} from "../../../skjema/08-vedlegg/useOpplysninger";

export const useSkjemaNavigation = (steg: number) => {
    const {validering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {sorterte} = useOpplysninger();

    const uploadedDocumentsCount = useSelector((state: State) =>
        sorterte
            .map((opplysning) => opplysning.filer?.length)
            .reduce((total, fileCount) => (total ?? 0) + (fileCount ?? 0), 0)
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
