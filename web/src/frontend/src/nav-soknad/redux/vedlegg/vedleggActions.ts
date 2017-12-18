import { Fil, Vedlegg, VedleggActionTypeKeys, VedleggActionTypes } from "./vedleggTypes";
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

const lastOppVedleggFeilet = (
	key: string,
	vedleggId: string,
	feilmelding: string
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP_FEILET,
		faktumKey: key,
		vedleggId,
		feilmelding
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

const slettFil = (
	faktumKey: string,
	vedleggId: string,
	filNavn: string
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.SLETT_FIL,
		faktumKey,
		vedleggId,
		filNavn
	};
};

const slettFilOk = (
	faktumKey: string,
	vedleggId: string,
	filNavn: string
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.SLETT_FIL_OK,
		faktumKey,
		vedleggId,
		filNavn
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
	lastOppVedleggFeilet,
	lastOppVedleggOk,

	oppdatertVedlegg,
	nyttVedlegg,

	hentVedleggsForventningOk,

	slettFil,
	slettFilOk
};
