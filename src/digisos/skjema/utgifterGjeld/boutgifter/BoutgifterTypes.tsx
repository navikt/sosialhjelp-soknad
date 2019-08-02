export interface Boutgifter {
    "bekreftelse" : null | boolean;
    "husleie" : boolean;
    "strom" : boolean;
    "kommunalAvgift" : boolean;
    "oppvarming" : boolean;
    "boliglan" : boolean;
    "annet" : boolean;
}

export const initialBoutgifterState: Boutgifter = {
    "bekreftelse" : null,
    "husleie" : false,
    "strom" : false,
    "kommunalAvgift" : false,
    "oppvarming" : false,
    "boliglan" : false,
    "annet" : false
};

export enum BoutgifterKeys {
    BEKREFTELSE = "bekreftelse",
    HUSLEIE = "husleie",
    STROM = "strom",
    KOMMUNALAVGIFT = "kommunalAvgift",
    OPPVARMING = "oppvarming",
    BOLIGLAN = "boliglan",
    ANNET = "annet",
}