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

const lastOppVedleggPending = ( // Fjerne ?
	key: string,
	vedleggId: string,
): VedleggActionTypes => {
	return {
		type: VedleggActionTypeKeys.LAST_OPP_PENDING,
		faktumKey: key,
		vedleggId
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

// const hentVedleggListeOk = (faktumKey: string, data: any): VedleggActionTypes => {
// 	return {
// 		type: VedleggActionTypeKeys.MOTTATT_VEDLEGG_LISTE,
// 		faktumKey,
// 		data
// 	};
// };
//
// const hentVedleggFeilet = (feilmelding: string): VedleggActionTypes => {
// 	return {
// 		type: VedleggActionTypeKeys.HENT_FEILET,
// 		feilmelding
// 	};
// };

export {
	lastOppVedlegg,
	lastOppVedleggPending,
	lastOppVedleggFeilet,
	lastOppVedleggOk,

	hentVedleggsForventning,
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,

	hentFilListe,
	hentFilListeOk,

	slettFil,
	slettFilOk
	// hentVedleggFeilet
	// hentVedleggListe,
	// hentVedleggListeOk,

};
