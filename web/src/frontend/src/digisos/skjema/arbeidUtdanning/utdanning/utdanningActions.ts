import {
	fetchPutSoknadsdataAction,
	fetchSoknadsdataAction
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";

export interface Utdanning {
	"erStudent": null | boolean;
	"studengradErHeltid": null | boolean;
}

export const initialUtdanningState: Utdanning = {
	"erStudent": null,
	"studengradErHeltid": null
};

const UTDANNING_STI = "utdanning";

export const hentUtdanningAction = (brukerBehandlingId: string) => {
	return fetchSoknadsdataAction(brukerBehandlingId, UTDANNING_STI);
};

export const oppdaterUtdanningAction = (brukerBehandlingId: string, utdanning: Utdanning) => {
	return fetchPutSoknadsdataAction(brukerBehandlingId, UTDANNING_STI, utdanning);
};
