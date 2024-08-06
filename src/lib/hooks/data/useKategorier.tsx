import {useHentBegrunnelse} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useEffect, useReducer} from "react";
import {useFeatureToggles} from "../../../generated/feature-toggle-ressurs/feature-toggle-ressurs";
import {DigisosLanguageKey} from "../../i18n";
import {
    TrainIcon,
    ChildEyesIcon,
    ClothingHangerIcon,
    CoffeeIcon,
    ExclamationmarkTriangleIcon,
    FirstAidIcon,
    FirstAidKitIcon,
    HouseIcon,
    LightningIcon,
    CalendarIcon,
    ThermometerIcon,
    PencilWritingIcon,
    CarIcon,
} from "@navikt/aksel-icons";
import {UseFormGetValues, UseFormSetValue} from "react-hook-form";
import {BegrunnelseFrontend} from "../../../generated/model";
import {inhibitNavigation} from "../../components/SkjemaSteg/ny/SkjemaSteg";
import {useBegrunnelse} from "./useBegrunnelse";
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";

interface Category {
    key: DigisosLanguageKey;
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

export const CATEGORIES: Category[] = [
    {key: "begrunnelse.kategorier.mat", icons: [CoffeeIcon], text: "Mat"},
    {
        key: "begrunnelse.kategorier.bolig",
        subCategories: [
            {key: "utgifter.boutgift.true.type.husleie", text: "Husleie"},
            {key: "begrunnelse.underkategorier.bolig.midlertidigBolig", text: "Midlertidig bolig"},
            {key: "begrunnelse.underkategorier.bolig.innbo", text: "Innbo og utstyr"},
            {key: "begrunnelse.underkategorier.bolig.depositum", text: "Depositum"},
            {key: "begrunnelse.underkategorier.bolig.kommunaleAvgifter", text: "Kommunale avgifter"},
            {key: "begrunnelse.underkategorier.bolig.boliglaan", text: "Avdrag og renter på boliglån"},
            {key: "begrunnelse.underkategorier.bolig.flytting", text: "Flytting"},
        ],
        icons: [HouseIcon],
        text: "Bolig",
    },
    {key: "begrunnelse.kategorier.strom", icons: [LightningIcon], text: "Strøm"},
    {key: "begrunnelse.kategorier.lege", icons: [FirstAidIcon], text: "Lege og medisiner"},
    {key: "begrunnelse.kategorier.tannlege", icons: [FirstAidKitIcon], text: "Tannlege"},
    {
        key: "begrunnelse.kategorier.nodhjelp",
        subCategories: [
            {key: "begrunnelse.underkategorier.nodhjelp.mat", text: "Har ikke penger til mat i dag"},
            {key: "begrunnelse.underkategorier.nodhjelp.bosted", text: "Har ikke et sted å bo i natt"},
            {
                key: "begrunnelse.underkategorier.nodhjelp.strøm",
                text: "Strømmen er stengt / stenges i dag eller i morgen",
            },
            {
                key: "begrunnelse.underkategorier.nodhjelp.helsehjelp",
                text: "Har ikke penger til helsehjelp jeg må ha i dag",
            },
            {
                key: "begrunnelse.underkategorier.nodhjelp.utkastet",
                text: "Blir kastet ut hjemmefra i dag eller i morgen",
            },
            {key: "begrunnelse.underkategorier.nodhjelp.varme", text: "Har ikke penger til varme hjemme i dag"},
            {key: "begrunnelse.underkategorier.nodhjelp.reise", text: "Har ikke penger til å komme meg hjem i dag"},
        ],
        icons: [ExclamationmarkTriangleIcon],
        text: "Nødhjelp",
    },
    {key: "begrunnelse.kategorier.klaer", icons: [ClothingHangerIcon], text: "Klær og utstyr"},
    {key: "begrunnelse.kategorier.barnehage", icons: [ChildEyesIcon], text: "Barnehage, SFO eller AKS"},
    {key: "begrunnelse.kategorier.barn", icons: [ChildEyesIcon], text: "Ting til barn og fritidsaktiviteter"},
    {key: "begrunnelse.kategorier.transport", icons: [CarIcon, TrainIcon], text: "Transport"},
    {key: "begrunnelse.kategorier.hoytid", icons: [CalendarIcon], text: "Høytid, merkedager og gaver"},
    {key: "begrunnelse.kategorier.ved", icons: [ThermometerIcon], text: "Ved, gass eller fjernvarme"},
    {key: "begrunnelse.kategorier.annet", icons: [PencilWritingIcon], text: "Annet"},
];

/* FIXME:
    Dette er kvalme greier, vær så snill å fiks det når vi er på ny datamodell og kan kontrollere
    hva som kommer inn i hvaSokesOm.
*/
const useKategorier = (
    setValue: UseFormSetValue<BegrunnelseFrontend>,
    handleSubmit: UseFormHandleSubmit<BegrunnelseFrontend>,
    getValues: UseFormGetValues<BegrunnelseFrontend>
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
        CATEGORIES,
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
    const {put, isPending, isError} = useBegrunnelse();
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
            const categories = CATEGORIES.map((category) => {
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
            dispatch({type: "set", categories: categories});
        }
    }, [data, dispatch]);
    const onSubmit = handleSubmit((begrunnelseFrontend: BegrunnelseFrontend) => {
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

            return put({hvaSokesOm: JSON.stringify(jsonString), hvorforSoke: begrunnelseFrontend.hvorforSoke});
        } else {
            return put(begrunnelseFrontend);
        }
    }, inhibitNavigation);
    return {onSubmit, isPending, isError, reducer, dispatch, toggle};
};

export default useKategorier;
