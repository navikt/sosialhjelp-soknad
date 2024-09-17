import {useHentBegrunnelse} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useEffect, useReducer} from "react";
import {useFeatureToggles} from "../../../generated/feature-toggle-ressurs/feature-toggle-ressurs";
import {DigisosLanguageKey} from "../../i18n";
import {
    TrainIcon,
    ChildEyesIcon,
    ExclamationmarkTriangleIcon,
    FirstAidIcon,
    HouseIcon,
    LightningIcon,
    CalendarIcon,
    PencilWritingIcon,
    CarIcon,
} from "@navikt/aksel-icons";
import {UseFormGetValues, UseFormSetValue} from "react-hook-form";
import {useBegrunnelse} from "./useBegrunnelse";
import Tann from "../../components/svg/illustrasjoner/Tann.tsx";
import Eple from "../../components/svg/illustrasjoner/Eple.tsx";
import TSkjorte from "../../components/svg/illustrasjoner/TSkjorte.tsx";

interface Category {
    key: DigisosLanguageKey;
    ingressKey?: DigisosLanguageKey;
    subCategories?: {key: DigisosLanguageKey; text: string}[];
    icons: any[];
    text: string;
}

export interface SelectableCategory extends Category {
    selected: boolean;
    subCategories?: {key: DigisosLanguageKey; text: string; selected: boolean}[];
}

interface CategoryAction {
    type: "toggle" | "set";
    category?: string;
    subCategory?: string;
    categories?: SelectableCategory[];
}

const addIf = <T,>(bool: boolean, items: T[]) => {
    if (bool) {
        return items;
    }
    return [];
};

export const createCategories = (hasChildren: boolean): Category[] => [
    {key: "begrunnelse.kategorier.mat", icons: [Eple], text: "Mat"},
    {
        key: "begrunnelse.kategorier.bolig",
        icons: [HouseIcon],
        text: "Husleie",
    },
    {key: "begrunnelse.kategorier.strom", icons: [LightningIcon], text: "Strøm"},
    {
        key: "begrunnelse.kategorier.nodhjelp",
        ingressKey: "begrunnelse.nødhjelp.beskrivelse",
        subCategories: [
            {key: "begrunnelse.underkategorier.nodhjelp.mat", text: "Har ikke penger til mat i dag"},
            {key: "begrunnelse.underkategorier.nodhjelp.bosted", text: "Har ikke et sted å bo i natt"},
            {
                key: "begrunnelse.underkategorier.nodhjelp.strøm",
                text: "Strømmen er stengt / stenges i dag eller i morgen",
            },
        ],
        icons: [ExclamationmarkTriangleIcon],
        text: "Nødhjelp",
    },
    {key: "begrunnelse.kategorier.lege", icons: [FirstAidIcon], text: "Lege og medisiner"},
    {key: "begrunnelse.kategorier.tannlege", icons: [Tann], text: "Tannlege"},
    {key: "begrunnelse.kategorier.klaer", icons: [TSkjorte], text: "Klær og utstyr"},
    ...addIf<Category>(hasChildren, [
        {
            key: "begrunnelse.kategorier.barnehage",
            icons: [ChildEyesIcon],
            text: "Barnehage og SFO/AKS",
        },
        {
            key: "begrunnelse.kategorier.fritidsaktiviteter",
            icons: [ChildEyesIcon],
            text: "Fritidsaktiviteter til barn",
        },
        {
            key: "begrunnelse.kategorier.barn",
            icons: [ChildEyesIcon],
            text: "Andre utgifter til barn",
        },
    ]),
    {key: "begrunnelse.kategorier.transport", icons: [CarIcon, TrainIcon], text: "Transport"},
    {key: "begrunnelse.kategorier.hoytid", icons: [CalendarIcon], text: "Høytid og merkedager"},
    {
        key: "begrunnelse.kategorier.annet",
        ingressKey: "begrunnelse.annet.beskrivelse",
        icons: [PencilWritingIcon],
        text: "Annet",
    },
];

interface KategorierFormValues {
    hvaSokesOm?: string | null;
    hvorforSoke?: string | null;
}

