export const mod11Kontroll = (verdi: string) => {
	let controlNumber = 2;
	let sumForMod = 0;
	let i = 0;

	for (i = verdi.length - 2; i >= 0; --i) {
		sumForMod += parseInt(verdi.charAt(i), 10) * controlNumber;
		if (++controlNumber > 7) {
			controlNumber = 2;
		}
	}
	const result = 11 - sumForMod % 11;
	return result === 11 ? 0 : result;
};
