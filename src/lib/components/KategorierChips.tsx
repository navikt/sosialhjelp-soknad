import React, {CSSProperties} from "react";
import {BodyShort, Box, Checkbox, HStack, Label, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {FormState, UseFormReturn} from "react-hook-form";
import {DigisosLanguageKey} from "../i18n/common.ts";
import {XMarkIcon} from "@navikt/aksel-icons";
import LocalizedTextArea from "./LocalizedTextArea";

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

interface CategoriesSummaryProps<T extends HvaSokesOm> {
    categories: SelectableCategory[];
    hvaSokesOm?: string | null;
    register: UseFormReturn<T | HvaSokesOm>["register"];
    errors: FormState<T | HvaSokesOm>["errors"];
}

const CategoriesSummary = <T extends HvaSokesOm>({categories, register, errors}: CategoriesSummaryProps<T>) => {
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
    const annetText = annet ? t(annet.key) : null;
    const theRest = categories
        .filter((cat) => cat.text !== "Nødhjelp" && cat.text !== "Annet" && cat.selected)
        .map((cat) => t(cat.key))
        .join(", ")
        .toLowerCase();
    const antallTegn = (nodhjelpText?.length ?? 0) + theRest.length + (annetText?.length ?? 0);
    return (
        <LocalizedTextArea
            {...register("hvaSokesOm")}
            className={"w-full"}
            id={"hvaSokesOm"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            maxLength={MAX_LEN_ANNET - antallTegn <= 200 ? MAX_LEN_ANNET - antallTegn : undefined}
            error={
                errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm?.message as string | null | undefined} />
            }
            label={"Her kan du skrive hva annet du søker om"}
            description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
        />
    );
};

const KategorierChips = <T extends HvaSokesOm>({categories, toggle, register, errors}: Props<T>): React.JSX.Element => {
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
                            <Category category={category} toggle={toggle} />
                        ))}
                </HStack>
                <HStack align="start" gap="2" id={"kategorier"} aria-labelledby={"kategorier-label"} className={"pt-2"}>
                    {[categories[categories.length - 1]].map((category) => (
                        <Category category={category} toggle={toggle} />
                    ))}
                </HStack>
            </VStack>
            <CategoriesSummary categories={categories} register={register} errors={errors} />
        </div>
    );
};

interface CategoryProps {
    category: SelectableCategory;
    toggle: (category: string, subCategory?: string) => void;
    showXMark?: boolean;
}

const MAX_LEN_ANNET = 600;

const Category = ({category, toggle}: CategoryProps) => {
    const {t} = useTranslation("skjema");
    const hasMoreContent =
        (category.subCategories?.length && category.subCategories?.every((it) => !it.selected)) || category.ingressKey;
    return (
        <Box
            role="button"
            className={`flex rounded-lg cursor-pointer ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                category.selected && hasMoreContent ? "w-full min-w-full" : ""
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
                    {category.selected && hasMoreContent && <XMarkIcon />}
                </HStack>
                {category.selected && category.ingressKey && (
                    <BodyShort align="start">{t(category.ingressKey)}</BodyShort>
                )}
                {category.selected && <SubCategories category={category} toggle={toggle} />}
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
