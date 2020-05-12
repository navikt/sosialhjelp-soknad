import {erPaStegEnOgValgtNavEnhetErUgyldig, responseIsOfTypeNavEnhet} from "./containerUtils";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";

const enUgyldigNavEnhet: NavEnhet = {
    orgnr: "1234",
    enhetsnr: "2345",
    isMottakMidlertidigDeaktivert: true,
    isMottakDeaktivert: false,
    enhetsnavn: "asdf",
    kommunenavn: "fdsa",
    kommuneNr: "3456",
    valgt: true,
};

const enGyldigNavEnhet: NavEnhet = {
    orgnr: "1234",
    enhetsnr: "2345",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: false,
    enhetsnavn: "asdf",
    kommunenavn: "fdsa",
    kommuneNr: "3456",
    valgt: true,
};

const ugyldigNavenhetEnhetsnrNull: any = {
    orgnr: "1234",
    enhetsnr: null,
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: true,
    enhetsnavn: "asdf",
    kommunenavn: "fdsa",
    kommuneNr: "3456",
    valgt: true,
};

test("that erPaStegEnOgValgtNavEnhetErUgyldig gir riktig svar", () => {
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, null)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, null)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, enUgyldigNavEnhet)).toBe(true);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, enUgyldigNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, enGyldigNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(2, enGyldigNavEnhet)).toBe(false);
    expect(erPaStegEnOgValgtNavEnhetErUgyldig(1, ugyldigNavenhetEnhetsnrNull)).toBe(true);
});

const gyldigNavEnhet: NavEnhet = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const undefinedNavEnhet: null = null;

const navEnhetMidlertidigDeaktivert: NavEnhet = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: true,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const navEnhetMedManglendeEnhetsnr: NavEnhet = {
    orgnr: null,
    enhetsnr: null,
    isMottakMidlertidigDeaktivert: true,
    isMottakDeaktivert: true,
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
const ugyldigResponseRandomObject = {bare: "noe", tull: "og", tall: 1234556};
const ugyldigResponseTomListe: any[] = [];
const gyldigResponse = gyldigNavEnhet;

test("that responseIsOfTypeListOfNavEnhetAndHasAtleastOneElement ikke fører til nullpointer feil", () => {
    expect(responseIsOfTypeNavEnhet(ugyldigResponseUndefined)).toBe(false);
    expect(responseIsOfTypeNavEnhet(ugyldigResponseNull)).toBe(false);
    expect(responseIsOfTypeNavEnhet(ugyldigResponseString)).toBe(false);
    expect(responseIsOfTypeNavEnhet(ugyldigResponseRandomObject)).toBe(false);
    expect(responseIsOfTypeNavEnhet(ugyldigResponseTomListe)).toBe(false);
    expect(responseIsOfTypeNavEnhet(gyldigResponse)).toBe(true);
});
