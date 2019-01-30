import {
	fetchPutSoknadsdataAction,
	fetchSoknadsdataAction
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataActions";

export interface Bosituasjon {
	"botype": null | string;
	"antallPersoner": null | string;
}

export const initialBosituasjon: Bosituasjon = {
	"botype": null,
	"antallPersoner": null
};

const BOSITUASJON_STI = "bosituasjon";

export const hentBosituasjonAction = (brukerBehandlingId: string) => {
	return fetchSoknadsdataAction(brukerBehandlingId, BOSITUASJON_STI);
};

export const oppdaterBosituasjonAction = (brukerBehandlingId: string, bosituasjon: Bosituasjon) => {
	return fetchPutSoknadsdataAction(brukerBehandlingId, BOSITUASJON_STI, bosituasjon);
};
