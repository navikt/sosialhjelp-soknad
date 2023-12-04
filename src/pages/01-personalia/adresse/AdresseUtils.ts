import {AdresseForslag, GateadresseFrontend} from "../../../generated/model";

const formaterAdresseString = (sokTreff: AdresseForslag | null | undefined) => {
    if (!sokTreff) return "";
    const {adresse, husnummer, postnummer, poststed, husbokstav} = sokTreff;
    return `${adresse} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

const formaterSoknadsadresse = (soknadAdresse?: GateadresseFrontend | null) => {
    if (!soknadAdresse) return "";

    const {gatenavn, husnummer, husbokstav, postnummer, poststed} = soknadAdresse;

    return `${gatenavn} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

const removeDuplicatesAfterTransform = (myArray: any[], transform: (item: any) => any) => {
    const propArray = myArray.map((elem) => transform(elem));
    return myArray.filter((obj, pos) => {
        return propArray.indexOf(propArray[pos]) === pos;
    });
};

export {formaterAdresseString, removeDuplicatesAfterTransform, formaterSoknadsadresse};
