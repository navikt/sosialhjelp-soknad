import {fetchPost, fetchPut, fetchToJson} from "../../../nav-soknad/utils/rest-utils";
import {oppdaterSoknadsdataSti, settRestStatus, SoknadsdataType, SoknadsSti} from "./soknadsdataReducer";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {REST_STATUS} from "./soknadsdataTypes";
import {AxiosError} from "axios";

export const soknadsdataUrl = (behandlingsId: string, sti: SoknadsSti) => `soknader/${behandlingsId}/${sti}`;
export const panic = (reason: string) => {
    setTimeout(() => {
        window.location.href = `/sosialhjelp/soknad/feil?reason=${reason}`;
    }, 500);
};

export const hentSoknadsdata = async (behandlingsId: string, path: SoknadsSti, dispatch: Dispatch) => {
    try {
        dispatch(settRestStatus(path, REST_STATUS.PENDING));
        const response = await fetchToJson<SoknadsdataType>(soknadsdataUrl(behandlingsId, path));
        dispatch(oppdaterSoknadsdataSti(path, response));
        dispatch(settRestStatus(path, REST_STATUS.OK));
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            await logWarning(`hentSoknadsdata GET ${path} feilet: ${e.response.status} ${e.response.data}`);
        } else {
            await logWarning(`hentSoknadsdata GET ${path} feilet: ${e}`);
        }

        dispatch(settRestStatus(path, REST_STATUS.FEILET));
        panic("hentSoknadsdata");
    }
};

export const lagreSoknadsdata = async (
    behandlingsId: string,
    path: SoknadsSti,
    data: SoknadsdataType,
    dispatch: Dispatch,
    callback?: (response: any) => void
) => {
    try {
        dispatch(settRestStatus(path, REST_STATUS.PENDING));
        const response = fetchPut(soknadsdataUrl(behandlingsId, path), JSON.stringify(data));
        dispatch(settRestStatus(path, REST_STATUS.OK));
        if (callback) callback(response);
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            await logWarning(`lagreSoknadsdata PUT ${path} feilet: ${e.response.status} ${e.response.data}`);
        } else {
            await logWarning(`lagreSoknadsdata PUT ${path} feilet: ${e}`);
        }

        dispatch(settRestStatus(path, REST_STATUS.FEILET));
        panic("lagreSoknadsdata");
    }
};

export const settSamtykkeOgOppdaterData = async (
    behandlingsId: string,
    path: SoknadsSti,
    harSamtykke: boolean,
    dataSti: null | SoknadsSti,
    withAccessToken: boolean,
    dispatch: Dispatch
) => {
    try {
        dispatch(settRestStatus("inntekt/samtykke", REST_STATUS.PENDING));
        await fetchPost(soknadsdataUrl(behandlingsId, path), JSON.stringify(harSamtykke));
        dispatch(settRestStatus("inntekt/samtykke", REST_STATUS.OK));

        if (!dataSti?.length) return;

        dispatch(settRestStatus(dataSti, REST_STATUS.PENDING));
        await hentSoknadsdata(behandlingsId, dataSti, dispatch);
    } catch (e) {
        if (e instanceof AxiosError && e.response && e.request) {
            await logWarning(`settSamtykkeOgOppdaterData ${path} feilet: ${e.response.status} ${e.response.data}`);
        } else {
            await logWarning(`settSamtykkeOgOppdaterData ${path} feilet: ${e}`);
        }

        dispatch(settRestStatus("inntekt/samtykke", REST_STATUS.FEILET));
        panic("settSamtykkeOgOppdaterData");
    }
};

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
