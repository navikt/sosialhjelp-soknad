import {REST_STATUS} from "../soknad/soknadTypes";

export interface KommuneInfoState {
    kommunerRestStatus: REST_STATUS;
    tilgjengelighet: KommunerTilgjengelighetJsonResponse[];
    restStatusKommuneNummerInfo: REST_STATUS;
    kommuneNummerInformasjon: KommuneNummerOgDescription[];
}

export enum KommunerStatusActionTypeKeys {
    LAGRE_KOMMUNER_STATUS_PA_STORE = "kommunerStatus/LAGRE_KOMMUNER_STATUS_PA_STORE",
    LAGRE_KOMMUNE_NUMMER_INFO_PA_STORE = "kommunerStatus/LAGRE_KOMMUNE_NUMMER_INFO_PA_STORE"
}

export type KommunerStatusAction =
    | LagreKommunerPaStore
    | LagreKommuneNummerInfoPaStore

interface LagreKommunerPaStore {
    type: KommunerStatusActionTypeKeys.LAGRE_KOMMUNER_STATUS_PA_STORE;
    data: any;
}

interface LagreKommuneNummerInfoPaStore {
    type: KommunerStatusActionTypeKeys.LAGRE_KOMMUNE_NUMMER_INFO_PA_STORE;
    kommuneNummerInfo: KommuneNummerOgDescription[];
}

export interface KommunerTilgjengelighetJsonResponse {
    kommunenummer: string;
    kanMottaSoknader: boolean;
    kanOppdatereStatus: boolean;
    harMidlertidigDeaktivertMottak: boolean;
    harMidlertidigDeaktivertOppdateringer: boolean;
}


export interface KommuneNummerOgDescription {
    nummer: string,
    navn: string
}

export interface KommuneNummerJsonResponse {
    containeditems: [],
    [key: string]: any;
}

export interface KommuneNummerContainedItems {
    label: string,
    status: string,
    description: string
    [key: string]: any;
}