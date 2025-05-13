import {z} from "zod";
import {BelopSchema} from "./BelopSchema.ts";

export const BelopEnFormSchema = z.object({
    belop: BelopSchema.optional(),
});

export type BelopEnFormValues = z.infer<typeof BelopEnFormSchema>;
