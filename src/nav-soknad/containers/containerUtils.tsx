import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
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

export const erPaStegEnOgValgtNavEnhetErUgyldig = (stegnummer: number, valgtNavEnhet: NavEnhet | null): boolean => {
    return (
        stegnummer === 1 &&
        (!valgtNavEnhet || valgtNavEnhet.isMottakDeaktivert || valgtNavEnhet.isMottakMidlertidigDeaktivert)
    );
};

export const valgtNavKontorErGyldig = (valgtNavKontor: NavEnhet | undefined): boolean => {
    return (
        valgtNavKontor !== undefined &&
        !valgtNavKontor.isMottakDeaktivert &&
        !valgtNavKontor.isMottakMidlertidigDeaktivert
    );
};

export const valgtNavKontorErGyldigMenMottakErMidlertidigDeaktivert = (
    valgtNavKontor: NavEnhet | undefined
): boolean => {
    return (
        valgtNavKontor !== undefined &&
        !valgtNavKontor.isMottakDeaktivert &&
        valgtNavKontor.isMottakMidlertidigDeaktivert
    );
};

export const responseIsOfTypeNavEnhet = (response: any) => {
    if (response === null || response === undefined || typeof response === "string") {
        return false;
    }
    const navEnhet: NavEnhet = response;
    return navEnhet.kommunenavn != null && navEnhet.kommuneNr != null;
};

export const sjekkOmValgtNavEnhetErGyldig = (
    behandlingsId: string,
    dispatch: Dispatch,
    callbackHvisGyldigEllerIkkeSatt: () => void
) => {
    fetchToJson(soknadsdataUrl(behandlingsId, SoknadsSti.VALGT_NAV_ENHET))
        .then((response) => {
            if (responseIsOfTypeNavEnhet(response)) {
                const valgtNavKontor: NavEnhet | undefined = response as NavEnhet;
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, valgtNavKontor));

                if (valgtNavKontorErGyldig(valgtNavKontor)) {
                    dispatch(clearAllValideringsfeil());
                    dispatch(visMidlertidigDeaktivertPanel(false));
                    dispatch(visIkkePakobletPanel(false));
                    callbackHvisGyldigEllerIkkeSatt();
                } else if (valgtNavKontorErGyldigMenMottakErMidlertidigDeaktivert(valgtNavKontor)) {
                    dispatch(visMidlertidigDeaktivertPanel(true));
                } else {
                    dispatch(visIkkePakobletPanel(true));
                }
            } else {
                callbackHvisGyldigEllerIkkeSatt();
            }
        })
        .catch((reason: any) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                return;
            }
            logWarning("Henting av navEnhet feilet: " + reason);
            dispatch(showServerFeil(true));
        });
};
