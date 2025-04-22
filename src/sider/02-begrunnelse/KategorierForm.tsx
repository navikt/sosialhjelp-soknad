import {useForm} from "react-hook-form";
import KategorierChips from "../../lib/components/KategorierChips.tsx";
import {TranslatedError} from "../../lib/components/TranslatedError.tsx";
import {MAX_LEN_ANNET} from "./schema.ts";
import LocalizedTextArea from "../../lib/components/LocalizedTextArea.tsx";
import {KategorierDto, KategorierDtoDefinerteItem} from "../../generated/new/model";
import {CATEGORIES} from "../../lib/hooks/data/useKategorier.tsx";
import {useTranslation} from "react-i18next";

interface Props {
    kategorier?: KategorierDto;
    hvorforSoke?: string;
    onSubmit: (formValues: FormValues) => void;
}

interface FormValues {
    categories: string[];
    annet: string | null;
    hvorforSoke: string | null;
}

const nodhjelpCategories: KategorierDtoDefinerteItem[] = [
    "NODHJELP_IKKE_BOSTED",
    "NODHJELP_IKKE_MAT",
    "NODHJELP_IKKE_STROM",
];

const defaultCategories = (categories?: KategorierDtoDefinerteItem[]) => {
    if (!categories) {
        return [];
    }
    return [...categories, ...(categories.some((cat) => nodhjelpCategories.includes(cat)) ? ["NØDHJELP"] : [])];
};

const KategorierForm = ({kategorier, hvorforSoke, onSubmit}: Props) => {
    const {t} = useTranslation("skjema");
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            categories: defaultCategories(kategorier?.definerte),
            annet: kategorier?.annet ?? null,
            hvorforSoke: hvorforSoke ?? null,
        },
    });
    const toggle = (category: string, subCategory?: string) => {
        const selectedCategories = getValues("categories");

        console.log(category, subCategory);
        let updatedCategories = selectedCategories;
        if (subCategory) {
            if (updatedCategories.includes(subCategory)) {
                updatedCategories = updatedCategories.filter((cat) => cat !== subCategory);
            } else {
                updatedCategories = [...updatedCategories, subCategory];
            }
        } else {
            // Rensk subCategories hvis NØDHJELP blir unselected
            if (updatedCategories.includes(category)) {
                if (category === "NØDHJELP") {
                    console.log(
                        "rensker. Bare disse blir med videre: ",
                        updatedCategories.filter(
                            (cat) => !nodhjelpCategories.includes(cat as KategorierDtoDefinerteItem)
                        )
                    );
                    updatedCategories = updatedCategories.filter(
                        (cat) => !nodhjelpCategories.includes(cat as KategorierDtoDefinerteItem)
                    );
                }
                updatedCategories = updatedCategories.filter((cat) => cat !== category);
            } else {
                updatedCategories = [...updatedCategories, category];
            }
        }
        setValue("categories", updatedCategories);
        onSubmit({...getValues(), categories: updatedCategories});
    };

    const selectedCategories = watch("categories");

    return (
        <form onBlur={handleSubmit(onSubmit)}>
            <KategorierChips
                categories={CATEGORIES.map((cat) => ({
                    ...cat,
                    selected: selectedCategories.includes(cat.text),
                    subCategories: cat.subCategories?.map((subCat) => ({
                        ...subCat,
                        selected: selectedCategories.includes(subCat.text),
                    })),
                }))}
                toggle={toggle}
            />
            <LocalizedTextArea
                {...register("annet")}
                id={"annet"}
                error={errors.annet && <TranslatedError error={errors.annet} />}
                maxLength={MAX_LEN_ANNET}
                label={t("begrunnelse.annet.beskrivelse")}
            />
        </form>
    );
};

export default KategorierForm;
