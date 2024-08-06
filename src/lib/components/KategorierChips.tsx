import React from "react";
import {BodyShort, Box, Checkbox, CheckboxGroup, HStack, Label, Textarea, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {FieldError, FormState} from "react-hook-form";
import {BegrunnelseFrontend} from "../../generated/model/begrunnelseFrontend";
import {DigisosLanguageKey} from "../i18n";
import {UseFormReturn} from "react-hook-form/dist/types/form";

interface Props {
    categories: SelectableCategory[];
    toggle: (category: string, subCategory?: string) => void;
    register: UseFormReturn<BegrunnelseFrontend>["register"];
    errors: FormState<BegrunnelseFrontend>["errors"];
}

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

const KategorierChips = ({categories, toggle, register, errors}: Props): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    return (
        <div>
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("begrunnelse.hva.label")}
            </Label>
            <HStack align="start" gap="4" id={"kategorier"} aria-labelledby={"kategorier-label"} className={"pt-4"}>
                {categories.map((category) => (
                    <Box
                        as={"button"}
                        className={`flex rounded-lg ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                            category.selected && ["Annet", "Bolig", "Nødhjelp"].includes(category.text) ? "w-full" : ""
                        }`}
                        key={category.text}
                        onClick={() => toggle(category.text)}
                    >
                        <VStack gap="2" margin="4" className={`w-full`}>
                            <HStack gap="2" align="center">
                                {category.icons}
                                {t(category.key)}
                            </HStack>
                            {category.subCategories && category.selected && (
                                <CheckboxGroup
                                    legend={"Bolig"}
                                    hideLegend
                                    onClick={(e) => e.stopPropagation()}
                                    value={category.subCategories
                                        .filter((subCat) => subCat.selected)
                                        .map((subCat) => subCat.text)}
                                >
                                    {category.subCategories.map((subCat) => (
                                        <Checkbox
                                            value={subCat.text}
                                            key={subCat.text}
                                            onClick={(e) => {
                                                toggle(category.text, e.currentTarget.value);
                                            }}
                                        >
                                            {t(subCat.key)}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            )}
                            {category.text === "Annet" && category.selected && (
                                <VStack className="w-full" align="start" gap="2">
                                    <BodyShort>{t("begrunnelse.annet.beskrivelse")}</BodyShort>
                                    <Textarea
                                        {...register("hvaSokesOm")}
                                        id={"hvaSokesOm"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        className="w-full"
                                        error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                                        label={t("begrunnelse.hva.label")}
                                        hideLabel
                                        description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                                    />
                                </VStack>
                            )}
                        </VStack>
                    </Box>
                ))}
            </HStack>
        </div>
    );
};

export default KategorierChips;
