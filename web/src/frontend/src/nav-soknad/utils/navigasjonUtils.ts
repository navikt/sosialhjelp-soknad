export function getStegUrl(brukerBehandlingId: string, steg: number) {
	return `/skjema/${brukerBehandlingId}/${steg}`;
}

export function erSkjemaside(pathname: string): boolean {
	return (
		pathname.indexOf("/skjema/") >= 0 || pathname.indexOf("/kvittering") >= 0
	);
}

export const lesBrukerbehandlingsId = (): string|null => {
	const match = window.location.pathname.match(/\/([^\/]+)\/\d+$/);
	if (match && match.length > 0) {
		return match[1];
	} else {
		return null;
	}
};