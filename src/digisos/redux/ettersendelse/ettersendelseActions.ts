import {
    Behandlingskjede,
    EttersendelseActionTypeKeys,
    EttersendelseActionTypes,
    EttersendelseVedleggBackend,
    LastOppEttersendtVedleggAction,
    SlettEttersendtVedleggAction,
    SlettEttersendtVedleggOkAction,
} from "./ettersendelseTypes";
import {detekterInternFeilKode} from "../../../nav-soknad/utils/rest-utils";
import {FilFrontend, VedleggFrontendType} from "../../../generated/model";

const slettEttersendtVedlegg = (
    behandlingsId: string,
    filUuid: string,
    opplysningType: VedleggFrontendType
): SlettEttersendtVedleggAction => {
    return {
        type: EttersendelseActionTypeKeys.SLETT_VEDLEGG,
        behandlingsId,
        filUuid,
        opplysningType,
    };
};

const slettEttersendtVedleggOk = (
    filUuid: string,
    opplysningType: VedleggFrontendType
): SlettEttersendtVedleggOkAction => {
    return {
        type: EttersendelseActionTypeKeys.SLETT_VEDLEGG_OK,
        filUuid,
        opplysningType,
    };
};

const opprettEttersendelse = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.NY,
        brukerbehandlingId,
    };
};

const opprettEttersendelseFeilet = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.NY_FEILET,
        brukerbehandlingId,
    };
};

const lastOppEttersendelseVedlegg = (
    behandlingsId: string,
    opplysningType: VedleggFrontendType,
    formData: FormData
): LastOppEttersendtVedleggAction => {
    return {
        type: EttersendelseActionTypeKeys.LAST_OPP,
        behandlingsId,
        opplysningType,
        formData,
    };
};

const lagEttersendelseOk = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.NY_OK,
        brukerbehandlingId,
    };
};

const lastOppEttersendtVedleggOk = (): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.LAST_OPP_OK,
    };
};

const lastOppEttersendelseFeilet = (feilKode: string, vedleggId: string): EttersendelseActionTypes => {
    const internFeilKode = detekterInternFeilKode(feilKode);
    return {
        type: EttersendelseActionTypeKeys.LAST_OPP_FEILET,
        feilKode: internFeilKode,
        vedleggId,
    };
};

const lesEttersendteVedlegg = (manglendeVedleggsListe: EttersendelseVedleggBackend[]) => {
    return {
        type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK,
        manglendeVedleggsListe,
    };
};

const filLastetOpp = (opplysningType: VedleggFrontendType, fil: FilFrontend) => {
    return {
        type: EttersendelseActionTypeKeys.FIL_OPPLASTING_OK,
        opplysningType,
        fil,
    };
};

const lesEttersendelsesVedlegg = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG,
        brukerbehandlingId,
    };
};

const sendEttersendelse = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.SEND,
        brukerbehandlingId,
    };
};

const lesEttersendelser = (brukerbehandlingId: string): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER,
        brukerbehandlingId,
    };
};

const settEttersendelser = (ettersendelser: Behandlingskjede) => {
    return {
        type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK,
        ettersendelser,
    };
};

const visSoknadAlleredeSendtPrompt = (visPrompt: boolean): EttersendelseActionTypes => {
    return {
        type: EttersendelseActionTypeKeys.VIS_SOKNAD_ALLEREDE_SENDT_PROMPT,
        visPrompt,
    };
};

export {
    opprettEttersendelse,
    opprettEttersendelseFeilet,
    lagEttersendelseOk,
    lesEttersendelsesVedlegg,
    lastOppEttersendelseVedlegg,
    lastOppEttersendtVedleggOk,
    lastOppEttersendelseFeilet,
    slettEttersendtVedlegg,
    lesEttersendteVedlegg,
    lesEttersendelser,
    sendEttersendelse,
    settEttersendelser,
    filLastetOpp,
    slettEttersendtVedleggOk,
    visSoknadAlleredeSendtPrompt,
};
