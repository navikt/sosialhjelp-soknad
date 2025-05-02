import {z} from "zod";
import {ValideringsFeilKode} from "../../../lib/validering.ts";

const BelopSchema = z.coerce
    .number({invalid_type_error: ValideringsFeilKode.ER_TALL})
    .min(0, ValideringsFeilKode.ER_TALL)
    .optional();

export const AvdragRenterFormEntrySchema = z.object({
    avdrag: BelopSchema,
    renter: BelopSchema,
});

export const AvdragRenterFormSchema = z.object({
    avdragRenter: z.array(AvdragRenterFormEntrySchema),
});

export type AvdragRenterFormValues = z.infer<typeof AvdragRenterFormSchema>;
