import {fetchPost, fetchPut, fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {oppdaterSoknadsdataSti, settRestStatus, SoknadsdataType} from "./soknadsdataReducer";
import {REST_STATUS} from "../soknad/soknadTypes";
import {showServerFeil} from "../soknad/soknadActions";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";

export const soknadsdataUrl = (brukerBehandlingId: string, sti: string): string =>
    `soknader/${brukerBehandlingId}/${sti}`;

export function hentSoknadsdata(brukerBehandlingId: string, sti: string, dispatch: Dispatch) {
    dispatch(settRestStatus(sti, REST_STATUS.PENDING));
    fetchToJson(soknadsdataUrl(brukerBehandlingId, sti))
        .then((response: any) => {
            dispatch(oppdaterSoknadsdataSti(sti, response));
            dispatch(settRestStatus(sti, REST_STATUS.OK));
        })
        .catch((reason: any) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                return;
            }
            logWarning("Henting av soknadsdata feilet: " + reason);
            dispatch(settRestStatus(sti, REST_STATUS.FEILET));
            dispatch(showServerFeil(true));
        });
}

export function lagreSoknadsdata(
    brukerBehandlingId: string,
    sti: string,
    soknadsdata: SoknadsdataType,
    dispatch: Dispatch,
    responseHandler?: (response: any) => void
) {
    dispatch(settRestStatus(sti, REST_STATUS.PENDING));
    fetchPut(soknadsdataUrl(brukerBehandlingId, sti), JSON.stringify(soknadsdata))
        .then((response: any) => {
            dispatch(settRestStatus(sti, REST_STATUS.OK));
            if (responseHandler) {
                responseHandler(response);
            }
        })
        .catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                return;
            }
            logWarning("Lagring av soknadsdata feilet: " + reason);
            dispatch(settRestStatus(sti, REST_STATUS.FEILET));
            dispatch(showServerFeil(true));
        });
}

export function settSamtykkeOgOppdaterData(
    brukerBehandlingId: string,
    sti: string,
    harSamtykke: boolean,
    dataSti: null | string,
    withAccessToken: boolean,
    dispatch: Dispatch
) {
    const restStatusSti = "inntekt/samtykke";
    dispatch(settRestStatus(restStatusSti, REST_STATUS.PENDING));
    fetchPost(soknadsdataUrl(brukerBehandlingId, sti), JSON.stringify(harSamtykke), withAccessToken)
        .then((response: any) => {
            dispatch(settRestStatus(restStatusSti, REST_STATUS.OK));
            if (dataSti && dataSti.length > 1) {
                dispatch(settRestStatus(dataSti, REST_STATUS.PENDING));
                hentSoknadsdata(brukerBehandlingId, dataSti, dispatch);
            }
        })
        .catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                return;
            }
            logWarning("Oppdatering av bostotte samtykke feilet: " + reason);
            dispatch(settRestStatus(restStatusSti, REST_STATUS.FEILET));
            dispatch(showServerFeil(true));
        });
}

/*
 * setPath - Oppdater sti i datastruktur.
 *
 *  F.eks. setPath("familie/sivilstatus/barn", {navn: 'Doffen'})
 *
 * Oppretter element i object ut fra sti hvis det ikke finnes.
 *
 * setPath( {}, 'familie/sivilstatus/status/barn', {navn: "Doffen"});
 *  => { familie: { sivilstatus: { status: {barn: {navn: 'Doffen' } } } }
 *
 * setPath( {}, 'familie/barn/0', {navn: "Doffen"})
 *  => {familie: {barn : [{navn: "Doffen"}]
 */
export const setPath = (obj: any, path: string, value: any): any => {
    obj = typeof obj === "object" ? obj : {};
    const keys = Array.isArray(path) ? path : path.split("/");
    let curStep = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!curStep[key] && !Object.prototype.hasOwnProperty.call(curStep, key)) {
            const nextKey = keys[i + 1];
            const useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
            curStep[key] = useArray ? [] : {};
        }
        curStep = curStep[key];
    }
    const finalStep = keys[keys.length - 1];
    curStep[finalStep] = value;
    return obj;
};
