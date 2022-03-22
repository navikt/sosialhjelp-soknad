export type BosituasjonData = {
    botype: null | string;
    antallPersoner: null | string;
};

export const initialBosituasjonState: BosituasjonData = {
    botype: null,
    antallPersoner: null,
};

export enum Bosituasjonsvalg {
    eier = "eier",
    leier = "leier",
    kommunal = "kommunal",
    ingen = "ingen",
    annet = "annet",
}

export enum BosituasjonAnnetvalg {
    foreldre = "annet.botype.foreldre",
    familie = "annet.botype.familie",
    venner = "annet.botype.venner",
    institusjon = "annet.botype.institusjon",
    fengsel = "annet.botype.fengsel",
    krisesenter = "annet.botype.krisesenter",
}
