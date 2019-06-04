export function getStegUrl(brukerBehandlingId: string, steg: number) {
	return `/skjema/${brukerBehandlingId}/${steg}`;
}

export function erSkjemaside(pathname: string): boolean {
	return (
		pathname.indexOf("/skjema/") >= 0 || pathname.indexOf("/kvittering") >= 0
	);
}

export const lesKommunenrFraUrl = (): string => {
	const matches = window.location.href.match(/kommunenr=(\d+)$/);
	if( matches &&  matches.length > 1) {
		return matches[1];
	}
	return null;
};
