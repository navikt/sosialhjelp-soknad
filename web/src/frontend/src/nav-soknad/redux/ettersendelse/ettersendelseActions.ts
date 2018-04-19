import { EttersendelseActionTypeKeys, EttersendelseActionTypes } from "./ettersendelseTypes";

const slettEttersendtVedlegg = (vedleggId: string, filId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.SLETT_VEDLEGG,
		vedleggId,
		filId
	};
};

const lagEttersendelse = (brukerbehandlingId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.NY,
		brukerbehandlingId
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

const lagEttersendelseOk = (brukerbehandlingId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.NY_OK,
		brukerbehandlingId
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

const sendEttersendelse = (brukerbehandlingId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.SEND,
		brukerbehandlingId
	};
};

const lesEttersendelser = (brukerbehandlingId: string): EttersendelseActionTypes => {
	return {
		type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER,
		brukerbehandlingId
	};
};

const settEttersendelser = (ettersendelser: any) => {
	return {
		type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK,
		ettersendelser
	};
};

export {
	lagEttersendelse,
	lagEttersendelseOk,
	lesEttersendelsesVedlegg,
	lastOppEttersendelseVedlegg,
	lastOppEttersendtVedleggOk,
	slettEttersendtVedlegg,
	lesEttersendteVedlegg,
	lesEttersendelser,
	sendEttersendelse,
	settEttersendelser
};
