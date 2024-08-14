import {erAktiv, erMidlDeaktivert} from "./navEnhetStatus";
import {NavEnhetFrontend} from "../generated/model";
import {expect, test} from "vitest";

const aktivNavEnhet: NavEnhetFrontend = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const deaktivertNavEnhet: NavEnhetFrontend = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: false,
    isMottakDeaktivert: true,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

const midlertidigDeaktivertNavEnhet: NavEnhetFrontend = {
    orgnr: "12345",
    enhetsnr: "4321",
    isMottakMidlertidigDeaktivert: true,
    isMottakDeaktivert: false,
    enhetsnavn: "Enhetsnavn",
    kommunenavn: "Kommunenavn",
    kommuneNr: "15533",
    valgt: true,
};

test("erAktiv returnerer true ved aktive NAV-kontorer", () => {
    expect(erAktiv(aktivNavEnhet)).toBe(true);
});

test("erAktiv returnerer false ved alle inaktive NAV-kontorer", () => {
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
