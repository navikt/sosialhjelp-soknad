import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {erAktiv} from "../../containers/navEnhetStatus";
import {
    clearAllValideringsfeil,
    clearValideringsfeil,
    setValideringsfeil,
    visValideringsfeilPanel,
} from "../../../digisos/redux/validering/valideringActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {logInfo} from "../../utils/loggerUtils";
import {useNavigate} from "react-router";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";
import {NavEnhetFrontend} from "../../../generated/model";
import {useEffect} from "react";

export const useSkjemaNavigation = (currentStepId: number) => {
    const {validering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const behandlingsId = useBehandlingsId();

    const {data: adresseData} = useHentAdresser(behandlingsId);
    const valgtNavEnhet = adresseData?.navEnhet;

    // Midlertidig hack i påvente av mer ordentlig validering
    useEffect(() => {
        if (erAktiv(valgtNavEnhet)) dispatch(clearValideringsfeil("soknadsmottaker"));
    }, [valgtNavEnhet, dispatch]);

    const checkNavEnhet = (valgtNavEnhet?: NavEnhetFrontend) => {
        if (!valgtNavEnhet) {
            dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
            dispatch(visValideringsfeilPanel());
            return false;
        } else if (!erAktiv(valgtNavEnhet)) {
            if (!valgtNavEnhet || (!valgtNavEnhet.enhetsnavn && !valgtNavEnhet.enhetsnr)) {
                logInfo("Ingen navenhet valgt");
            } else {
                logInfo(`Ugyldig navenhet valgt: ${valgtNavEnhet.enhetsnr} ${valgtNavEnhet.enhetsnavn}`);
            }

            return false;
        } else {
            dispatch(clearAllValideringsfeil());

            return true;
        }
    };

    const gotoPage = (newPage: number) => {
        if (newPage < currentStepId) {
            dispatch(clearAllValideringsfeil());
        } else {
            if (!checkNavEnhet(valgtNavEnhet)) return;

            if (validering.feil.length) {
                dispatch(visValideringsfeilPanel());
                return;
            }

            dispatch(clearAllValideringsfeil());

            logAmplitudeEvent("skjemasteg fullført", {
                ...createSkjemaEventData(),
                steg: currentStepId,
            });

            navigate(`../${newPage}`);
        }

        if (!checkNavEnhet(valgtNavEnhet)) return;

        navigate(`../${newPage}`);
    };

    const kanGaTilSkjemasteg = (): boolean => checkNavEnhet(valgtNavEnhet);

    return {
        gotoPage,
        kanGaTilSkjemasteg,
    };
};
