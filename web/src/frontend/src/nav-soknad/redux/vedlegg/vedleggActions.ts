import { Fil, VedleggActionTypeKeys, VedleggActionTypes } from "./vedleggTypes";
import { Faktum } from "../../types/navSoknadTypes";

const lastOppVedlegg = (
	key: string,
	vedleggId: string,
	formData: FormData,
	filer: Fil[]
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP,
		faktumKey: key,
		vedleggId,
		formData,
		filer
	};
};

const lastOppVedleggOk = (
	key: string,
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP_OK,
		faktumKey: key,
		vedleggId
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

const hentVedleggsForventning = (fakta: Faktum[]): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING,
		fakta
	};
};

const hentVedleggsForventningOk = (struktur: any, fakta: Faktum[]): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK,
		vedleggsforventninger: struktur,
		fakta
	};
};

const hentVedleggsForventningFeilet = (feilmelding: string): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_FEILET,
		feilmelding
	};
};

const hentFilListe = (
	key: string,
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_FIL_LISTE,
		faktumKey: key,
		vedleggId
	};
};

const hentFilListeOk = (
	key: string,
	filer: Fil[],
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_FIL_LISTE_OK,
		faktumKey: key,
		filer
	};
};

export {
	lastOppVedlegg,
	lastOppVedleggFeilet,
	lastOppVedleggOk,

	hentVedleggsForventning,
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,

	hentFilListe,
	hentFilListeOk,

	slettFil,
	slettFilOk
};
