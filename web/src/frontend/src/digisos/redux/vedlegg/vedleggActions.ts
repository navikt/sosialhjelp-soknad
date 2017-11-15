import { VedleggsforventingActionType, VedleggsforventingActionTypeKeys } from "./vedleggTypes";

export function hentVedleggsForventning(): VedleggsforventingActionType {
	return {
		type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG
	};
}

export function hentVedleggsForventningOk(struktur: any): VedleggsforventingActionType {
	return {
		type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG_OK,
		data: struktur
	};
}

export function hentVedleggsForventningFeilet(feilmelding: string): VedleggsforventingActionType {
	return {
		type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG_FEILET,
		feilmelding
	};
}
