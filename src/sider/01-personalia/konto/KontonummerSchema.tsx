import {z} from "zod";

export const KontonummerSchema = z
    .object({
        kontonummerBruker: z.union([z.string().length(11, "kontakt.kontonummer.feilmelding"), z.null()]).optional(),
        harIkkeKonto: z.boolean().optional(),
    })
    // clear the kontonummer if harIkkeKonto is set
    .refine(({kontonummerBruker, harIkkeKonto}) => ({
        harIkkeKonto,
        kontonummerBruker: harIkkeKonto ? null : kontonummerBruker,
    }));
