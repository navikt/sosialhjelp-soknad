import { Vedlegg, VedleggActionTypeKeys, VedleggActionTypes } from "./vedleggTypes";
import { Faktum } from "../../types/navSoknadTypes";

const lastOppVedlegg = (
	belopFaktumId: number,
	formData: FormData,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP,
		belopFaktumId,
		formData
	};
};

const lastOppVedleggOk = (): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP_OK
	};
};

const oppdatertVedlegg = (vedlegg: Vedlegg, fakta: Faktum[]) => {
	return {
		type: VedleggActionTypeKeys.OPPDATERT_VEDLEGG,
		vedlegg,
		fakta
	};
};

const nyttVedlegg = (vedlegg: Vedlegg, fakta: Faktum[]) => {
	return {
		type: VedleggActionTypeKeys.NYTT_VEDLEGG,
		vedlegg,
		fakta
	};
};

const startSlettVedlegg = (
	vedleggId: number,
	vedleggsFaktumId: number
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.START_SLETT_VEDLEGG,
		vedleggId,
		vedleggsFaktumId
	};
};

const slettVedlegg = (
	vedleggId: number
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.SLETT_VEDLEGG,
		vedleggId
	};
};

const slettVedleggOk = (
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.SLETT_VEDLEGG_OK,
	};
};

const hentVedleggsForventningOk = (vedlegg: Vedlegg[], fakta: Faktum[]): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK,
		vedleggsforventninger: vedlegg,
		fakta
	};
};

export {
	lastOppVedlegg,
	lastOppVedleggOk,

	oppdatertVedlegg,
	nyttVedlegg,

	hentVedleggsForventningOk,

	startSlettVedlegg,
	slettVedlegg,
	slettVedleggOk
};
