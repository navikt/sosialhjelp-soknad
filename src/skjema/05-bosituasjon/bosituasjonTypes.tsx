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

export type BotypeDescriptor = {messageDescriptor: MessageDescriptor};
