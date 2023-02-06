// Copied from react-intl during transition to i18-next
export interface MessageDescriptor {
    id: string;
    description?: string | object;
    defaultMessage?: string;
}

export type BotypePrimaer = "eier" | "leier" | "kommunal" | "ingen" | "annet";
export type BotypePrimaerListe = Record<BotypePrimaer, BotypeDescriptor>;

export type BotypeSekundaer = "foreldre" | "familie" | "venner" | "institusjon" | "fengsel" | "krisesenter";
export type BotypeSekundaerListe = Record<BotypeSekundaer, BotypeDescriptor>;

export type Botype = BotypePrimaer | BotypeSekundaer;
export type BotypeListe = BotypePrimaerListe | BotypeSekundaerListe;

export type BotypeDescriptor = {messageDescriptor: MessageDescriptor};

export const BotypePrimaerValg: Record<BotypePrimaer, BotypeDescriptor> = {
    eier: {messageDescriptor: {id: "bosituasjon.eier", defaultMessage: "Jeg bor i bolig jeg eier selv"}},
    leier: {messageDescriptor: {id: "bosituasjon.leier", defaultMessage: "Jeg leier privat bolig"}},
    kommunal: {messageDescriptor: {id: "bosituasjon.kommunal", defaultMessage: "Jeg leier kommunal bolig"}},
    ingen: {messageDescriptor: {id: "bosituasjon.ingen", defaultMessage: "Jeg har ikke noe sted å bo"}},
    annet: {messageDescriptor: {id: "bosituasjon.annet", defaultMessage: "Annen bosituasjon"}},
};

export const BotypeSekundaerValg: Record<BotypeSekundaer, BotypeDescriptor> = {
    foreldre: {messageDescriptor: {id: "bosituasjon.annet.botype.foreldre", defaultMessage: "Bor hos foreldre"}},
    familie: {messageDescriptor: {id: "bosituasjon.annet.botype.familie", defaultMessage: "Bor hos familie"}},
    venner: {messageDescriptor: {id: "bosituasjon.annet.botype.venner", defaultMessage: "Bor hos venner"}},
    institusjon: {messageDescriptor: {id: "bosituasjon.annet.botype.institusjon", defaultMessage: "Institusjon"}},
    fengsel: {messageDescriptor: {id: "bosituasjon.annet.botype.fengsel", defaultMessage: "Fengsel"}},
    krisesenter: {messageDescriptor: {id: "bosituasjon.annet.botype.krisesenter", defaultMessage: "Krisesenter"}},
};

export type BosituasjonData = {
    botype: Botype | null;
    antallPersoner: null | string;
};

export const initialBosituasjonState: BosituasjonData = {
    botype: null,
    antallPersoner: null,
};
