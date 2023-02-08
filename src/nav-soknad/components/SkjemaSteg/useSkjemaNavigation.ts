import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {visIkkePakobletPanel, visMidlertidigDeaktivertPanel} from "../../../digisos/redux/soknad/soknadActions";
import {erAktiv, erMidlDeaktivert} from "../../containers/navEnhetStatus";
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
import {SkjemaSteg} from "./digisosSkjema";
import {useNavigate} from "react-router";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";
import {NavEnhetFrontend} from "../../../generated/model";
import {useEffect} from "react";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";

export const useSkjemaNavigation = (currentStepId: number) => {
    const {validering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const behandlingsId = useBehandlingsId();

    const {data: adresseData} = useHentAdresser(behandlingsId);
    const valgtNavEnhet = adresseData?.navEnhet;

    // Midlertidig hack i påvente av mer ordentlig validering
    useEffect(() => {
        if (valgtNavEnhet) dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, valgtNavEnhet));

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

            if (erMidlDeaktivert(valgtNavEnhet)) {
                dispatch(visMidlertidigDeaktivertPanel(true));
            } else {
                dispatch(visIkkePakobletPanel(true));
            }
            return false;
        } else {
            dispatch(clearAllValideringsfeil());
            dispatch(visMidlertidigDeaktivertPanel(false));
            dispatch(visIkkePakobletPanel(false));
            return true;
        }
    };

    const goToStep = (newStep: number) => {
        if (newStep < currentStepId) {
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

            navigate(`../${newStep}`);
        }

        if (!checkNavEnhet(valgtNavEnhet)) return;

        navigate(`../${newStep}`);
    };

    const kanGaTilSkjemasteg = (aktivtSteg: SkjemaSteg): boolean => {
        return checkNavEnhet(valgtNavEnhet);
    };

    return {
        goToStep,
        kanGaTilSkjemasteg,
    };
};
