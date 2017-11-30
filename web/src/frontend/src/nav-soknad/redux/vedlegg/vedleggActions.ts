import { Fil, VedleggActionTypeKeys, VedleggActionTypes } from "./vedleggTypes";
import { Faktum } from "../../types/navSoknadTypes";

const lastOppVedlegg = (
	key: string,
	vedleggId: string,
	formData: FormData,
	filer: Fil[]
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP,
		faktumKey: key,
		vedleggId,
		formData,
		filer
	};
};

// const lasterOppVedlegg = (): VedleggActionTypes => {
// 	return {
// 		type: VedleggActionTypeKeys.LASTOPP_PENDING,
// 	};
// };

// const lastOppVedleggOk = (): VedleggActionTypes => {
// 	return {
// 		type: VedleggActionTypeKeys.LASTOPP_OK,
// 	};
// };

const lastOppVedleggPending = (
	key: string,
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP_PENDING,
		faktumKey: key,
		vedleggId
	};
};

const lastOppVedleggOk = (
	key: string,
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP_OK,
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
		type: VedleggActionTypeKeys.LASTOPP_FEILET,
		faktumKey: key,
		vedleggId,
		feilmelding
	};
};

const hentVedleggListe = (
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGG_LISTE,
		vedleggId
	};
};

const mottattVedleggListe = (data: any): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.MOTTATT_VEDLEGG_LISTE,
		data
	};
};

const hentVedleggFeilet = (feilmelding: string): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_FEILET,
		feilmelding
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

export {
	lastOppVedlegg,
	lastOppVedleggPending,
	lastOppVedleggFeilet,
	lastOppVedleggOk,
	mottattVedleggListe,
	hentVedleggsForventning,
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,

	hentVedleggListe,
	hentVedleggFeilet
};
