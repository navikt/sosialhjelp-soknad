import {DispatchAction} from "../reduxTypes";
import {lagreKommuneNummerInfoPaStore, lagreKommunerStatusPaStore} from "./kommunerStatusActions";
import {
    URL_KOMMUNE_NUMMER_INFO_DEV,
    URL_KOMMUNE_NUMMER_INFO_PROD,
    URL_KOMMUNE_TILGJENGELIGHET_DEV,
    URL_KOMMUNE_TILGJENGELIGHET_PROD
} from "../../../configuration";
import {showServerFeil} from "../soknad/soknadActions";
import {
    KommuneNummerJsonResponse, KommuneNummerOgDescription, KommunerStatusAction,
} from "./kommunerStatusTypes";
import {erDev} from "../../../nav-soknad/utils/rest-utils";

export const fetchTilgjengeligeKommuner = (dispatch: DispatchAction) => {
    fetch(getUrlKommuneTilgjengelighet())
        .then(response => response.json() as Promise<KommuneNummerJsonResponse[]>)
        .then(response => {
            if (response && response[0] && response[0].kommunenummer){
                dispatch(lagreKommunerStatusPaStore(response));
            } else {
                dispatch(showServerFeil(true))
            }
        })
        .catch(error => {
            dispatch(showServerFeil(true))
        });
};

export const fetchKommuneNummerInfo = (dispatch: DispatchAction) => {
    fetch(getUrlKommuneNummerInfo())
        .then((response) => {return response.json() as Promise<KommuneNummerJsonResponse>})
        .then((response: KommuneNummerJsonResponse) => {
            if (response && response.containeditems){
                dispatch(
                    lagreKommuneNummerInfoPaStore(
                        lagMapForKommuneNummerOgDescription(response) as KommuneNummerOgDescription[]
                    ) as KommunerStatusAction
                )
            } else {
                dispatch(showServerFeil(true))
            }
        })
        .catch(error => {
            dispatch(showServerFeil(true))
        });
};

export const getUrlKommuneNummerInfo = (): string => {
    return erDev() ? URL_KOMMUNE_NUMMER_INFO_DEV : URL_KOMMUNE_NUMMER_INFO_PROD
};

export const getUrlKommuneTilgjengelighet = () => {
    return erDev() ? URL_KOMMUNE_TILGJENGELIGHET_DEV : URL_KOMMUNE_TILGJENGELIGHET_PROD;
};

const lagMapForKommuneNummerOgDescription = (responseJson: KommuneNummerJsonResponse): KommuneNummerOgDescription[] => {
    const CONTAINED_ITEMS = "containeditems";
    const DESCRIPTION = "description";
    const LABEL = "label";
    const STATUS = "status";
    const kommuner: KommuneNummerOgDescription[] = [];
    const responseData = responseJson[CONTAINED_ITEMS].filter((item: any) => item[STATUS] === "Gyldig");
    responseData.map((item: any) => {
        return kommuner.push({
            nummer: item[LABEL],
            navn: item[DESCRIPTION]
        });
    });
    kommuner.sort((a: KommuneNummerOgDescription, b: KommuneNummerOgDescription) => {
        if (a.nummer > b.nummer) {
            return 1;
        } else if (a.nummer < b.nummer) {
            return -1;
        } else {
            return 0;
        }
    });
    return kommuner;
};
