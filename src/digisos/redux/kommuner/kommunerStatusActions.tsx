import {KommuneNummerOgDescription, KommunerStatusAction, KommunerStatusActionTypeKeys} from "./kommunerStatusTypes";

export const lagreKommunerStatusPaStore: (data: any) => KommunerStatusAction = (data) => {
    return {
        type: KommunerStatusActionTypeKeys.LAGRE_KOMMUNER_STATUS_PA_STORE,
        data
    }
};

export const lagreKommuneNummerInfoPaStore: (kommuneNummerInfo: KommuneNummerOgDescription[]) => KommunerStatusAction = (kommuneNummerInfo) => {
    return {
        type: KommunerStatusActionTypeKeys.LAGRE_KOMMUNE_NUMMER_INFO_PA_STORE,
        kommuneNummerInfo
    }
};