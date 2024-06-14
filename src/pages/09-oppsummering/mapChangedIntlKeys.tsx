const INTL_KEYS_MAP: Record<string, string> = {
    "begrunnelse.hva.sporsmal": "begrunnelse.hva.label",
    "begrunnelse.hvorfor.sporsmal": "begrunnelse.hvorfor.label",
    "dinsituasjon.studerer.true.grad.sporsmal": "dinsituasjon.studerer.grad.sporsmal",
    "dinsituasjon.studerer.true.grad.deltid": "dinsituasjon.studerer.grad.deltid",
    "dinsituasjon.studerer.true.grad.heltid": "dinsituasjon.studerer.grad.heltid",
};

// Midlertidig hack for å fortsatt bruke gamle oppsummering inntil brukertest av ny
export const mapChangedIntlKeys = (intlKey: string): string => INTL_KEYS_MAP?.[intlKey] ?? intlKey;
