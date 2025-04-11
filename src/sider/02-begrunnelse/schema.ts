import * as z from "zod";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";

export const MAX_LEN_HVA = 500;
export const MAX_LEN_HVORFOR = 600;
export const MAX_LEN_ANNET = 150;

const feilmeldinger: Record<string, DigisosLanguageKey> = {
    maksLengde: "validering.maksLengde",
} as const;

export interface FormValues {
    hvaSokesOm?: string | null;
    hvorforSoke?: string | null;
}

export const begrunnelseSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, feilmeldinger.maksLengde).optional(),
    hvorforSoke: z.string().max(MAX_LEN_HVORFOR, feilmeldinger.maksLengde).optional(),
});
