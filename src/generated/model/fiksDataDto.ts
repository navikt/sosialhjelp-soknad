/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {DokumentInfoDto} from "./dokumentInfoDto";

export interface FiksDataDto {
    behandlingsId?: string;
    avsenderFodselsnummer?: string;
    mottakerOrgNr?: string;
    mottakerNavn?: string;
    dokumentInfoer?: DokumentInfoDto[];
    innsendtDato?: Date;
    ettersendelsePa?: string;
}
