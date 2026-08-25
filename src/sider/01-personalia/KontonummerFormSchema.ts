import {z} from "zod";

export const KontonummerSchema = z.preprocess((val) => {
    if (typeof val !== "string") return val;
    const digitsOnly = val.replace(/\D/g, "").trim();
    return digitsOnly === "" ? undefined : digitsOnly;
}, z.string().optional()) as z.ZodType<string | undefined, string | undefined>;
//   ^^^ https://github.com/colinhacks/zod/issues/3537#issuecomment-2829790481

export const KontonummerFormSchema = z
    .object({
        kontonummerBruker: KontonummerSchema,
        harIkkeKonto: z.boolean().optional(),
    })
    .superRefine(({kontonummerBruker, harIkkeKonto}, ctx) => {
        if (!harIkkeKonto && kontonummerBruker !== undefined && kontonummerBruker.length !== 11) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "kontakt.kontonummer.feilmelding",
                path: ["kontonummerBruker"],
            });
        }
    });

export type KontonummerFormValues = z.infer<typeof KontonummerFormSchema>;
