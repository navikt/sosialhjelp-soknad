/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {JsonInternalSoknad} from "./jsonInternalSoknad";
import type {SoknadUnderArbeidDtoStatus} from "./soknadUnderArbeidDtoStatus";
import type {OpplastetVedleggDto} from "./opplastetVedleggDto";

export interface SoknadUnderArbeidDto {
    soknadId: number;
    versjon: number;
    behandlingsId: string;
    tilknyttetBehandlingsId?: string;
    eier: string;
    jsonInternalSoknad?: JsonInternalSoknad;
    status: SoknadUnderArbeidDtoStatus;
    opprettetDato: Date;
    sistEndretDato: Date;
    opplastetVedleggList: OpplastetVedleggDto[];
}
