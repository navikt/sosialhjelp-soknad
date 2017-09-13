import { Action, Dispatch } from "redux";
import {
	SoknadActionTypeKeys,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetBrukerBehandlingIdAction,
	SetServerFeilAction,
	SettRestStatusOk,
	SettRestStatusPending
} from "./soknadTypes";

import { fetchPost, fetchToJson } from "../rest-utils";
import { setFakta, setFaktumVerdi } from "../../../nav-soknad/redux/faktaActions";
import { finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { Faktum, FaktaActionTypeKeys } from "../../../nav-soknad/redux/faktaTypes";

export type SoknadActionTypes =
	| OpprettSoknadAction
	| SetBrukerBehandlingIdAction
	| SetServerFeilAction
	| ResetSoknadAction
	| SettRestStatusPending
	| SettRestStatusOk;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: SoknadActionTypeKeys.PENDING });
		const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
		fetchPost("soknader", payload)
			.then(response => {
				const key = "brukerBehandlingId";
				const brukerBehandlingId = response[key];
				dispatch({
					type: SoknadActionTypeKeys.SET_BRUKERBEHANDLING_ID,
					brukerBehandlingId
				});
				dispatch({ type: FaktaActionTypeKeys.PENDING});
				hentFakta(brukerBehandlingId, dispatch).then((fakta: Faktum[]) => {
					dispatch({ type: FaktaActionTypeKeys.OK});
					dispatch(setFakta(fakta));
					dispatch(setFaktumVerdi(finnFaktum("personalia.kommune", fakta ), kommuneId));
					if (bydelId !== "") {
						dispatch(setFaktumVerdi(finnFaktum("personalia.bydel", fakta ), bydelId));
					}
				});
			})
			.catch(reason => {
				dispatch({ type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

export function lesSoknad(brukerBehandlingId: string) {
	return (dispatch: Dispatch<Action>) => {
		hentFakta(brukerBehandlingId, dispatch).then(fakta => {
			dispatch(setFakta(fakta));
			dispatch({ type: SoknadActionTypeKeys.OK });
		});
	};
}

function hentFakta(brukerBehandlingId: string, dispatch: Dispatch<Action>) {
	dispatch({ type: SoknadActionTypeKeys.FAKTA_PENDING });
	return fetchToJson(
		"soknader/" + brukerBehandlingId + "/fakta"
	).catch(reason => {
		dispatch({ type: SoknadActionTypeKeys.FEILET });
		dispatch({ type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
	});
}

export function resetSoknad() {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: SoknadActionTypeKeys.RESET_SOKNAD });
	};
}
