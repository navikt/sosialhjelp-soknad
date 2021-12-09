import {konverterFdatoTilDato, mod11Kontroll} from "./valideringFuncUtils";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";

export function minLengde(value: string, min: number): boolean {
    return typeof value === "string" && value.length >= min ? true : false;
}

export function maksLengde(value: string, max: number): boolean {
    if (typeof value !== "string") {
        return true;
    }
    return typeof value === "string" && value.length <= max ? true : false;
}

export function erTall(value: string, kunHeltall?: boolean): boolean {
    const reg = kunHeltall ? /^[0-9]*$/i : /^[0-9,]*$/i;
    return value && reg.test(value) ? true : false;
}

export function erTelefonnummer(value: string): boolean {
    if (
        typeof value !== "string" ||
        value.length < 8 ||
        value.length > 8 ||
        (value.length === 8 && !/^[0-9]{8}$/i.test(value))
    ) {
        return false;
    }
    return true;
}

export function erKontonummer(value: string): boolean {
    if (!value || typeof value !== "string") {
        return false;
    }
    const kontonummer = value.replace(/\.| /g, "");
    if (
        kontonummer.length !== 11 ||
        !(parseInt(kontonummer.charAt(kontonummer.length - 1), 10) === mod11Kontroll(kontonummer))
    ) {
        return false;
    }
    return true;
}

export function erSamvaersgrad(value: number | null): boolean {
    if (!value) {
        return true;
    }
    if (Number.isNaN(value)) {
        return false;
    }
    if (value < 0 || value > 100) {
        return false;
    }
    return true;
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
