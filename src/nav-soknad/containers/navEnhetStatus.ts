import {HttpStatus} from "../utils/rest-utils";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import {clearAllValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {
    setShowServerError,
    visIkkePakobletPanel,
    visMidlertidigDeaktivertPanel,
} from "../../digisos/redux/soknad/soknadActions";
import {logWarning} from "../utils/loggerUtils";
import {Dispatch} from "redux";
import {hentValgtNavEnhet} from "../../generated/nav-enhet-ressurs/nav-enhet-ressurs";
import {NavEnhetFrontend} from "../../generated/model";

export const erAktiv = (e?: NavEnhetFrontend | null) =>
    !!e && !e.isMottakDeaktivert && !e.isMottakMidlertidigDeaktivert;
export const erMidlDeaktivert = (e: NavEnhetFrontend) => !e.isMottakDeaktivert && e.isMottakMidlertidigDeaktivert;

const fetchNavEnhet = async (dispatch: Dispatch, behandlingsId: string) => {
    try {
        const response = await hentValgtNavEnhet(behandlingsId);

        if (response === null) return null;

        return response;
    } catch (e: any) {
        if (e.message !== HttpStatus.UNAUTHORIZED) {
            logWarning("Henting/parsing av navEnhet feilet: " + e);
            dispatch(setShowServerError(true));
        }

        return null;
    }
};

export const navEnhetGyldigEllerIkkeSatt = async (behandlingsId: string, dispatch: Dispatch) => {
    const navEnhet = await fetchNavEnhet(dispatch, behandlingsId);

    if (!navEnhet) return true;

    dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, navEnhet));

    if (!erAktiv(navEnhet)) {
        if (erMidlDeaktivert(navEnhet)) {
            dispatch(visMidlertidigDeaktivertPanel(true));
        } else {
            dispatch(visIkkePakobletPanel(true));
        }
        return false;
    }

    dispatch(clearAllValideringsfeil());
    dispatch(visMidlertidigDeaktivertPanel(false));
    dispatch(visIkkePakobletPanel(false));
    return true;
};
