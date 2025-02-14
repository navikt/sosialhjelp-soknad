import {AdresseForslag} from "../../../generated/model";
import {AdresserDtoBrukerAdresse, VegAdresseType} from "../../../generated/new/model";
import {logger} from "@navikt/next-logger";

const formaterAdresseString = (sokTreff: AdresseForslag | null | undefined) => {
    if (!sokTreff) return "";
    const {adresse, husnummer, postnummer, poststed, husbokstav} = sokTreff;
    return `${adresse} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

const formaterSoknadsadresse = (soknadAdresse?: AdresserDtoBrukerAdresse | null) => {
    if (!soknadAdresse) return "";

    if (soknadAdresse.type !== VegAdresseType.VegAdresse) {
        logger.warn(`Ustøttet adressetype valgt av bruker: ${soknadAdresse.type}`);
        return "";
    }
    const {gatenavn, husnummer, husbokstav, postnummer, poststed} = soknadAdresse;
    return `${gatenavn} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

export {formaterAdresseString, formaterSoknadsadresse};
