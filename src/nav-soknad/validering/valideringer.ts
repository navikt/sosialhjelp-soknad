import {konverterFdatoTilDato, mod11Kontroll} from "./valideringFuncUtils";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";

export function pakrevd(value: string): ValideringsFeilKode | undefined {
    return typeof value === "string" && value.length > 0 ? undefined : ValideringsFeilKode.PAKREVD;
}

export function minLengde(value: string, min: number): ValideringsFeilKode | undefined {
    return typeof value === "string" && value.length >= min ? undefined : ValideringsFeilKode.MIN_LENGDE;
}

export function maksLengde(value: string, max: number): ValideringsFeilKode | undefined {
    if (typeof value !== "string") {
        return undefined;
    }
    return typeof value === "string" && value.length <= max ? undefined : ValideringsFeilKode.MAX_LENGDE;
}

export function erTall(value: string, kunHeltall?: boolean): ValideringsFeilKode | undefined {
    const reg = kunHeltall ? /^[0-9]*$/i : /^[0-9,]*$/i;
    return value && reg.test(value) ? undefined : ValideringsFeilKode.ER_TALL;
}

export function erTelefonnummer(value: string): ValideringsFeilKode | undefined {
    if (
        typeof value !== "string" ||
        value.length < 8 ||
        value.length > 8 ||
        (value.length === 8 && !/^[0-9]{8}$/i.test(value))
    ) {
        return ValideringsFeilKode.ER_TELEFONNUMMER;
    }
    return undefined;
}

export function erKontonummer(value: string): ValideringsFeilKode | undefined {
    if (!value || typeof value !== "string") {
        return ValideringsFeilKode.ER_KONTONUMMER;
    }
    const kontonummer = value.replace(/\.| /g, "");
    if (
        kontonummer.length !== 11 ||
        !(parseInt(kontonummer.charAt(kontonummer.length - 1), 10) === mod11Kontroll(kontonummer))
    ) {
        return ValideringsFeilKode.ER_KONTONUMMER;
    }
    return undefined;
}

export function erSamvaersgrad(value: number | null): ValideringsFeilKode | undefined {
    if (!value) {
        return undefined;
    }
    if (isNaN(value)) {
        return ValideringsFeilKode.ER_SAMVAERSGRAD;
    }
    if (value < 0 || value > 100) {
        return ValideringsFeilKode.ER_SAMVAERSGRAD;
    }
    return undefined;
}

/** Validerer ddmmåååå - fødselsdato i fødselsnummeret */
export function fdato(dato: string): ValideringsFeilKode | undefined {
    if (!dato || typeof dato !== "string" || !dato.match(/[0-9]{8}/)) {
        return ValideringsFeilKode.ER_FDATO;
    }
    const d = konverterFdatoTilDato(dato);
    if (!d) {
        return ValideringsFeilKode.ER_FDATO;
    } else if (d.getTime() > new Date().getTime()) {
        return ValideringsFeilKode.ER_FDATO_ETTER_IDAG;
    }
    return undefined;
}

export default {
    pakrevd,
    minLengde,
    maksLengde,
    erTall,
    erTelefonnummer,
    erKontonummer,
};
