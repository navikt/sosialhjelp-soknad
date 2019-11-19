import {AdresseKategori, AdressesokTreff, Gateadresse, NavEnhet, SoknadsMottakerStatus} from "./AdresseTypes";
import {Soknadsdata} from "../../../redux/soknadsdata/soknadsdataReducer";

export enum AdresseTypeaheadStatus {
    INITIELL = "INITIELL",
    SOKER = "SOKER",
    ADRESSE_OK = "ADRESSE_OK",
    ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
    ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT",
    HUSNUMMER_IKKE_SATT = "HUSNUMMER_IKKE_SATT"
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

const formaterSoknadsadresse = (soknadAdresse: Gateadresse | null) => {
    let formatertSoknadAdresse = "";
    if (soknadAdresse) {
        formatertSoknadAdresse =
            (soknadAdresse.gatenavn ? soknadAdresse.gatenavn : "") + " " +
            (soknadAdresse.husnummer ? soknadAdresse.husnummer : "") + " " +
            (soknadAdresse.husbokstav ? soknadAdresse.husbokstav : "") + ", " +
            soknadAdresse.postnummer + " " + soknadAdresse.poststed;
        formatertSoknadAdresse.replace(/ /, " ");
    }
    return formatertSoknadAdresse;
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

const beregnTekstfeltMarkorPosisjon = (adresse: AdressesokTreff): number => {
    const husbokstav = adresse.husbokstav ? adresse.husbokstav : "";
    if (adresse.adresse) {
        return adresse.husnummer ?
            (adresse.adresse.length +
                adresse.husnummer.length +
                husbokstav.length + 1)
            : (adresse.adresse.length + 1);
    }
    return 0;
};

const ekstraherHusnummerHusbokstav = (inntastetAdresse: string): any => {
    const matches = inntastetAdresse.match(/ *(\d+) *([^0-9 ]*) *,/);
    if (matches) {
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

const soknadsmottakerStatus = (soknadsdata: Soknadsdata): SoknadsMottakerStatus => {
    const navEnheter = soknadsdata.personalia.navEnheter;
    const valgtNavEnhet: NavEnhet | undefined = navEnheter.find((navEnhet: NavEnhet) => navEnhet.valgt);
    const adresser = soknadsdata.personalia.adresser;


    if (valgtNavEnhet && valgtNavEnhet.isMottakMidlertidigDeaktivert) {
        return SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT
    }
    if (valgtNavEnhet && valgtNavEnhet.valgt && !valgtNavEnhet.isMottakMidlertidigDeaktivert) {
        return SoknadsMottakerStatus.GYLDIG;
    }
    if (adresser.valg) {
        if (adresser.valg === AdresseKategori.MIDLERTIDIG || adresser.valg === AdresseKategori.FOLKEREGISTRERT) {
            if (navEnheter.length === 0) {
                return SoknadsMottakerStatus.UGYLDIG;
            }
        }
        if (adresser.valg === AdresseKategori.SOKNAD) {
            if (adresser.soknad && navEnheter.length === 0 && adresser.soknad.gateadresse !== null) {
                return SoknadsMottakerStatus.UGYLDIG;
            }
        }
    }
    return SoknadsMottakerStatus.IKKE_VALGT;
};

export {
    formaterAdresseString,
    removeDuplicatesAfterTransform,
    setCaretPosition,
    ekstraherHusnummerHusbokstav,
    formaterSoknadsadresse,
    beregnTekstfeltMarkorPosisjon,
    soknadsmottakerStatus
};
