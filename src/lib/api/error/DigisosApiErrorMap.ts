import {ValideringsFeilKode} from "../../validering";
import {SoknadApiErrorError} from "../../../generated/client/model";
import {REST_FEIL} from "./restFeil";
import {DigisosLanguageKey} from "../../i18n";

/**
 * Oversikt mellom FeilmeldingFeilType fra backend og språknøkkel på frontend.
 * Denne listen er kun befolket med de verdiene som gjelder for opplasting av dokumenter.
 * Alle andre er håndtert med GENERELL_FEIL.
 * Dersom axiosInstance skal bruke denne, bør den utvides med flere feil.
 */
export const DigisosApiErrorMap: Record<SoknadApiErrorError, DigisosLanguageKey> = {
    Forbidden: REST_FEIL.GENERELL_FEIL,
    GeneralError: REST_FEIL.GENERELL_FEIL,
    InnsendingIkkeAktivert: REST_FEIL.GENERELL_FEIL,
    InnsendingMidlertidigUtilgjengelig: REST_FEIL.GENERELL_FEIL,
    InnsendingUtilgjengelig: REST_FEIL.GENERELL_FEIL,
    PdfGenereringFeilet: REST_FEIL.GENERELL_FEIL,
    PdlKallFeilet: REST_FEIL.GENERELL_FEIL,
    PlanlagtNedetid: REST_FEIL.GENERELL_FEIL,
    SoknadAlleredeSendt: REST_FEIL.GENERELL_FEIL,
    SoknadUpdateConflict: REST_FEIL.GENERELL_FEIL,
    UgyldigInput: REST_FEIL.GENERELL_FEIL,
    DokumentUploadDuplicateFilename: REST_FEIL.DUPLIKAT_FIL,
    DokumentUploadError: REST_FEIL.FEIL_FILTYPE,
    DokumentUploadTooLarge: REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR,
    DokumentUploadUnsupportedMediaType: REST_FEIL.FEIL_FILTYPE,
    DokumentUploadFileEncrypted: REST_FEIL.KRYPTERT_FIL,
    DokumentKonverteringFeilet: REST_FEIL.KONVERTERING_FEILET,
    DokumentUploadPossibleVirus: REST_FEIL.MULIG_VIRUS,
    NotFound: ValideringsFeilKode.FIL_EKSISTERER_IKKE,
} as const;
