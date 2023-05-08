import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";
import {FilFrontend, VedleggFrontendType, VedleggFrontendVedleggStatus} from "../../../generated/model";

export enum EttersendelseActionTypeKeys {
    NY = "ettersendelse/NY",
    NY_FEILET = "ettersendelse/NY_FEILET",
    NY_OK = "ettersendelse/NY_OK",
    LAST_OPP = "ettersendelse/LAST_OPP",
    LAST_OPP_PENDING = "ettersendelse/LAST_OPP_PENDING",
    LAST_OPP_OK = "ettersendelse/LAST_OPP_OK",
    LAST_OPP_FEILET = "ettersendelse/LAST_OPP_FEILET",
    SEND = "ettersendelse/SEND",
    SEND_PENDING = "ettersendelse/SEND_PENDING",
    SEND_OK = "ettersendelse/SEND_OK",
    NYTT_VEDLEGG = "ettersendelse/NYTT_VEDLEGG",
    OPPDATERT_VEDLEGG = "ettersendelse/OPPDATERT_VEDLEGG",
    SLETT_VEDLEGG = "ettersendelse/SLETT_VEDLEGG",
    SLETT_VEDLEGG_OK = "ettersendelse/SLETT_VEDLEGG_OK",
    LES_ETTERSENDELSES_VEDLEGG = "ettersendelse/LES_ETTERSENDELSES_VEDLEGG",
    LES_ETTERSENDELSES_VEDLEGG_OK = "ettersendelse/LES_ETTERSENDELSES_VEDLEGG_OK",
    VEDLEGG_ALLEREDE_SENDT = "ettersendelse/VEDLEGG_ALLEREDE_SENDT",
    VEDLEGG_ALLEREDE_SENDT_OK = "ettersendelse/VEDLEGG_ALLEREDE_SENDT_OK",
    LES_ETTERSENDELSER = "ettersendelse/LES_ETTERSENDELSER",
    LES_ETTERSENDELSER_OK = "ettersendelse/LES_ETTERSENDELSER_OK",
    ETTERSEND_PENDING = "ettersendelse/ETTERSEND_PENDING",
    ETTERSEND_OK = "ettersendelse/ETTERSEND_OK",
    INIT = "ettersendelse/INIT",
    OTHER_ACTION = "__any_other_action_type__",
    FIL_OPPLASTING_OK = "ettersendelse/FIL_OPPLASTING_OK",
    VIS_SOKNAD_ALLEREDE_SENDT_PROMPT = "ettersendelse/VIS_SOKNAD_ALLEREDE_SENDT_PROMPT",
}

export type EttersendelseActionTypes =
    | OpprettEttersendelseAction
    | OpprettEttersendelseFeiletAction
    | LagEttersendelseOkAction
    | LastOppEttersendelseAction
    | LastOppEttersendelseOkAction
    | LastOppEttersendelseFeiletAction
    | LesEttersendteVedleggAction
    | SlettEttersendtVedleggAction
    | SlettEttersendtVedleggOkAction
    | LesEttersendelsesVedleggAction
    | SendEttersendelseAction
    | SendEttersendelsePendingAction
    | SendEttersendelseOkAction
    | LesEttersendelserAction
    | LesEttersendelserOkAction
    | OtherAction
    | FilOpplastingOk
    | VisSoknadAlleredeSendtPrompt;

export enum EttersendelseFeilkode {
    NY_ETTERSENDELSE_FEILET = "NY_ETTERSENDELSE_FEILET",
}

export interface OpprettEttersendelseAction {
    type: EttersendelseActionTypeKeys.NY;
    brukerbehandlingId: string;
}

export interface OpprettEttersendelseFeiletAction {
    type: EttersendelseActionTypeKeys.NY_FEILET;
    brukerbehandlingId: string;
}

export interface SendEttersendelseAction {
    type: EttersendelseActionTypeKeys.SEND;
    brukerbehandlingId: string;
}

export interface SendEttersendelsePendingAction {
    type: EttersendelseActionTypeKeys.ETTERSEND_PENDING;
}

export interface SendEttersendelseOkAction {
    type: EttersendelseActionTypeKeys.ETTERSEND_OK;
}

// TODO: DENNE BRUKES
export interface LastOppEttersendtVedleggAction {
    type: EttersendelseActionTypeKeys.LAST_OPP;
    behandlingsId: string;
    opplysningType: VedleggFrontendType;
    formData: FormData;
}

export interface SlettEttersendtVedleggAction {
    type: EttersendelseActionTypeKeys.SLETT_VEDLEGG;
    behandlingsId: string;
    filUuid: string;
    opplysningType: VedleggFrontendType;
}

export interface SlettEttersendtVedleggOkAction {
    type: EttersendelseActionTypeKeys.SLETT_VEDLEGG_OK;
    filUuid: string;
    opplysningType: VedleggFrontendType;
}

export interface LesEttersendelsesVedleggAction {
    type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG;
    brukerbehandlingId: string;
}

export interface LesEttersendelserAction {
    type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER;
    brukerbehandlingId: string;
}

export interface LesEttersendelserOkAction {
    type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK;
    ettersendelser: any;
}

export interface LesEttersendteVedleggAction {
    type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK;
    manglendeVedleggsListe: EttersendelseVedleggBackend[];
}

export interface FilOpplastingOk {
    type: EttersendelseActionTypeKeys.FIL_OPPLASTING_OK;
    opplysningType: VedleggFrontendType;
    fil: FilFrontend;
}

export interface LastOppEttersendelseAction {
    type: EttersendelseActionTypeKeys.LAST_OPP;
    vedleggId: number;
    formData: FormData;
    opplysningType: VedleggFrontendType;
}

export interface LastOppEttersendelseOkAction {
    type: EttersendelseActionTypeKeys.LAST_OPP_OK;
}

export interface LastOppEttersendelseFeiletAction {
    type: EttersendelseActionTypeKeys.LAST_OPP_FEILET;
    feilKode: string;
    vedleggId: string;
}

export interface LagEttersendelseOkAction {
    type: EttersendelseActionTypeKeys.NY_OK;
    brukerbehandlingId: string;
}

export interface OtherAction {
    type: EttersendelseActionTypeKeys.OTHER_ACTION;
}

export interface EttersendelseState {
    data: EttersendelseVedleggBackend[];
    innsendte: Behandlingskjede;
    restStatus: REST_STATUS;
    opplastingStatus: REST_STATUS;
    ettersendStatus: REST_STATUS;
    opplastingVedleggType: VedleggFrontendType | null;
    brukerbehandlingId: string | null;
    feilKode: string;
    feiletVedleggId: string;
    visSoknadAlleredeSendtPromt: boolean;
}

export interface EttersendelseVedleggBackend {
    type: VedleggFrontendType;
    vedleggStatus: VedleggFrontendVedleggStatus;
    filer: FilFrontend[];
}

export interface Behandlingskjede {
    originalSoknad: OrginalSoknad | null;
    ettersendelser: OrginalSoknad[] | null;
}

export interface OrginalSoknad {
    behandlingsId: string;
    innsendtDato: string;
    innsendtTidspunkt: string;
    soknadsalderIMinutter: number;
    innsendteVedlegg: any[];
    ikkeInnsendteVedlegg: any[];
    navenhet: string;
    orgnummer: string;
}

export interface VisSoknadAlleredeSendtPrompt {
    type: EttersendelseActionTypeKeys.VIS_SOKNAD_ALLEREDE_SENDT_PROMPT;
    visPrompt: boolean;
}
