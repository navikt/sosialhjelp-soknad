import {isValidKontonummer} from "./isValidKontonummer";

const GYLDIGE_KONTONUMRE = [
    "83553802299",
    "72328873568",
    "89771891706",
    "85284017981",
    "78092720631",
    "59709619440",
    "53955959724",
    "85195976495",
    "69866125732",
    "72932176085",
    "33930354622",
    "85695276163",
    "11308971068",
    "82411545713",
    "95084420809",
    "50651919476",
    "85511863274",
    "14871516368",
    "28121707324",
    "68640039748",
    "59681494884",
    "45450476726",
    "06386678977",
    "89203678437",
    "08742523196",
    "70919619471",
    "06164272557",
    "37096860472",
    "30518108936",
    "43514277576",
    "23020619945",
    "47049866956",
    "78273971628",
    "17003853896",
    "37495918743",
    "55548761181",
    "73114829355",
    "13869786262",
    "43437357170",
    "21889791265",
    "57148190110",
    "88306099277",
    "18849758035",
    "24693157974",
    "34009387252",
    "87693845880",
    "55955934422",
    "89915840117",
    "95082917927",
    "69649546584",
] as const;

describe("isValidKontonummer", () => {
    it("should return false for len != 11", () => {
        expect(isValidKontonummer("9508291792")).toBe(false);
        expect(isValidKontonummer("950829179271")).toBe(false);
    });

    it("should return true given valid checksum", () => {
        GYLDIGE_KONTONUMRE.forEach((kontonr) => {
            expect(isValidKontonummer(kontonr)).toBe(true);
        });
    });

    it("should return false given invalid checksum", () => {
        expect(isValidKontonummer("95084420803")).toBe(false);
    });
});
