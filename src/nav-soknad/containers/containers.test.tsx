import {
    erPaStegEnOgValgtNavEnhetErUgyldig, responseIsOfTypeListAndContainsAtleastOneObject,
} from "./containerUtils";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";

const exmaple1: NavEnhet =
    {
        orgnr: "1234",
        enhetsnr: "2345",
        isMottakMidlertidigDeaktivert: true,
        enhetsnavn: "asdf",
        kommunenavn: "fdsa",
        kommuneNr: "3456",
        valgt: true,
    };

const example2: NavEnhet =
    {
        orgnr: "1234",
        enhetsnr: "2345",
        isMottakMidlertidigDeaktivert: false,
        enhetsnavn: "asdf",
        kommunenavn: "fdsa",
        kommuneNr: "3456",
        valgt: true,
    };

test("that erPaStegEnOgValgtNavEnhetErIkkeGyldig gir riktig svar", () => {
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, undefined)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, undefined)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, exmaple1)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, exmaple1)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, example2)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, example2)).toBe(false);
});

const gyldigNavEnhet: NavEnhet = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const undefinedNavEnhet: undefined = undefined;

const navEnhetMidlertidigDeaktivert: NavEnhet = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: true,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const navEnhetMedManglendeEnhetsnr: NavEnhet = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: true,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

test("that erPaStegEnOgValgtNavEnhetErUgyldig returnerer riktig", () => {
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, gyldigNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, undefinedNavEnhet)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, navEnhetMidlertidigDeaktivert)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, navEnhetMedManglendeEnhetsnr)).toBe(true);

    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, gyldigNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, undefinedNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, navEnhetMedManglendeEnhetsnr)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, navEnhetMidlertidigDeaktivert)).toBe(false);
});

const ugyldigResponseUndefined: undefined = undefined;
const ugyldigResponseNull: null = null;
const ugyldigResponseString: string = "En random string";
const ugyldigResponseRandomObject = { "bare": "noe", "tull": "og", "tall": 1234556};
const ugyldigResponseTomListe: any[] = [];
const ugyldigResponseListeMedFeilTypeObjecter = [ugyldigResponseRandomObject];
const gyldigResponse = [gyldigNavEnhet]

test("that responseIsOfTypeListOfNavEnhetAndHasAtleastOneElement ikke fører til nullpointer feil", () => {
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseUndefined)).toBe(false);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseNull)).toBe(false);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseString)).toBe(false);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseRandomObject)).toBe(false);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseTomListe)).toBe(false);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(ugyldigResponseListeMedFeilTypeObjecter)).toBe(true);
    expect(responseIsOfTypeListAndContainsAtleastOneObject(gyldigResponse)).toBe(true)
});
