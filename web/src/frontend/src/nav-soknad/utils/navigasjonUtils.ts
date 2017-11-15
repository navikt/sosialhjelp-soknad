export function getStegUrl(brukerBehandlingId: string, steg: number) {
	return `/skjema/${brukerBehandlingId}/${steg}`;
}

export function erSkjemaside(pathname: string): boolean {
	return (
		pathname.indexOf("/skjema/") >= 0 || pathname.indexOf("/kvittering") >= 0
	);
}
