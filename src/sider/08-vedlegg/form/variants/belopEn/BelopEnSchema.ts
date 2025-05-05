import {z} from "zod";
import {BelopSchema} from "../../common/BelopSchema.ts";

export const BelopEnSchema = z.object({
    belop: BelopSchema.optional(),
});

export type BelopEnFormValues = z.infer<typeof BelopEnSchema>;
