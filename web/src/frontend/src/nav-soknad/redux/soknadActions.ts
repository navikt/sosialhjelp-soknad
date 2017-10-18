import { fetchDelete, fetchPost, fetchToJson } from "../utils/rest-utils";
import { resetFakta, lagreFaktum } from "./faktaActions";
import { updateFaktaMedLagretVerdi } from "./faktaUtils";
import { finnFaktum } from "../utils";
import {
	FaktaActionTypeKeys,
	FaktaActionTypes,
	SoknadDispatch
} from "./reduxTypes";
import { Soknad, Faktum } from "../types";

import { SoknadAppState } from "./reduxTypes";
import {
	AvbrytSoknadAction,
	FortsettSoknadAction,
	HentetSoknadAction,
	HentSoknadAction,
	OpprettetSoknadAction,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetServerFeilAction,
	SoknadActionTypeKeys
} from "./soknadTypes";
import {
	oppdaterFaktumMedProperties,
	oppdaterFaktumMedVerdier
} from "../../nav-soknad/utils/faktumUtils";
import { InjectedIntl } from "react-intl";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OpprettetSoknadAction
	| HentSoknadAction
	| HentetSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction
	| AvbrytSoknadAction
	| FortsettSoknadAction;

export function opprettSoknad(
	kommuneId: string,
	bydelId: string,
	intl: InjectedIntl
) {
	return (
		dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>,
		getState: () => SoknadAppState
	) => {
		dispatch({ type: SoknadActionTypeKeys.OPPRETT_SOKNAD });
		const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
		fetchPost("soknader", payload)
			.then((response: { brukerBehandlingId: string }) => {
				dispatch({
					type: SoknadActionTypeKeys.OPPRETTET_SOKNAD,
					brukerBehandlingId: response.brukerBehandlingId
				});
				const brukerBehandlingId = getState().soknad.data.brukerBehandlingId;

				hentSoknad(brukerBehandlingId)(dispatch).then(() => {
					const fakta = getState().fakta.data;
					setInformasjonsFaktum(fakta, dispatch, intl);
					setBostedFaktum(
						finnFaktum("personalia.kommune", fakta),
						kommuneId,
						dispatch
					);
					if (bydelId !== "") {
						setBostedFaktum(
							finnFaktum("personalia.bydel", fakta),
							bydelId,
							dispatch
						);
					}
				});
			})
			.catch(reason => {
				dispatch({
					type: SoknadActionTypeKeys.SET_SERVER_FEIL,
					feilmelding: reason
				});
			});
	};
}

const setInformasjonsFaktum = (
	fakta: any,
	dispatch: any,
	intl: InjectedIntl
) => {
	const properties = {
		"1": getIntlTextOrKey(intl, "informasjon.start.tittel"),
		"2": getIntlTextOrKey(intl, "informasjon.start.tekst"),
		"3": getIntlTextOrKey(intl, "informasjon.nodsituasjon.undertittel"),
		"4": getIntlTextOrKey(intl, "informasjon.nodsituasjon.tekst")
	};
	lagreFaktum(
		oppdaterFaktumMedProperties(
			finnFaktum("informasjon.tekster", fakta),
			properties
		),
		dispatch
	);
};

const setBostedFaktum = (faktum: Faktum, verdi: string, dispatch: any) => {
	lagreFaktum(oppdaterFaktumMedVerdier(faktum, verdi), dispatch);
};

export function hentSoknad(brukerBehandlingsId: string) {
	return (dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>) => {
		dispatch({ type: SoknadActionTypeKeys.HENT_SOKNAD });
		return fetchToJson("soknader/" + brukerBehandlingsId)
			.then((soknadsdata: Soknad) => {
				const fakta = updateFaktaMedLagretVerdi(soknadsdata.fakta);
				dispatch({ type: FaktaActionTypeKeys.SET_FAKTA, fakta });
				dispatch({
					type: SoknadActionTypeKeys.HENTET_SOKNAD,
					data: soknadsdata
				});
			})
			.catch(reason => {
				dispatch({
					type: SoknadActionTypeKeys.SET_SERVER_FEIL,
					feilmelding: reason
				});
			});
	};
}

export function resetSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.RESET_SOKNAD });
		dispatch(resetFakta());
	};
}

export function avbrytSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.AVBRYT_SOKNAD });
	};
}

export function fortsettSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.FORTSETT_SOKNAD });
	};
}

export function slettSoknad(brukerBehandlingsId: string) {
	return (dispatch: SoknadDispatch<any>) => {
		return fetchDelete("soknader/" + brukerBehandlingsId).catch(reason => {
			dispatch({
				type: SoknadActionTypeKeys.SET_SERVER_FEIL,
				feilmelding: reason
			});
		});
	};
}
