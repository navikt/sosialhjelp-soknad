export interface Verdier {
    bekreftelse: null | boolean;
    bolig: boolean;
    campingvogn: boolean;
    kjoretoy: boolean;
    fritidseiendom: boolean;
    annet: boolean;
    beskrivelseAvAnnet: string;
}

export const initialVerdierState: Verdier = {
    bekreftelse: null,
    bolig: false,
    campingvogn: false,
    kjoretoy: false,
    fritidseiendom: false,
    annet: false,
    beskrivelseAvAnnet: "",
};

export enum VerdierKeys {
    BEKREFTELSE = "bekreftelse",
    BOLIG = "bolig",
    CAMPINGVOGN = "campingvogn",
    KJORETOY = "kjoretoy",
    FRITIDSEIENDOM = "fritidseiendom",
    ANNET = "annet",
    BESKRIVELSEAVANNET = "beskrivelseAvAnnet",
}
