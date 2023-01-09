export const getStegUrl = (brukerBehandlingId: string, steg: number) => `/skjema/${brukerBehandlingId}/${steg}`;
export const erSkjemaSide = (pathname: string) => pathname.indexOf("/skjema/") >= 0 && !erEttersendelseSide(pathname);
export const erEttersendelseSide = (pathname: string) => pathname.indexOf("/ettersendelse") >= 0;
export const erSkjemaEllerEttersendelseSide = (pathname: string) => pathname.indexOf("/skjema/") >= 0;

export type NavigasjonsPromptType = "skjema" | "ettersendelse";
