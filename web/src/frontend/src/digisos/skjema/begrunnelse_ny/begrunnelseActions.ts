import {
	fetchPutSoknadsdataAction,
	fetchSoknadsdataAction
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataActions";

export interface Begrunnelse {
	hvaSokesOm: string;
	hvorforSoke: string;
}

export const initialBegrunnelseState: Begrunnelse = {
	hvaSokesOm: "",
	hvorforSoke: ""
};

const BEGRUNNELSE_STI = "begrunnelse";

export const hentBegrunnelsenAction = (brukerBehandlingId: string) => {
	return fetchSoknadsdataAction(brukerBehandlingId, BEGRUNNELSE_STI);
};

export const oppdaterBegrunnelseAction = (brukerBehandlingId: string, begrunnelse: Begrunnelse) => {
	return fetchPutSoknadsdataAction(brukerBehandlingId, BEGRUNNELSE_STI, begrunnelse);
};
