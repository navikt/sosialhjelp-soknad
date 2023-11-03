import {isValidKontonummer} from "./isValidKontonummer";

export const minLengde = (value: string, min: number) => value.length >= min;
export const maksLengde = (value: string, max: number) => value.length <= max;
export function erTall(value: string, kunHeltall?: boolean): boolean {
    const reg = kunHeltall ? /^[0-9]*$/i : /^[0-9,]*$/i;
    return reg.test(value);
}

export const erTelefonnummer = (value: string) => /^\d{8}$/.test(value);

export const erKontonummer = (value: string) => isValidKontonummer(value.replace(/[. ]/g, ""));

export function erSamvaersgrad(value: number | null): boolean {
    if (!value) {
        return true;
    }
    if (Number.isNaN(value)) {
        return false;
    }
    return !(value < 0 || value > 100);
}
