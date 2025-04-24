import {DigisosLanguageKey} from "../../i18n/common.ts";
import {ExclamationmarkTriangleIcon, HouseIcon, LightningIcon} from "@navikt/aksel-icons";
import Eple from "../../components/svg/illustrasjoner/Eple.tsx";
import {KategorierDtoDefinerteItem} from "../../../generated/new/model";

interface Category {
    key: DigisosLanguageKey;
    ingressKey?: DigisosLanguageKey;
    subCategories?: {key: DigisosLanguageKey; text: KategorierDtoDefinerteItem}[];
    icons: any[];
    text: KategorierDtoDefinerteItem | "NØDHJELP";
}

export interface SelectableCategory extends Category {
    selected: boolean;
    subCategories?: {key: DigisosLanguageKey; text: KategorierDtoDefinerteItem; selected: boolean}[];
}

export const CATEGORIES: Category[] = [
    {key: "begrunnelse.kategorier.mat", icons: [Eple], text: KategorierDtoDefinerteItem.LIVSOPPHOLD},
    {
        key: "begrunnelse.kategorier.bolig",
        icons: [HouseIcon],
        text: KategorierDtoDefinerteItem.HUSLEIE,
    },
    {key: "begrunnelse.kategorier.strom", icons: [LightningIcon], text: KategorierDtoDefinerteItem.STROM_OPPVARMING},
    {
        key: "begrunnelse.kategorier.nodhjelp",
        ingressKey: "begrunnelse.nødhjelp.beskrivelse",
        subCategories: [
            {key: "begrunnelse.underkategorier.nodhjelp.mat", text: KategorierDtoDefinerteItem.NODHJELP_IKKE_MAT},
            {key: "begrunnelse.underkategorier.nodhjelp.bosted", text: KategorierDtoDefinerteItem.NODHJELP_IKKE_BOSTED},
            {
                key: "begrunnelse.underkategorier.nodhjelp.strøm",
                text: KategorierDtoDefinerteItem.NODHJELP_IKKE_STROM,
            },
        ],
        icons: [ExclamationmarkTriangleIcon],
        text: "NØDHJELP",
    },
];
