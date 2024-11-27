import {DigisosLanguageKey} from "../../i18n/common.ts";

export const REST_FEIL: Record<string, DigisosLanguageKey> = {
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR: "vedlegg.opplasting.feil.samletStorrelseForStor",
    FOR_STOR: "vedlegg.opplasting.feil.forStor",
    FEIL_FILTYPE: "vedlegg.opplasting.feil.filType",
    KRYPTERT_FIL: "opplasting.feilmelding.pdf.kryptert",
    DUPLIKAT_FIL: "opplasting.feilmelding.duplikat",
    KONVERTERING_FEILET: "opplasting.feilmelding.konvertering",
    GENERELL_FEIL: "vedlegg.opplasting.feil.generell",
    MULIG_VIRUS: "vedlegg.opplasting.feil.muligVirus",
} as const;
