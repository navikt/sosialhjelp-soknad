import {Bleed, BodyShort, Heading, Hide, HStack, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {SkjemaIllustrasjon} from "./svg/illustrasjoner/SkjemaIllustrasjon";

export const SoknadHeader = () => {
    const t = useTranslations("Components.SoknadHeader");

    return (
        <HStack paddingBlock="space-24" wrap={false}>
            <Hide below="lg">
                <Bleed marginInline="space-96 space-0">
                    <div>
                        <SkjemaIllustrasjon />
                    </div>
                </Bleed>
            </Hide>
            <VStack gap="space-4" as="hgroup" className={"flex-col-reverse"}>
                <Heading level="1" size="large" className="lg:text-[40px]">
                    {t("title")}
                </Heading>
                <BodyShort size="small">{t("code")}</BodyShort>
            </VStack>
        </HStack>
    );
};
