import {erAktiv, erMidlDeaktivert} from "./navEnhetStatus";
import {expect, test} from "vitest";
import {NavEnhetDto} from "../generated/new/model";

const aktivNavEnhet: NavEnhetDto = {
    orgnummer: "12345",
    enhetsnummer: "4321",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommunenummer: "15533",
};

const deaktivertNavEnhet: NavEnhetDto = {
    orgnummer: "12345",
    enhetsnummer: "4321",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: true,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommunenummer: "15533",
};

const midlertidigDeaktivertNavEnhet: NavEnhetDto = {
    orgnummer: "12345",
    enhetsnummer: "4321",
    isMottakMidlertidigDeaktivert: true,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommunenummer: "15533",
};

test("erAktiv returnerer true ved aktive Nav-kontorer", () => {
    expect(erAktiv(aktivNavEnhet)).toBe(true);
});

test("erAktiv returnerer false ved alle inaktive Nav-kontorer", () => {
    expect(erAktiv(deaktivertNavEnhet)).toBe(false);
    expect(erAktiv(midlertidigDeaktivertNavEnhet)).toBe(false);
});

test("erAktiv returnerer false gitt null", () => {
    expect(erAktiv(null)).toBe(false);
});

test("erMidlDeaktivert returnerer true kun ved midlertidig deaktiverte", () => {
    expect(erMidlDeaktivert(aktivNavEnhet)).toBe(false);
    expect(erMidlDeaktivert(deaktivertNavEnhet)).toBe(false);
    expect(erMidlDeaktivert(midlertidigDeaktivertNavEnhet)).toBe(true);
});
