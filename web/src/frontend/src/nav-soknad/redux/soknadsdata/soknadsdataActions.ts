import { Dispatch } from "../reduxTypes";
import { fetchPut, fetchToJson } from "../../utils/rest-utils";
import { oppdaterSoknadsdataAction } from "./soknadsdataReducer";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

const soknadsdataUrl = (brukerBehandlingId: string, sti: string): string => `soknader/${brukerBehandlingId}/${sti}`;

export function fetchSoknadsdataAction(brukerBehandlingId: string, sti: string) {
	return (dispatch: Dispatch) => {
		fetchToJson(soknadsdataUrl(brukerBehandlingId, sti)).then((response: any) => {
			// const soknadsdata = {};
			// soknadsdata[sti] = response;
			const soknadsdata = safeSet({}, sti, response);
			dispatch(oppdaterSoknadsdataAction(soknadsdata));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
}

export function fetchPutSoknadsdataAction(brukerBehandlingId: string, sti: string, soknadsdata: any) {
	return (dispatch: Dispatch) => {
		fetchPut(soknadsdataUrl(brukerBehandlingId, sti), JSON.stringify(soknadsdata)).then(() => {
			const payload: any = {};
			payload[sti] = soknadsdata;
			dispatch(oppdaterSoknadsdataAction(payload));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
}

/*
 * safeSet - Opprett element i object ut fra sti hvis det ikke finnes.
 *
 * let soknadsdata = {};
 * soknadsdata = safeSet(soknadsdata, 'familie/sivilstatus', {status: "gift"});
 * => { familie: { sivilstatus: { status: 'gift' } } }
 */
const safeSet = (obj: any, path: string, value: any): any => {
	obj = typeof obj === 'object' ? obj : {};
	const keys = Array.isArray(path) ? path : path.split('/');
	let curStep = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!curStep[key] && !Object.prototype.hasOwnProperty.call(curStep, key)){
			const nextKey = keys[i+1];
			const useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
			curStep[key] = useArray ? [] : {};
		}
		curStep = curStep[key];
	}
	const finalStep = keys[keys.length - 1];
	curStep[finalStep] = value;
	return obj;
};
