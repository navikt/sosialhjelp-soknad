import { Dispatch } from "../reduxTypes";
import { fetchPut, fetchToJson } from "../../utils/rest-utils";
import {
	oppdaterSoknadsdataSti,
	settRestStatus,
	SoknadsdataType
} from "./soknadsdataReducer";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";
import { REST_STATUS } from "../../types";

const soknadsdataUrl = (brukerBehandlingId: string, sti: string): string => `soknader/${brukerBehandlingId}/${sti}`;

export function hentSoknadsdata(brukerBehandlingId: string, sti: string) {
	return (dispatch: Dispatch) => {
		dispatch(settRestStatus(sti, REST_STATUS.PENDING));
		fetchToJson(soknadsdataUrl(brukerBehandlingId, sti)).then((response: any) => {

			// For å simulere ulike typer testdata fra server, kan man her skrive kode som:
			// if(sti === SoknadsSti.FORSORGERPLIKT){
			// 	response = {
			// 		ansvar: [],
			// 		barnebidrag: null,
			// 		harForsorgerplikt: false
			// 	}
			// }

			dispatch(oppdaterSoknadsdataSti(sti, response));
			dispatch(settRestStatus(sti, REST_STATUS.OK));
		}).catch(() => {
			dispatch(settRestStatus(sti, REST_STATUS.FEILET));
			dispatch(navigerTilServerfeil());
		});
	}
}

export function lagreSoknadsdata(brukerBehandlingId: string, sti: string, soknadsdata: SoknadsdataType) {
	return (dispatch: Dispatch) => {
		dispatch(settRestStatus(sti, REST_STATUS.PENDING));
		fetchPut(soknadsdataUrl(brukerBehandlingId, sti), JSON.stringify(soknadsdata)).catch(() => {
			dispatch(settRestStatus(sti, REST_STATUS.FEILET));
			dispatch(navigerTilServerfeil());
		}).then((response: any) => {
			dispatch(settRestStatus(sti, REST_STATUS.OK));
		});
	}
}

export function lagreSoknadsdataTypet(brukerBehandlingId: string, sti: string, soknadsdata: SoknadsdataType) {
	return lagreSoknadsdata(brukerBehandlingId, sti, soknadsdata);
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
