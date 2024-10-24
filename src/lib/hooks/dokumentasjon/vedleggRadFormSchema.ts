import {z} from "zod";
import {ValideringsFeilKode} from "../../validering.ts";
import {belopTekstfeltPreprocessor} from "../../../sider/08-vedlegg/belopTekstfeltPreprocessor.ts";

const zodBelopTekstfeltSchema = z.preprocess(
    belopTekstfeltPreprocessor,
    z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL).nullable()
);

const RadSchema = z
    .object({
        beskrivelse: z.string().max(100, ValideringsFeilKode.MAX_LENGDE).nullable(),
        belop: zodBelopTekstfeltSchema,
        brutto: zodBelopTekstfeltSchema,
        netto: zodBelopTekstfeltSchema,
        renter: zodBelopTekstfeltSchema,
        avdrag: zodBelopTekstfeltSchema,
    })
    .partial();

export const VedleggRadFrontendSchema = z.object({
    rader: z.array(RadSchema).optional(),
});

export type VedleggRadFrontendForm = z.infer<typeof VedleggRadFrontendSchema>;
