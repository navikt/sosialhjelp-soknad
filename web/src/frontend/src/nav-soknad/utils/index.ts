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
