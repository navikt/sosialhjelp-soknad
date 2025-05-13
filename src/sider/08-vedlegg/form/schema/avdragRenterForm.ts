import {z} from "zod";
import {BelopSchema} from "./BelopSchema.ts";

export const AvdragRenterFormSchema = z.object({
    avdragRenter: z.array(
        z.object({
            avdrag: BelopSchema.optional(),
            renter: BelopSchema.optional(),
        })
    ),
});

export type AvdragRenterFormValues = z.infer<typeof AvdragRenterFormSchema>;
