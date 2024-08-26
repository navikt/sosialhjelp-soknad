import React, {CSSProperties} from "react";
import {BodyShort, Box, Checkbox, HStack, Label, Textarea, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {FieldError, FormState, UseFormReturn} from "react-hook-form";
import {BegrunnelseFrontend} from "../../generated/model/begrunnelseFrontend";
import {DigisosLanguageKey} from "../i18n";

interface Props {
    categories: SelectableCategory[];
    toggle: (category: string, subCategory?: string) => void;
    register: UseFormReturn<BegrunnelseFrontend>["register"];
    errors: FormState<BegrunnelseFrontend>["errors"];
    hvaSokesOm?: string;
}

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

interface CategoriesSummaryProps {
    categories: SelectableCategory[];
    hvaSokesOm?: string;
}

const CategoriesSummary = ({categories, hvaSokesOm}: CategoriesSummaryProps) => {
    const {t} = useTranslation("skjema");
    const annet = categories.find((cat) => cat.text === "Annet");
    const nodhjelp = categories.find((category) => category.text === "Nødhjelp");
    const nodhjelpText =
        nodhjelp && nodhjelp.selected && nodhjelp.subCategories?.filter((subCat) => subCat.selected).length
            ? t("situasjon.nodsituasjon.oppsummering") +
              nodhjelp.subCategories
                  ?.filter((subCategory) => subCategory.selected)
                  ?.map((subCat) => (t(subCat.key) satisfies string).toLowerCase())
                  ?.join(", ")
            : null;
    const annetText = annet && annet.selected ? t(annet.key) : null;
    const theRest = categories
        .filter((cat) => cat.text !== "Nødhjelp" && cat.text !== "Annet" && cat.selected)
        .map((cat) => t(cat.key))
        .join(", ");
    if (!nodhjelpText && !annetText && theRest.length === 0) {
        return null;
    }
    return (
        <VStack className="mt-6">
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("situasjon.kategorier.oppsummeringstekst.label")}
            </Label>
            <Box background="surface-action-subtle" padding="4">
                <VStack gap="4">
                    {nodhjelpText && <BodyShort>{nodhjelpText}.</BodyShort>}
                    {theRest.length > 0 ? (
                        <Box>
                            <BodyShort>{t("situasjon.kategorier.oppsummeringstekst.resten")}</BodyShort>
                            <BodyShort>{theRest}.</BodyShort>
                        </Box>
                    ) : null}
                    {annetText && (
                        <Box>
                            <BodyShort>{annetText}:</BodyShort>
                            <BodyShort>{hvaSokesOm}</BodyShort>
                        </Box>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

const KategorierChips = ({categories, toggle, register, errors, hvaSokesOm}: Props): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    return (
        <div>
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("begrunnelse.kategorier.label")}
            </Label>
            <HStack align="start" gap="2" id={"kategorier"} aria-labelledby={"kategorier-label"} className={"pt-4"}>
                {categories.map((category) => (
                    <Box
                        as={"button"}
                        className={`flex rounded-lg ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                            category.selected && ["Annet", "Bolig", "Nødhjelp"].includes(category.text) ? "w-full" : ""
                        }`}
                        key={category.text}
                        onClick={() => toggle(category.text)}
                    >
                        <VStack gap="2" margin="6" className={`w-full`}>
                            <HStack gap="2" align="center">
                                <HStack>
                                    {category.icons.map((Icon, index) => (
                                        <Icon key={index} className="w-6 h-6" />
                                    ))}
                                </HStack>
                                {t(category.key)}
                            </HStack>
                            {category.selected && <SubCategories category={category} toggle={toggle} />}
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
            <CategoriesSummary categories={categories} hvaSokesOm={hvaSokesOm} />
        </div>
    );
};

interface SubCategoriesProps {
    category: SelectableCategory;
    toggle: (category: string, subCategory?: string) => void;
}
const SubCategories = ({category, toggle}: SubCategoriesProps) => {
    const {t} = useTranslation("skjema");
    if (!category.subCategories?.length) {
        return null;
    }
    return (
        <VStack gap="4">
            {category.ingressKey && <BodyShort align="start">{t(category.ingressKey)}</BodyShort>}
            <Box
                style={
                    category.text === "Nødhjelp"
                        ? ({
                              "--ac-radio-checkbox-action": "var(--a-surface-warning)",
                              "--ac-radio-checkbox-border": "var(--a-surface-warning)",
                          } as CSSProperties)
                        : undefined
                }
                onClick={(e) => e.stopPropagation()}
            >
                {category.subCategories.map((subCat) => (
                    <Checkbox
                        value={subCat.text}
                        checked={subCat.selected}
                        key={subCat.text}
                        className="text-left"
                        onClick={(e) => {
                            toggle(category.text, e.currentTarget.value);
                        }}
                    >
                        {t(subCat.key)}
                    </Checkbox>
                ))}
            </Box>
        </VStack>
    );
};

export default KategorierChips;
