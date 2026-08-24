import {AdresseForslag} from "../../../generated/model";
import {
    MatrikkelAdresse,
    PostboksAdresse,
    UstrukturertAdresse,
    VegAdresse,
    VegAdresseType,
} from "../../../generated/new/model";
import getLogger from "@log/logger";

export type AdresserDtoBrukerAdresse = MatrikkelAdresse | PostboksAdresse | UstrukturertAdresse | VegAdresse;

const formaterAdresseString = (sokTreff: AdresseForslag | null | undefined) => {
    if (!sokTreff) return "";
    const {adresse, husnummer, postnummer, poststed, husbokstav} = sokTreff;
    return `${adresse} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

const formaterSoknadsadresse = (soknadAdresse?: AdresserDtoBrukerAdresse | null) => {
    if (!soknadAdresse) return "";

    if (soknadAdresse.type !== VegAdresseType.VegAdresse) {
        getLogger().warn(`Ustøttet adressetype valgt av bruker: ${soknadAdresse.type}`);
        return "";
    }
    const {gatenavn, husnummer, husbokstav, postnummer, poststed} = soknadAdresse;
    return `${gatenavn} ${husnummer}${husbokstav ? ` ${husbokstav}` : ""}, ${postnummer} ${poststed}`;
};

export {formaterAdresseString, formaterSoknadsadresse};
