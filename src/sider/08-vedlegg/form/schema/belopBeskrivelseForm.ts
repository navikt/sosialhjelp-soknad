import {z} from "zod";
import {BelopSchema} from "./BelopSchema.ts";
import {ValideringsFeilKode} from "../../../../lib/validering.ts";

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
