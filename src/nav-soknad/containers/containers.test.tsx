import {erPaStegEnOgValgtNavEnhetErUgyldig} from "./containerUtils";
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