import {z} from "zod";
import {ValideringsFeilKode} from "../../../../../lib/validering.ts";
import {BelopSchema} from "../../common/BelopSchema.ts";

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
