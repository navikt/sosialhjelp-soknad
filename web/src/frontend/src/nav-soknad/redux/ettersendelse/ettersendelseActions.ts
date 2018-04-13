import { EttersendelseActionTypeKeys, EttersendelseActionTypes } from "./ettersendelseTypes";

const slettEttersendtVedlegg = (vedleggId: string, filId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.SLETT_VEDLEGG,
		vedleggId,
		filId
	};
};

const lastOppEttersendelseVedlegg = (
	vedleggId: number,
	formData: FormData
): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.LAST_OPP,
		vedleggId,
		formData
	};
};

const lastOppEttersendtVedleggOk = (): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.LAST_OPP_OK
	};
};

const lesEttersendteVedlegg = (vedlegg: any) => {
	return {
		type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK,
		vedlegg
	};
};

const lesEttersendelsesVedlegg = (brukerbehandlingId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG,
		brukerbehandlingId
	};
};

export {
	lesEttersendelsesVedlegg,
	lastOppEttersendelseVedlegg,
	lastOppEttersendtVedleggOk,
	slettEttersendtVedlegg,
	lesEttersendteVedlegg
};
