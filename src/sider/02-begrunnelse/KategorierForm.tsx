import {useForm} from "react-hook-form";
import KategorierChips from "../../lib/components/KategorierChips.tsx";
import {TranslatedError} from "../../lib/components/TranslatedError.tsx";
import {MAX_LEN_ANNET} from "./schema.ts";
import LocalizedTextArea from "../../lib/components/LocalizedTextArea.tsx";
import {KategorierDto} from "../../generated/new/model";
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
            categories: kategorier?.definerte ?? [],
            annet: kategorier?.annet ?? null,
            hvorforSoke: hvorforSoke ?? null,
        },
    });
    const toggle = (category: string) => {
        const abc = getValues("categories");
        if (abc.includes(category)) {
            setValue(
                "categories",
                abc.filter((cat) => cat !== category)
            );
        } else {
            setValue("categories", [...abc, category]);
        }
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
