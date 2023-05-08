import {Valideringsfeil} from "../validering/valideringActionTypes";
import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";
import {
    FilFrontend,
    VedleggFrontendGruppe,
    VedleggFrontends,
    VedleggFrontendType,
    VedleggRadFrontend,
    VedleggFrontendVedleggStatus,
    VedleggFrontend,
} from "../../../generated/model";
import {getSpcForOpplysning} from "./opplysningerUtils";

export interface OpplysningerModel {
    restStatus: REST_STATUS;
    backendData: VedleggFrontends | null;
    opplysningerSortert: Opplysning[];
    enFilLastesOpp: boolean;
}

export interface Opplysning {
    type: VedleggFrontendType;
    gruppe: VedleggFrontendGruppe;
    rader?: VedleggRadFrontend[];
    vedleggStatus?: VedleggFrontendVedleggStatus;
    filer?: FilFrontend[];
    slettet: boolean;
    radInnhold: InputType[];
    pendingLasterOppFil: boolean;
}

export interface OpplysningSpc {
    type: VedleggFrontendType;
    antallRader: "ingen" | "en" | "flere";
    radInnhold: InputType[];
    textKey: string;
}

export const getOpplysningRows = ({type}: VedleggFrontend): InputType[] => getSpcForOpplysning(type)?.radInnhold ?? [];

export type OpplysningerAction =
    | GotDataFromBackend
    | UpdateOpplysning
    | SettPendingPaFilOpplasting
    | SettFerdigPaFilOpplasting
    | SettOpplysningsFilAlleredeLastetOpp
    | LagreOpplysningHvisGyldig;

export enum opplysningerActionTypeKeys {
    GOT_DATA_FROM_BACKEND = "okonomiskeOpplysninger/GOT_DATA_FROM_BACKEND",
    OPPDATER_OPPLYSNING = "okonomiskeOpplysninger/OPPDATER_OPPLYSNING",
    SETT_FIL_OPPLASTING_PENDING = "okonomiskeOpplysninger/SETT_FIL_OPPLASTING_PENDING",
    SETT_FIL_OPPLASTING_FERDIG = "okonomiskeOpplysninger/SETT_FIL_OPPLASTING_FERDIG",
    SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP = "okonomiskeOpplysninger/SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP",
    LAGRE_OPPLYSNING_HVIS_GYLDIG = "okonomiskeOpplysninger/LAGRE_OPPLYSNING_HVIS_GYLDIG",
}

export interface UpdateOpplysning {
    type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING;
    opplysning: VedleggFrontend;
}

export interface GotDataFromBackend {
    type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND;
    backendData: VedleggFrontends;
}

export interface SettPendingPaFilOpplasting {
    type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING;
    opplysningType: VedleggFrontendType;
}

export interface SettFerdigPaFilOpplasting {
    type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG;
    opplysningType: VedleggFrontendType;
}

export interface SettOpplysningsFilAlleredeLastetOpp {
    type: opplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP;
    opplysningType: VedleggFrontendType;
}

export interface LagreOpplysningHvisGyldig {
    type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG;
    behandlingsId: string;
    opplysning: VedleggFrontend;
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

export type InputType = "beskrivelse" | "belop" | "brutto" | "netto" | "avdrag" | "renter";
