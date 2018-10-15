export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function erDev(): boolean {
	const url = window.location.href;
	return url.indexOf("localhost:3000") > 0;
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
