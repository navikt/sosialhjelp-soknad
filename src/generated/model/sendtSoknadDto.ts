/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */

export interface SendtSoknadDto {
    sendtSoknadId: number;
    behandlingsId: string;
    tilknyttetBehandlingsId?: string;
    eier: string;
    fiksforsendelseId?: string;
    orgnummer: string;
    navEnhetsnavn: string;
    brukerOpprettetDato: Date;
    brukerFerdigDato: Date;
    sendtDato?: Date;
}
