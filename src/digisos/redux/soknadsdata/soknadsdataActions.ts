import {
    fetchPost,
    fetchPut,
    fetchToJson,
    HttpStatus,
    DigisosLegacyRESTError,
} from "../../../nav-soknad/utils/rest-utils";
import {oppdaterSoknadsdataSti, settRestStatus, SoknadsdataType, SoknadsSti} from "./soknadsdataReducer";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {REST_STATUS} from "./soknadsdataTypes";

export const soknadsdataUrl = (behandlingsId: string, sti: SoknadsSti) => `soknader/${behandlingsId}/${sti}`;

export function hentSoknadsdata(behandlingsId: string, path: SoknadsSti, dispatch: Dispatch) {
    dispatch(settRestStatus(path, REST_STATUS.PENDING));
    fetchToJson(soknadsdataUrl(behandlingsId, path))
        .then((response: any) => {
            dispatch(oppdaterSoknadsdataSti(path, response));
            dispatch(settRestStatus(path, REST_STATUS.OK));
        })
        .catch((reason: any) => {
            if (!(reason instanceof DigisosLegacyRESTError)) {
                logWarning(`Uventet exception i hentSoknadsdata: ${reason}`);
                return;
            }

            // If we're getting these from the backend, the react-query
            // axios code is also getting the same around the same time
            // because this code is never used without the new code too.
            // Thus, that will all trigger a page reload anyway -- so we just
            // leave it alone.
            if ([401, 403, 404, 410].includes(reason.status)) return;

            logWarning(`Henting av soknadsdata ${path} feilet: ${reason}`).then(() => {
                dispatch(settRestStatus(path, REST_STATUS.FEILET));
                window.location.href = "/sosialhjelp/soknad/feil?reason=hentSoknadsdata";
            });
        });
}

export function lagreSoknadsdata(
    behandlingsId: string,
    path: SoknadsSti,
    data: SoknadsdataType,
    dispatch: Dispatch,
    responseHandler?: (response: any) => void
) {
    dispatch(settRestStatus(path, REST_STATUS.PENDING));
    fetchPut(soknadsdataUrl(behandlingsId, path), JSON.stringify(data))
        .then((response: any) => {
            dispatch(settRestStatus(path, REST_STATUS.OK));
            if (responseHandler) responseHandler(response);
        })
        .catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) return;
            logWarning("Lagring av soknadsdata feilet: " + reason);
            dispatch(settRestStatus(path, REST_STATUS.FEILET));
            window.location.href = "/sosialhjelp/soknad/feil?reason=lagreSoknadsdata";
        });
}

export function settSamtykkeOgOppdaterData(
    behandlingsId: string,
    path: SoknadsSti,
    harSamtykke: boolean,
    dataSti: null | SoknadsSti,
    withAccessToken: boolean,
    dispatch: Dispatch
) {
    const restStatusSti = "inntekt/samtykke";
    dispatch(settRestStatus(restStatusSti, REST_STATUS.PENDING));
    fetchPost(soknadsdataUrl(behandlingsId, path), JSON.stringify(harSamtykke), withAccessToken)
        .then((_: any) => {
            dispatch(settRestStatus(restStatusSti, REST_STATUS.OK));
            if (dataSti && dataSti.length > 1) {
                dispatch(settRestStatus(dataSti, REST_STATUS.PENDING));
                hentSoknadsdata(behandlingsId, dataSti, dispatch);
            }
        })
        .catch((reason) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) return;
            logWarning("Oppdatering av bostotte samtykke feilet: " + reason);
            dispatch(settRestStatus(restStatusSti, REST_STATUS.FEILET));
            window.location.href = "/sosialhjelp/soknad/feil?reason=settSamtykkeOgOppdaterData";
        });
}

/*
 * setPath - Oppdater sti i datastruktur.
 *
 *  F.eks. setPath("04-familie/sivilstatus/barn", {navn: 'Doffen'})
 *
 * Oppretter element i object ut fra sti hvis det ikke finnes.
 *
 * setPath( {}, '04-familie/sivilstatus/status/barn', {navn: "Doffen"});
 *  => { 04-familie: { sivilstatus: { status: {barn: {navn: 'Doffen' } } } }
 *
 * setPath( {}, '04-familie/barn/0', {navn: "Doffen"})
 *  => {04-familie: {barn : [{navn: "Doffen"}]
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
