import { Adresse } from "./AdresseTypeahead";

export const enum AdresseTypeaheadStatus {
	INITIELL = "INITIELL",
	SOKER = "SOKER",
	ADRESSE_OK = "ADRESSE_OK",
	ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
	ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT",
	HUSNUMMER_IKKE_SATT = "HUSNUMMER_IKKE_SATT"
}

const formaterAdresseString = (adresse: Adresse) => {
	let returverdi = adresse.adresse;
	const husbokstav: string = adresse.husbokstav != null ? adresse.husbokstav : "";
	try {
		if (adresse.postnummer != null && adresse.poststed != null) {
			if (adresse.husnummer !== "" && adresse.husnummer !== null) {
				returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.postnummer + " " + adresse.poststed;
			} else {
				if (adresse.postnummer !== null && adresse.poststed !== null) {
					returverdi += " , " + adresse.postnummer + " " + adresse.poststed;
				}
			}
		} else if (adresse.kommunenavn != null) {
			if (adresse.husnummer !== "" && adresse.husnummer !== null) {
				returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.kommunenavn;
			} else {
				returverdi += " , " + adresse.kommunenavn;
			}
		}
	} catch (error) {
		console.warn("error: " + error);
	}
	return returverdi;
};

const removeDuplicatesAfterTransform = (myArray: any[], transform: (item: any) => any) => {
	const propArray = myArray.map(elem => transform(elem));
	return myArray.filter((obj, pos) => {
		return propArray.indexOf(propArray[pos]) === pos;
	});
};

const setCaretPosition = (ctrl: any, pos: number) => {
	if (ctrl.setSelectionRange) { // Modern browsers
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) { // IE8 and below
		const range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select();
	}
};

const ekstraherHusnummerHusbokstav = (inntastetAdresse: string ): any => {
	const matches = inntastetAdresse.match(/ *(\d+) *([^0-9 ]*) *,/);
	if(matches) {
		return {
			husnummer: matches[1],
			husbokstav: matches[2]
		};
	}
	return {
		husnummer: '',
		husbokstav: ''
	};
};

export { formaterAdresseString, removeDuplicatesAfterTransform, setCaretPosition, ekstraherHusnummerHusbokstav };
