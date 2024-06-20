import {expect, test} from "vitest";
import {validerAntallPersoner} from "./validerAntallPersoner";

test("validerAntallPersoner er undefined hvis antallPersoner er tom streng", () => {
    expect(validerAntallPersoner("")).toBe(undefined);
});

test("validerAntallPersoner er heltall hvis antallPersoner er et heltall", () => {
    expect(validerAntallPersoner("1")).toBe(1);
});

test("validerAntallPersoner thrower hvis antallPersoner ikke er heltall", () => {
    expect(() => validerAntallPersoner("1.1")).toThrowError();
});

test("validerAntallPersoner thrower hvis antallPersoner er en bokstav", () => {
    expect(() => validerAntallPersoner("e")).toThrowError();
});
