import {
	fetchPutSoknadsdataAction,
	fetchSoknadsdataAction
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import { SoknadsdataType } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

export interface Arbeidsforhold {
	"arbeidsgivernavn": string,
	"fom": string,
	"tom": string,
	"stillingstypeErHeltid": boolean,
	"stillingsprosent": number,
	"overstyrtAvBruker": boolean
}

export interface Arbeid {
	arbeidsforhold?: Arbeidsforhold[];
	kommentarTilArbeidsforhold: null | string
}

export const initialArbeidState: Arbeid = {
	arbeidsforhold: [],
	kommentarTilArbeidsforhold: null
};

const ARBEID_STI = "arbeid";

export const hentArbeidAction = (brukerBehandlingId: string) => {
	return fetchSoknadsdataAction(brukerBehandlingId, ARBEID_STI);
};

export const oppdaterArbeidAction = (brukerbehandlingId: string, arbeid: SoknadsdataType) => {
	return fetchPutSoknadsdataAction(brukerbehandlingId, ARBEID_STI, arbeid);
};