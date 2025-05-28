import {z} from "zod";

export const KontonummerSchema = z.preprocess((val) => {
    if (typeof val !== "string") return val;
    const digitsOnly = val.replace(/\D/g, "").trim();
    return digitsOnly === "" ? undefined : digitsOnly;
}, z.string().length(11, "kontakt.kontonummer.feilmelding").optional()) as z.ZodEffects<
    z.ZodOptional<z.ZodString>,
    string | undefined,
    string | undefined
>;

export const KontonummerFormSchema = z
    .object({
        kontonummerBruker: KontonummerSchema,
        harIkkeKonto: z.boolean().optional(),
    })
    // clear the kontonummer if harIkkeKonto is set
    .refine(({kontonummerBruker, harIkkeKonto}) => (harIkkeKonto ? {harIkkeKonto} : {kontonummerBruker}));

export type KontonummerFormValues = z.infer<typeof KontonummerFormSchema>;
