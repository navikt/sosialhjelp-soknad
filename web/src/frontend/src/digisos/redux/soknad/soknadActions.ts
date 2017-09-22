import {
	HentetSoknadAction,
	HentSoknadAction,
	OpprettetSoknadAction,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetServerFeilAction,
	SoknadActionTypeKeys
} from "./soknadTypes";

import { fetchPost, fetchToJson } from "../rest-utils";
import { setFaktumVerdi } from "../../../nav-soknad/redux/faktaActions";
import { finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { State } from "../reducers";
import { FaktaActionTypeKeys, FaktaActionTypes, Faktum, SoknadDispatch } from "../../../nav-soknad/redux/faktaTypes";
import { Soknad } from "../../../nav-soknad/soknadTypes";

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OpprettetSoknadAction
	| HentSoknadAction
	| HentetSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>, getState: () => State) => {
		dispatch({type: SoknadActionTypeKeys.OPPRETT_SOKNAD});
		const payload = JSON.stringify({soknadType: "NAV DIGISOS"});
		fetchPost("soknader", payload)
			.then((response: { brukerBehandlingId: string }) => {
				dispatch({
					type: SoknadActionTypeKeys.OPPRETTET_SOKNAD,
					brukerBehandlingId: response.brukerBehandlingId
				});
				const brukerBehandlingId = getState().soknad.data.brukerBehandlingId;

				hentSoknad(brukerBehandlingId)(dispatch).then(() => {
					const fakta = getState().fakta.data;
					setBostedFaktum(finnFaktum("personalia.kommune", fakta), kommuneId, dispatch);
					if (bydelId !== "") {
						setBostedFaktum(finnFaktum("personalia.bydel", fakta), bydelId, dispatch);
					}
				});
			})
			.catch(reason => {
				dispatch({type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
			});
	};
}

const setBostedFaktum = (faktum: Faktum, verdi: string, dispatch: any) => {
	dispatch(setFaktumVerdi(faktum, verdi));
};

export function hentSoknad(brukerBehandlingsId: string) {
	return (dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>) => {
		dispatch({type: SoknadActionTypeKeys.HENT_SOKNAD});
		return fetchToJson("soknader/" + brukerBehandlingsId)
			.then((soknadsdata: Soknad) => {
				const fakta = soknadsdata.fakta;
				dispatch({type: FaktaActionTypeKeys.SET_FAKTA, fakta});
				dispatch({type: SoknadActionTypeKeys.HENTET_SOKNAD, data: soknadsdata});
			})
			.catch(reason => {
				dispatch({type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
			});
	};
}

export function resetSoknad() {
	return (dispatch: SoknadDispatch<SoknadActionTypes>) => {
		dispatch({type: SoknadActionTypeKeys.RESET_SOKNAD});
	};
}
