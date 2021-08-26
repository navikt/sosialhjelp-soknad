import {AdresseKategori, AdressesokTreff, Gateadresse, SoknadsMottakerStatus} from "./AdresseTypes";
import {Soknadsdata} from "../../../redux/soknadsdata/soknadsdataReducer";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";

export enum AdresseTypeaheadStatus {
    INITIELL = "INITIELL",
    SOKER = "SOKER",
    ADRESSE_OK = "ADRESSE_OK",
    ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
    ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT",
    HUSNUMMER_IKKE_SATT = "HUSNUMMER_IKKE_SATT",
}

const formaterAdresseString = (adresse: AdressesokTreff) => {
    let returverdi = adresse.adresse;
    const husbokstav: string = adresse.husbokstav != null ? adresse.husbokstav : "";
    try {
        if (adresse.postnummer != null && adresse.poststed != null) {
            if (adresse.husnummer !== "" && adresse.husnummer !== null) {
                returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.postnummer + " " + adresse.poststed;
            } else {
                if (adresse.postnummer !== null && adresse.poststed !== null) {
                    returverdi += ", " + adresse.postnummer + " " + adresse.poststed;
                }
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

const formaterSoknadsadresse = (soknadAdresse: Gateadresse | null) => {
    let formatertSoknadAdresse = "";
    if (soknadAdresse) {
        formatertSoknadAdresse =
            (soknadAdresse.gatenavn ? soknadAdresse.gatenavn : "") +
            (soknadAdresse.husnummer ? " " + soknadAdresse.husnummer : "") +
            (soknadAdresse.husbokstav ? soknadAdresse.husbokstav : "") +
            ", " +
            soknadAdresse.postnummer +
            " " +
            soknadAdresse.poststed;
        formatertSoknadAdresse.replace(/ /, " ");
    }
    return formatertSoknadAdresse;
};

const removeDuplicatesAfterTransform = (myArray: any[], transform: (item: any) => any) => {
    const propArray = myArray.map((elem) => transform(elem));
    return myArray.filter((obj, pos) => {
        return propArray.indexOf(propArray[pos]) === pos;
    });
};

const soknadsmottakerStatus = (soknadsdata: Soknadsdata): SoknadsMottakerStatus => {
    const navEnheter = soknadsdata.personalia.navEnheter;
    const valgtNavEnhet = soknadsdata.personalia.navEnhet;
    const navEnheterRestStatus: REST_STATUS = soknadsdata.restStatus.personalia.navEnheter;
    const adresser = soknadsdata.personalia.adresser;

    if (valgtNavEnhet && valgtNavEnhet.isMottakDeaktivert) {
        return SoknadsMottakerStatus.UGYLDIG;
    }
    if (valgtNavEnhet && valgtNavEnhet.isMottakMidlertidigDeaktivert) {
        return SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT;
    }
    if (valgtNavEnhet && valgtNavEnhet.valgt) {
        return SoknadsMottakerStatus.GYLDIG;
    }
    if (adresser.valg) {
        if (adresser.valg === AdresseKategori.MIDLERTIDIG || adresser.valg === AdresseKategori.FOLKEREGISTRERT) {
            if (navEnheter.length === 0 && navEnheterRestStatus === REST_STATUS.OK) {
                return SoknadsMottakerStatus.UGYLDIG;
            }
        }
        if (adresser.valg === AdresseKategori.SOKNAD && navEnheterRestStatus === REST_STATUS.OK) {
            if (adresser.soknad && navEnheter.length === 0 && adresser.soknad.gateadresse !== null) {
                return SoknadsMottakerStatus.UGYLDIG;
            }
        }
    }
    return SoknadsMottakerStatus.IKKE_VALGT;
};

export {formaterAdresseString, removeDuplicatesAfterTransform, formaterSoknadsadresse, soknadsmottakerStatus};
