import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useOpplysninger} from "../../.././pages/08-vedlegg/useOpplysninger";
import {State} from "../../redux/reducers";
import {clearAllValideringsfeil, visValideringsfeilPanel} from "../../redux/validering/valideringActions";
import {logAmplitudeEvent} from "../../../lib/utils/amplitude";

export const useSkjemaNavigation = (steg: number) => {
    const feil = useSelector((state: State) => state.validering.feil);
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
            if (feil.length) {
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
