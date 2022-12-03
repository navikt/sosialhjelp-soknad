import {NavEnhet, NavEnhetSchema} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {fetchToJson, HttpStatus} from "../utils/rest-utils";
import {soknadsdataUrl} from "../../digisos/redux/soknadsdata/soknadsdataActions";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import {clearAllValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {
    showServerFeil,
    visIkkePakobletPanel,
    visMidlertidigDeaktivertPanel,
} from "../../digisos/redux/soknad/soknadActions";
import {logWarning} from "../utils/loggerUtils";
import {Dispatch} from "redux";

export const erAktiv = (e: NavEnhet) => !e.isMottakDeaktivert && !e.isMottakMidlertidigDeaktivert;
export const erMidlDeaktivert = (e: NavEnhet) => !e.isMottakDeaktivert && e.isMottakMidlertidigDeaktivert;

const fetchNavEnhet = async (dispatch: Dispatch, behandlingsId: string) => {
    try {
        const response = await fetchToJson(soknadsdataUrl(behandlingsId, SoknadsSti.VALGT_NAV_ENHET));

        if (response === null) return null;

        return NavEnhetSchema.parse(response);
    } catch (e: any) {
        if (e.message !== HttpStatus.UNAUTHORIZED) {
            logWarning("Henting/parsing av navEnhet feilet: " + e);
            dispatch(showServerFeil(true));
        }

        return null;
    }
};

export const navEnhetGyldigEllerIkkeSatt = async (behandlingsId: string, dispatch: Dispatch) => {
    const navEnhet = await fetchNavEnhet(dispatch, behandlingsId);

    if (navEnhet === null) return true;

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
