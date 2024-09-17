import React, {CSSProperties} from "react";
import {BodyShort, Box, Checkbox, HStack, Label, Textarea, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {FormState, UseFormReturn} from "react-hook-form";
import {DigisosLanguageKey} from "../i18n";
import {XMarkIcon} from "@navikt/aksel-icons";

type HvaSokesOm = {hvaSokesOm?: string | null};

interface Props<T extends HvaSokesOm> {
    categories: SelectableCategory[];
    toggle: (category: string, subCategory?: string) => void;
    register: UseFormReturn<T | HvaSokesOm>["register"];
    errors: FormState<T | HvaSokesOm>["errors"];
    hvaSokesOm?: string | null;
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
}: Props<T>): React.JSX.Element => {
    const {t} = useTranslation("skjema");
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
                            <Category category={category} toggle={toggle} register={register} errors={errors} />
                        ))}
                </HStack>
                <Box className="pt-2">
                    <Category
                        category={categories[categories.length - 1]}
                        toggle={toggle}
                        register={register}
                        errors={errors}
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
}

const Category = <T extends HvaSokesOm>({category, toggle, register, errors}: CategoryProps<T>) => {
    const {t} = useTranslation("skjema");
    return (
        <Box
            role="button"
            className={`flex rounded-lg cursor-pointer ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                category.selected && ["Annet", "Bolig", "Nødhjelp"].includes(category.text) ? "w-full" : ""
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
                    {category.selected && (category.subCategories?.length || category.text === "Annet") && (
                        <XMarkIcon />
                    )}
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
