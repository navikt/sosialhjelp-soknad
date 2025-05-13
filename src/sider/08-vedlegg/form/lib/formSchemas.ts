import {z} from "zod";
import {BelopSchema} from "./BelopSchema.ts";
import {ValideringsFeilKode} from "../../../../lib/validering.ts";

export const BruttoNettoFormSchema = z.object({
    brutto: BelopSchema.optional(),
    netto: BelopSchema.optional(),
});
export const BelopEnSchema = z.object({
    belop: BelopSchema.optional(),
});
export type BelopEnFormValues = z.infer<typeof BelopEnSchema>;
export const BelopBeskrivelseFormSchema = z.object({
    belopBeskrivelse: z.array(
        z.object({
            belop: BelopSchema,
            beskrivelse: z
                .string()
                .max(100, ValideringsFeilKode.MAX_LENGDE)
                .transform((val) => (val.trim() === "" ? undefined : val))
                .optional(),
        })
    ),
});
export type BelopBeskrivelseFormValues = z.infer<typeof BelopBeskrivelseFormSchema>;
export const AvdragRenterFormEntrySchema = z.object({
    avdrag: BelopSchema.optional(),
    renter: BelopSchema.optional(),
});
export const AvdragRenterFormSchema = z.object({
    avdragRenter: z.array(AvdragRenterFormEntrySchema),
});
export type AvdragRenterFormValues = z.infer<typeof AvdragRenterFormSchema>;
