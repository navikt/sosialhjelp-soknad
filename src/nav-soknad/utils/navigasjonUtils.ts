export function getStegUrl(brukerBehandlingId: string, steg: number) {
    return `/skjema/${brukerBehandlingId}/${steg}`;
}

export function erSkjemaSide(pathname: string): boolean {
    return pathname.indexOf("/skjema/") >= 0 && !erEttersendelseSide(pathname);
}

export function erEttersendelseSide(pathname: string): boolean {
    return pathname.indexOf("/ettersendelse") >= 0;
}

export function erSkjemaEllerEttersendelseSide(pathname: string): boolean {
    return pathname.indexOf("/skjema/") >= 0;
}

export enum NAVIGASJONSPROMPT {
    SKJEMA = "SKJEMA",
    ETTERSENDELSE = "ETTERSENDELSE",
    SERVERFEIL = "SERVERFEIL",
}
