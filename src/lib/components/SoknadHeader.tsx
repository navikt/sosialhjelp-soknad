import {BodyShort, Heading, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {SkjemaIllustrasjon} from "./svg/illustrasjoner/SkjemaIllustrasjon";

export const SoknadHeader = ({showCode = true}: {showCode?: boolean}) => {
    const t = useTranslations("Components.SoknadHeader");

    return (
        <VStack paddingBlock={{lg: "space-24"}} className="relative">
            <div className="hidden md:block md:absolute md:-left-24">
                <SkjemaIllustrasjon />
            </div>
            <VStack gap="space-4" as="hgroup" className={"flex-col-reverse"}>
                <Heading level="1" size="xlarge">
                    {t("title")}
                </Heading>
                {showCode && <BodyShort size="small">{t("code")}</BodyShort>}
            </VStack>
        </VStack>
    );
};
