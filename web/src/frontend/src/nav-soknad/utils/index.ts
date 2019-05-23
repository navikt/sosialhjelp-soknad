export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function erDev(): boolean {
	const url = window.location.href;
	return (url.indexOf("localhost:3000") > 0 || url.indexOf("devillo.no:3000") > 0);
}

export function erMockMiljoEllerDev(): boolean {
	const url = window.location.href;
	if (erDev()){
		return true;
	}
	return (
		url.indexOf("sosialhjelp-test.dev-sbs.nais.io") > 0 ||
		url.indexOf("soknadsosialhjelp-t1.nais.oera") > 0 ||
		url.indexOf("heroku") > 0 ||
		url.indexOf("digisos-test.com") > 0
	);
}

export const now = (): number => {
	return new Date().getTime();
};

export const formaterIsoDato = (dato: string): string => {
	if (dato) {
		const aar = dato.slice(0, 4);
		const maaned = dato.slice(5, 7);
		const dag = dato.slice(8);
		return `${dag}.${maaned}.${aar}`;
	}
	return ""
};
