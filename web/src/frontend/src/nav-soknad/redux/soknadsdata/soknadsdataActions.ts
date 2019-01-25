import { Dispatch } from "../reduxTypes";
import { fetchPut, fetchToJson } from "../../utils/rest-utils";
import { oppdaterSoknadsdataAction } from "./soknadsdataReducer";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

const soknadsdataUrl = (brukerBehandlingId: string, sti: string): string => `soknader/${brukerBehandlingId}/${sti}`;

export function fetchSoknadsdataAction(brukerBehandlingId: string, sti: string) {
	return (dispatch: Dispatch) => {
		fetchToJson(soknadsdataUrl(brukerBehandlingId, sti)).then((response: any) => {
			const soknadsdata = {};
			soknadsdata[sti] = response;
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