import {AdressesokTreff} from "./AdresseTypes";
import {GateadresseFrontend} from "../../../../generated/model";

const formaterAdresseString = (adresse: AdressesokTreff) => {
    let returverdi = adresse.adresse;
    const husbokstav: string = adresse.husbokstav != null ? adresse.husbokstav : "";
    try {
        if (adresse.postnummer != null && adresse.poststed != null) {
            if (adresse.husnummer !== "" && adresse.husnummer !== null) {
                returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.postnummer + " " + adresse.poststed;
            } else {
                returverdi += ", " + adresse.postnummer + " " + adresse.poststed;
            }
        } else if (adresse.kommunenavn != null) {
            if (adresse.husnummer !== "" && adresse.husnummer !== null) {
                returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.kommunenavn;
            } else {
                returverdi += ", " + adresse.kommunenavn;
            }
        }
    } catch (error) {
        console.warn("error: " + error);
    }
    return returverdi;
};

const formaterSoknadsadresse = (soknadAdresse?: GateadresseFrontend | null) => {
    if (!soknadAdresse) return "";

    const {gatenavn, husnummer, husbokstav, postnummer, poststed} = soknadAdresse;

    return `${gatenavn} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer}, ${poststed}`;
};

const removeDuplicatesAfterTransform = (myArray: any[], transform: (item: any) => any) => {
    const propArray = myArray.map((elem) => transform(elem));
    return myArray.filter((obj, pos) => {
        return propArray.indexOf(propArray[pos]) === pos;
    });
};

export {formaterAdresseString, removeDuplicatesAfterTransform, formaterSoknadsadresse};