/* FIXME:
    Dette er kvalme greier, vær så snill å fiks det når vi er på ny datamodell og kan kontrollere
    hva som kommer inn i hvaSokesOm.
*/
const useKategorier = <T extends KategorierFormValues>(
    hasChildren: boolean,
    setValue: UseFormSetValue<T | KategorierFormValues>,
    getValues: UseFormGetValues<T | KategorierFormValues>
) => {
    const behandlingsId = useBehandlingsId();
    const {data} = useHentBegrunnelse(behandlingsId);
    const [reducer, dispatch] = useReducer(
        (state: SelectableCategory[], action: CategoryAction) => {
            switch (action.type) {
                case "toggle":
                    return state.map((category) => {
                        if (category.text === action.category) {
                            if (action.subCategory) {
                                return {
                                    ...category,
                                    subCategories: category.subCategories?.map((subCat) => {
                                        if (action.subCategory === subCat.text) {
                                            return {...subCat, selected: !subCat.selected};
                                        }
                                        return subCat;
                                    }),
                                };
                            }
                            if (
                                category.subCategories?.some((subCat) => subCat.selected) ||
                                (category.text === "Annet" && getValues("hvaSokesOm"))
                            ) {
                                return category;
                            }
                            return {...category, selected: !category.selected};
                        }
                        return category;
                    });
                case "set":
                    if (!action.categories) {
                        throw new Error("Categories must be set");
                    }
                    return action.categories;
                default:
                    return state;
            }
        },
        createCategories(hasChildren),
        (initialState) =>
            initialState.map((category) => ({
                ...category,
                subCategories: category.subCategories?.map((subCat) => ({...subCat, selected: false})),
                selected: false,
            }))
    );
    const toggle = (category: string, subCategory?: string) => {
        return dispatch({type: "toggle", category, subCategory});
    };
    const {data: featureFlagData} = useFeatureToggles();
    const {put: doPut, isPending, isError} = useBegrunnelse();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;

    /**
        Kommer i json-format
     */
    useEffect(() => {
        if (data?.hvaSokesOm && isKategorierEnabled) {
            const hvaSokesOm: {text: string; hvaSokesOm?: string; subCategories: string[]}[] = JSON.parse(
                data.hvaSokesOm
            );
            const annetText = hvaSokesOm.find((it) => it.hvaSokesOm)?.hvaSokesOm;
            if (annetText) {
                setValue("hvaSokesOm", annetText);
            }
            const categories = createCategories(hasChildren).map((category) => {
                const previouslySelectedCategory = hvaSokesOm.find((it) => it.text === category.text);
                if (previouslySelectedCategory) {
                    return {
                        ...category,
                        selected: true,
                        subCategories: category.subCategories?.map((subCat) => {
                            if (previouslySelectedCategory?.subCategories.includes(subCat.text)) {
                                return {
                                    ...subCat,
                                    selected: previouslySelectedCategory.subCategories.includes(subCat.text),
                                };
                            }
                            return subCat;
                        }),
                    };
                }
                return category;
            }) as SelectableCategory[];
            dispatch({type: "set", categories});
        }
    }, [data, dispatch, hasChildren]);
    const put = (begrunnelseFrontend: T) => {
        if (isKategorierEnabled) {
            const jsonString = reducer
                .filter((category) => category.selected)
                .map((category) => {
                    if (category.text === "Annet") {
                        return {text: category.text, hvaSokesOm: begrunnelseFrontend.hvaSokesOm};
                    }
                    return {
                        text: category.text,
                        subCategories: category.subCategories
                            ?.filter((subCat) => subCat.selected)
                            .map((subCat) => subCat.text),
                    };
                });

            return doPut({
                hvaSokesOm: JSON.stringify(jsonString),
                hvorforSoke: begrunnelseFrontend.hvorforSoke ?? undefined,
            });
        } else {
            return doPut({
                hvaSokesOm: begrunnelseFrontend.hvaSokesOm ?? undefined,
                hvorforSoke: begrunnelseFrontend.hvorforSoke ?? undefined,
            });
        }
    };
    return {put, isPending, isError, reducer, dispatch, toggle};
};

export default useKategorier;
