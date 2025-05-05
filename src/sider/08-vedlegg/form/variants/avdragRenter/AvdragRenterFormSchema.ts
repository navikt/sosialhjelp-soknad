import {z} from "zod";
import {BelopSchema} from "../../common/BelopSchema.ts";

export const AvdragRenterFormEntrySchema = z.object({
    avdrag: BelopSchema.optional(),
    renter: BelopSchema.optional(),
});

export const AvdragRenterFormSchema = z.object({
    avdragRenter: z.array(AvdragRenterFormEntrySchema),
});

export type AvdragRenterFormValues = z.infer<typeof AvdragRenterFormSchema>;
