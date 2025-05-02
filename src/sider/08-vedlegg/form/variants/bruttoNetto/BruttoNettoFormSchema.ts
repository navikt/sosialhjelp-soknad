import {z} from "zod";
import {BelopSchema} from "../../common/BelopSchema.ts";

export const BruttoNettoFormSchema = z.object({
    brutto: BelopSchema.optional(),
    netto: BelopSchema.optional(),
});
