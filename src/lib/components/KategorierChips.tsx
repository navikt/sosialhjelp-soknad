import React, {CSSProperties, useEffect} from "react";
import {BodyShort, Box, Checkbox, HStack, Label, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {FormState, UseFormReturn} from "react-hook-form";
import {DigisosLanguageKey} from "../i18n";
import {XMarkIcon} from "@navikt/aksel-icons";
import LocalizedTextArea from "./LocalizedTextArea";

type HvaSokesOm = {hvaSokesOm?: string | null};

interface Props<T extends HvaSokesOm> {
    categories: SelectableCategory[];
    toggle: (category: string, subCategory?: string) => void;
    register: UseFormReturn<T | HvaSokesOm>["register"];
    errors: FormState<T | HvaSokesOm>["errors"];
    hvaSokesOm?: string | null;
    setValue: UseFormReturn<T | HvaSokesOm>["setValue"]; // Add setValue to update the form value
}

const TranslatedError = ({error}: {error?: string | null}) => {
    const {t} = useTranslation("skjema");

    if (!error) return null;

    return <>{t(error as DigisosLanguageKey)}</>;
};

interface CategoriesSummaryProps {
    categories: SelectableCategory[];
    hvaSokesOm?: string | null;
}
const CategoriesSummary = ({categories, hvaSokesOm}: CategoriesSummaryProps) => {
    const {t} = useTranslation("skjema");
    const annet = categories.find((cat) => cat.text === "Annet");
    const nodhjelp = categories.find((category) => category.text === "Nødhjelp");
    const nodhjelpText =
        nodhjelp && nodhjelp.selected && nodhjelp.subCategories?.filter((subCat) => subCat.selected).length
            ? t("situasjon.nodsituasjon.oppsummering") +
              "\n" +
              nodhjelp.subCategories
                  ?.filter((subCategory) => subCategory.selected)
                  ?.map((subCat) => (t(subCat.key) satisfies string).toLowerCase())
                  ?.join(", ")
                  ?.toLowerCase()
            : null;
    const annetText = annet && annet.selected ? t(annet.key) : null;
    const theRest = categories
        .filter((cat) => cat.text !== "Nødhjelp" && cat.text !== "Annet" && cat.selected)
        .map((cat) => t(cat.key))
        .join(", ")
        .toLowerCase();
    if (!nodhjelpText && !hvaSokesOm && theRest.length === 0) {
        return null;
    }
    return (
        <VStack className="mt-6">
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("situasjon.kategorier.oppsummeringstekst.label")}
            </Label>
            <Box background="surface-action-subtle" padding="4">
                <VStack gap="4">
                    {nodhjelpText && <BodyShort className="whitespace-pre-wrap">{nodhjelpText}.</BodyShort>}
                    {theRest.length > 0 ? (
                        <Box>
                            <BodyShort>{t("situasjon.kategorier.oppsummeringstekst.resten")}</BodyShort>
                            <BodyShort>{theRest}.</BodyShort>
                        </Box>
                    ) : null}
                    {annetText && hvaSokesOm && (
                        <Box>
                            <BodyShort>{annetText}:</BodyShort>
                            <BodyShort style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
                                {hvaSokesOm}
                            </BodyShort>
                        </Box>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

const KategorierChips = <T extends HvaSokesOm>({
    categories,
    toggle,
    register,
    errors,
    hvaSokesOm,
    setValue,
}: Props<T>): React.JSX.Element => {
    const {t} = useTranslation("skjema");

    useEffect(() => {
        // Get all selected categories and update the hvaSokesOm form value
        const selectedCategories = categories
            .filter((category) => category.selected && category.text !== "Annet") // Exclude "Annet" here
            .map((category) => category.text);

        // If "Annet" is selected, handle its input separately
        const annetCategory = categories.find((category) => category.text === "Annet");
        const annetInput = hvaSokesOm?.trim() || null;

        // Update the form field with the selected categories and the "Annet" input
        const allSelected = [...selectedCategories, annetCategory?.selected && annetInput].filter(Boolean).join(", ");

        setValue("hvaSokesOm", allSelected);
    }, [categories, setValue]);

    return (
        <div>
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("begrunnelse.kategorier.label")}
            </Label>
            <BodyShort>{t("begrunnelse.kategorier.description")}</BodyShort>
            <VStack align="start">
                <HStack align="start" gap="2" id={"kategorier"} aria-labelledby={"kategorier-label"} className={"pt-4"}>
                    {categories
                        .slice(
                            0,
                            categories.findIndex((cat) => cat.text === "Nødhjelp")
                        )
                        .map((category) => (
                            <Category category={category} toggle={toggle} register={register} errors={errors} />
                        ))}
                </HStack>
                <HStack align="start" gap="2" id={"kategorier"} aria-labelledby={"kategorier-label"} className={"pt-2"}>
                    {categories
                        .slice(
                            categories.findIndex((cat) => cat.text === "Nødhjelp"),
                            categories.findIndex((cat) => cat.text === "Annet")
                        )
                        .map((category) => (
                            <Category
                                category={category}
                                toggle={toggle}
                                register={register}
                                errors={errors}
                                showXMark={
                                    category.selected &&
                                    Boolean(category.subCategories?.length) &&
                                    category.subCategories?.every((it) => !it.selected)
                                }
                            />
                        ))}
                </HStack>
                <Box className={`pt-2 ${categories[categories.length - 1]?.selected ? "min-w-full" : ""}`}>
                    <Category
                        category={categories[categories.length - 1]}
                        toggle={toggle}
                        register={register}
                        errors={errors}
                        showXMark={categories[categories.length - 1]?.selected && !hvaSokesOm}
                    />
                </Box>
            </VStack>
            <CategoriesSummary categories={categories} hvaSokesOm={hvaSokesOm} />
        </div>
    );
};

interface CategoryProps<T extends HvaSokesOm> {
    category: SelectableCategory;
    toggle: (category: string, subCategory?: string) => void;
    register: UseFormReturn<T | HvaSokesOm>["register"];
    errors: FormState<T | HvaSokesOm>["errors"];
    showXMark?: boolean;
}

const MAX_LEN_ANNET = 150;

const Category = <T extends HvaSokesOm>({category, toggle, register, errors, showXMark}: CategoryProps<T>) => {
    const {t} = useTranslation("skjema");
    return (
        <Box
            role="button"
            className={`flex rounded-lg cursor-pointer ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                category.selected && ["Annet", "Nødhjelp"].includes(category.text) ? "w-full min-w-full" : ""
            }`}
            key={category.text}
            onClick={() => toggle(category.text)}
        >
            <VStack gap="2" margin="6" className={`w-full`}>
                <HStack justify="space-between" align="center">
                    <HStack gap="2" align="center">
                        <HStack>
                            {category.icons.map((Icon, index) => (
                                <Icon key={index} className="w-6 h-6" />
                            ))}
                        </HStack>
                        {t(category.key)}
                    </HStack>
                    {showXMark && <XMarkIcon />}
                </HStack>
                {category.selected && <SubCategories category={category} toggle={toggle} />}
                {category.text === "Annet" && category.selected && (
                    <VStack className="w-full" align="start" gap="2">
                        <BodyShort>{t("begrunnelse.annet.beskrivelse")}</BodyShort>
                        <LocalizedTextArea
                            {...register("hvaSokesOm")}
                            id={"hvaSokesOm"}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            maxLength={MAX_LEN_ANNET}
                            className="w-full"
                            error={
                                errors.hvaSokesOm && (
                                    <TranslatedError error={errors.hvaSokesOm?.message as string | null | undefined} />
                                )
                            }
                            label={t("begrunnelse.hva.label")}
                            hideLabel
                            description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                        />
                    </VStack>
                )}
            </VStack>
        </Box>
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
