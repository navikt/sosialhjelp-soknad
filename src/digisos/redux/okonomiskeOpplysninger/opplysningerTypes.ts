import {Valideringsfeil} from "../validering/valideringActionTypes";
import {VedleggFrontendType} from "../../../generated/model";
import {
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";

export type Opplysning = VedleggFrontendMinusEtParTingSomTrengerAvklaring & {
    slettet?: boolean;
    pendingLasterOppFil?: boolean;
};

// Fases ut til fordel for OpplysningSpec
export interface OpplysningSpecGammeltFormat {
    type: VedleggFrontendType;
    antallRader: "ingen" | "en" | "flere";
    radInnhold: OpplysningInputType[];
    textKey: string;
}

export type OpplysningerAction = GotDataFromBackend | UpdateOpplysning | SettVedleggLoading | LagreOpplysningHvisGyldig;

export enum opplysningerActionTypeKeys {
    GOT_DATA_FROM_BACKEND = "okonomiskeOpplysninger/GOT_DATA_FROM_BACKEND",
    OPPDATER_OPPLYSNING = "okonomiskeOpplysninger/OPPDATER_OPPLYSNING",
    SETT_VEDLEGG_LOADING = "okonomiskeOpplysninger/SETT_VEDLEGG_LOADING",
    LAGRE_OPPLYSNING_HVIS_GYLDIG = "okonomiskeOpplysninger/LAGRE_OPPLYSNING_HVIS_GYLDIG",
}

export interface UpdateOpplysning {
    type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING;
    opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring;
}

export interface GotDataFromBackend {
    type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND;
    backendData: VedleggFrontendsMinusEtParTingSomTrengerAvklaring;
}

export interface SettVedleggLoading {
    type: opplysningerActionTypeKeys.SETT_VEDLEGG_LOADING;
    opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring;
    loading: boolean;
}

export interface LagreOpplysningHvisGyldig {
    type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG;
    behandlingsId: string;
    opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring;
    feil: Valideringsfeil[];
}

export type VedleggGruppe =
    | "statsborgerskap"
    | "arbeid"
    | "familie"
    | "bosituasjon"
    | "inntekt"
    | "utgifter"
    | "generelle vedlegg"
    | "andre utgifter"
    | "ukjent";

export type OpplysningInputType = "beskrivelse" | "belop" | "brutto" | "netto" | "avdrag" | "renter";
