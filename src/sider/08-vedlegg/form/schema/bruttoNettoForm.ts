import {z} from "zod";
import {BelopSchema} from "./BelopSchema.ts";

export const BruttoNettoFormSchema = z.object({
    brutto: BelopSchema.optional(),
    netto: BelopSchema.optional(),
});

export type BruttoNettoFormValues = z.infer<typeof BruttoNettoFormSchema>;
