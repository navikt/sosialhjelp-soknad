import {useForm} from "react-hook-form";
import KategorierChips from "../../lib/components/KategorierChips.tsx";
import {TranslatedError} from "../../lib/components/TranslatedError.tsx";
import {MAX_LEN_ANNET} from "./schema.ts";
import LocalizedTextArea from "../../lib/components/LocalizedTextArea.tsx";
import {KategorierDto} from "../../generated/new/model";
import {CATEGORIES} from "../../lib/hooks/data/useKategorier.tsx";
import {useTranslation} from "react-i18next";
import useCategories, {defaultCategories} from "../../lib/hooks/data/useCategories.ts";

interface Props {
    kategorier?: KategorierDto;
    onSubmit: (formValues: FormValues) => void;
}

interface FormValues {
    categories: string[];
    annet: string | null;
}

const KategorierForm = ({kategorier, onSubmit}: Props) => {
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
        },
    });

    const selectedCategories = watch("categories");
    const {toggle} = useCategories(
        selectedCategories,
        (updated) => setValue("categories", updated),
        getValues,
        onSubmit
    );

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
