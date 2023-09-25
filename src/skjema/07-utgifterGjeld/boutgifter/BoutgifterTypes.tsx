import {BoutgifterFrontend} from "../../../generated/model";

export const initialBoutgifterState: BoutgifterFrontend = {
    bekreftelse: true,
    husleie: false,
    strom: false,
    kommunalAvgift: false,
    oppvarming: false,
    boliglan: false,
    annet: false,
    skalViseInfoVedBekreftelse: false,
};

export enum BoutgifterKeys {
    HUSLEIE = "husleie",
    STROM = "strom",
    KOMMUNALAVGIFT = "kommunalAvgift",
    OPPVARMING = "oppvarming",
    BOLIGLAN = "boliglan",
    ANNET = "annet",
}
