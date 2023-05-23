import {
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";

export type Opplysning = VedleggFrontendMinusEtParTingSomTrengerAvklaring & {
    slettet?: boolean;
    pendingLasterOppFil?: boolean;
};

export type OpplysningerAction = SettVedleggLoading;

export enum opplysningerActionTypeKeys {
    SETT_VEDLEGG_LOADING = "okonomiskeOpplysninger/SETT_VEDLEGG_LOADING",
}

export interface SettVedleggLoading {
    type: opplysningerActionTypeKeys.SETT_VEDLEGG_LOADING;
    opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring;
    loading: boolean;
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
