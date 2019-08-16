import {Dispatch, Valideringsfeil} from "../reduxTypes";
import {fetchGet, responseToJson, sjekkStatusKodeSaga, statusCodeOk} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    OpplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerBackend,
    Opplysning,
    OpplysningType
} from "./opplysningerTypes";
import {getOpplysningerUrl} from "./opplysningerUtils";
import {loggFeil} from "../navlogger/navloggerActions";
import {TilgangApiResponse} from "../tilgang/tilgangTypes";
import {hentetTilgang} from "../tilgang/tilgangActions";


export const gotDataFromBackend = (response: OpplysningerBackend): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response
    }
};

export const updateOpplysning = (opplysning: Opplysning): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING,
        opplysning
    }
};

export const settFilOpplastingPending = (opplysningType: OpplysningType): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING,
        opplysningType,
    }
};

export const settFilOpplastingFerdig = (opplysningType: OpplysningType): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG,
        opplysningType,
    }
};

export function hentOpplysninger(behandlingsId: string) {
    return (dispatch: Dispatch) => {
        fetchGet(getOpplysningerUrl(behandlingsId))
            .then((response: Response) => {
                sjekkStatusKodeSaga(response);
                if(statusCodeOk(response)){
                    if (response.status === 200){
                        response.json().then(jsonResponse => {
                            dispatch(gotDataFromBackend(jsonResponse));
                        })
                    }
                }
            }).catch((reason: any) => {
            dispatch(loggFeil("Henting av økonomiske opplysninger feilet: " + reason));
            dispatch(navigerTilServerfeil());
        });
    }
}

export const lagreOpplysningHvisGyldigAction = (
    behandlingsId: string,
    opplysning: Opplysning,
    feil: Valideringsfeil[]
): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG,
        behandlingsId,
        opplysning,
        feil
    }
};
