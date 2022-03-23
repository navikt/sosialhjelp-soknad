import {validerAntallPersoner} from "./AntallPersoner";

test("validerAntallPersoner er null hvis antallPersoner er tom streng", () => {
    expect(validerAntallPersoner("")).toBe(null);
});

test("validerAntallPersoner er heltall hvis antallPersoner er et heltall", () => {
    expect(validerAntallPersoner("1")).toBe("1");
});

test("validerAntallPersoner thrower hvis antallPersoner er et desimaltall", () => {
    expect(validerAntallPersoner("1.0")).toThrowError();
});

test("validerAntallPersoner thrower hvis antallPersoner er en bokstav", () => {
    expect(validerAntallPersoner("e")).toThrowError();
});
