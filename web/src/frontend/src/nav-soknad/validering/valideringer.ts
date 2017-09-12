export function pakrevd(value: string): boolean {
	return typeof value === "string" && value.length > 0;
}

export function minLengde(value: string, min: number): boolean {
	return typeof value === "string" && value.length >= min;
}

export function maksLengde(value: string, max: number): boolean {
	return typeof value === "string" && value.length <= max;
}

export function erTall(value: string): boolean {
	return value && /^[0-9]$/i.test(value);
}

export function erTelefonnummer(value: string): boolean {
	if (
		typeof value !== "string" ||
		value.length < 8 ||
		(value.length === 8 && !/^[0-9]{8}$/i.test(value))
	) {
		return false;
	}
	return true;
}

export function erKontonummer(value: string): boolean {
	if (
		typeof value !== "string" ||
		value.length < 11 ||
		value.length > 13 ||
		value.length === 12 ||
		(value.length === 11 && !/^[0-9]{11}$/i.test(value)) ||
		(value.length === 13 && !/^[. 0-9]{13}$/i.test(value))
	) {
		return false;
	}

	return true;
}

export default {
	pakrevd,
	minLengde,
	maksLengde,
	erTall,
	erTelefonnummer,
	erKontonummer
};
