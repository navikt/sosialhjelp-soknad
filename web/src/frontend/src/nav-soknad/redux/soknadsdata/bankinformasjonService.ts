import { fetchPut, fetchToJson } from "../../utils/rest-utils";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";
import { oppdaterSoknadsdataAction } from "./soknadsdataReducer";

export interface Bankinformasjon {
	brukerdefinert: boolean;
	systemverdi: string | null;
	verdi: string | null;
	harIkkeKonto: boolean | null;
}

export const initialBankinfoState: Bankinformasjon = {
	brukerdefinert: false,
	systemverdi: null,
	verdi: null,
	harIkkeKonto: null
};

const bankinfoUrl = (brukerBehandlingId: string): string => `soknader/${brukerBehandlingId}/personalia/kontonummer`;

export const hentBankinformasjon = (brukerBehandlingId: string, dispatch: (action: any) => any): any => {
	fetchToJson(bankinfoUrl(brukerBehandlingId)).then((response: Bankinformasjon) => {
		dispatch(oppdaterSoknadsdataAction({bankinformasjon: response}));
	}).catch(() => {
		dispatch(navigerTilServerfeil());
	});
};

export const oppdaterBankinformasjon = (
	brukerBehandlingId: string, bankinformasjon: Bankinformasjon, dispatch: (action: any) => any
): any => {
	fetchPut(bankinfoUrl(brukerBehandlingId), JSON.stringify(bankinformasjon)).then(() => {
		dispatch(oppdaterSoknadsdataAction({bankinformasjon}));
	}).catch(() => {
		dispatch(navigerTilServerfeil());
	});
};
