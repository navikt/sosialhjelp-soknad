import { VedleggActionTypeKeys, VedleggActionTypes } from "./vedleggTypes";

const lastOppVedlegg = (
	vedleggId: string,
	formData: FormData
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP,
		vedleggId,
		formData
	};
};

const lasterOppVedlegg = (): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP_PENDING,
	};
};

const lastetOppVedlegg = (): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP_OK,
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

const lastOppVedleggFeilet = (feilmelding: string): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LASTOPP_FEILET,
		feilmelding
	};
};

const hentVedleggFeilet = (feilmelding: string): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_FEILET,
		feilmelding
	};
};

const hentVedleggsForventning = (): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING
	};
};

const hentVedleggsForventningOk = (struktur: any): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK,
		data: struktur
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
	lastetOppVedlegg,
	mottattVedleggListe,
	hentVedleggsForventning,
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,

	lasterOppVedlegg,
	hentVedleggListe,
	hentVedleggFeilet,
	lastOppVedleggFeilet,
};
