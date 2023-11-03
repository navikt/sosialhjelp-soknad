const KONTONR_REGEX = /^\d{11}$/;
const MOD11_VEKTTALL = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2] as const;

const kontonummerChecksum = (verdi: string) => {
    const kontonrSifre = verdi.split("").map((siffer) => parseInt(siffer));
    const kontrollSiffer = kontonrSifre.pop();
    const checksumReducer = (sum: number, digit: number, idx: number) => sum + digit * MOD11_VEKTTALL[idx];
    const checkSum = (11 - (kontonrSifre.reduce(checksumReducer, 0) % 11)) % 11;
    return checkSum === kontrollSiffer;
};

export function isValidKontonummer(value: string): boolean {
    if (!KONTONR_REGEX.test(value)) return false;
    return kontonummerChecksum(value);
}
