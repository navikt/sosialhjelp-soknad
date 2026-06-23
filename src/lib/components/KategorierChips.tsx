import {BodyShort, Box, Checkbox, HStack, Label, VStack} from "@navikt/ds-react";
import {SelectableCategory} from "../hooks/data/useKategorier";
import {useTranslation} from "react-i18next";
import {XMarkIcon} from "@navikt/aksel-icons";

interface Props {
    categories: SelectableCategory[];
    toggle: (category: string, subCategory?: string) => void;
}

const KategorierChips = ({categories, toggle}: Props) => {
    const {t} = useTranslation("skjema");
    return (
        <div>
            <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                {t("begrunnelse.kategorier.label")}
            </Label>
            <BodyShort>{t("begrunnelse.kategorier.description")}</BodyShort>
            <VStack align="start">
                <HStack
                    align="start"
                    gap="space-8"
                    id={"kategorier"}
                    aria-labelledby={"kategorier-label"}
                    className={"pt-4"}
                >
                    {categories.map((category) => (
                        <Category
                            key={category.key}
                            category={category}
                            toggle={toggle}
                            showXMark={category.selected && Boolean(category.subCategories?.length)}
                        />
                    ))}
                </HStack>
            </VStack>
        </div>
    );
};

interface CategoryProps {
    category: SelectableCategory;
    toggle: (category: string, subCategory?: string) => void;
    showXMark?: boolean;
}

const Category = ({category, toggle, showXMark}: CategoryProps) => {
    const {t} = useTranslation("skjema");
    return (
        <Box
            role="button"
            className={`flex rounded-lg cursor-pointer ${category.selected ? (category.text === "NØDHJELP" ? "bg-ax-bg-warning-moderate" : "bg-blue-200") : "bg-blue-50"} ${
                category.selected && "NØDHJELP" === category.text ? "w-full min-w-full" : ""
            }`}
            key={category.text}
            onClick={() => toggle(category.text)}
        >
            <VStack gap="space-8" className={`w-full ml-6`}>
                <HStack justify="space-between" align="center">
                    <HStack gap="space-8" align="center">
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
        <VStack gap="space-16">
            {category.ingressKey && <BodyShort align="start">{t(category.ingressKey)}</BodyShort>}
            <Box onClick={(e) => e.stopPropagation()}>
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
