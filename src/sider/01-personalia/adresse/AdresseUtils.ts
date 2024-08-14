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

export {formaterAdresseString, formaterSoknadsadresse};
