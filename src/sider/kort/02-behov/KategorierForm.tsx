import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {KategorierDto} from "../../../generated/new/model";
import KategorierChips from "../../../lib/components/KategorierChips.tsx";
import {CATEGORIES} from "../../../lib/hooks/data/useKategorier.tsx";
import LocalizedTextArea from "../../../lib/components/LocalizedTextArea.tsx";
import {TranslatedError} from "../../../lib/components/TranslatedError.tsx";
import {MAX_LEN_HVA, MAX_LEN_HVORFOR} from "../../02-begrunnelse/schema.ts";
import useCategories, {defaultCategories} from "../../../lib/hooks/data/useCategories.ts";

export interface FormValues {
    categories: string[];
    annet: string | null;
    hvaErEndret: string | null;
}

interface Props {
    kategorier?: KategorierDto;
    onSubmit: (formValues: FormValues) => void;
    hvaErEndret?: string;
}

const KategorierForm = ({kategorier, hvaErEndret, onSubmit}: Props) => {
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
            hvaErEndret: hvaErEndret ?? null,
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
                maxLength={MAX_LEN_HVA}
                label={t("begrunnelse.annet.beskrivelse")}
            />
            <LocalizedTextArea
                {...register("hvaErEndret")}
                id={"hvaErEndret"}
                error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                maxLength={MAX_LEN_HVORFOR}
                label={t("situasjon.kort.hvaErEndret.label")}
                description={t("situasjon.kort.hvaErEndret.description")}
            />
        </form>
    );
};

export default KategorierForm;
