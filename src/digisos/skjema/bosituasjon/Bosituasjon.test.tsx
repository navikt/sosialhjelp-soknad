import {validerAntallPersoner} from "./Bosituasjon";

const mockDispatch = () => {};

test("validerAntallPersoner er true hvis antallPersoner er null", () => {
    expect(validerAntallPersoner(null, [], mockDispatch as any)).toBe(true);
});

test("validerAntallPersoner er true hvis antallPersoner er et heltall", () => {
    expect(validerAntallPersoner("1", [], mockDispatch as any)).toBe(true);
});

test("validerAntallPersoner er false hvis antallPersoner er et desimaltall", () => {
    expect(validerAntallPersoner("1.0", [], mockDispatch as any)).toBe(false);
});

test("validerAntallPersoner er false hvis antallPersoner er en bokstav", () => {
    expect(validerAntallPersoner("e", [], mockDispatch as any)).toBe(false);
});
