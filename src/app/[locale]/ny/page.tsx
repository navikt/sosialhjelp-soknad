import {Bleed, BodyLong, BodyShort, GuidePanel, Heading, Hide, HStack, VStack} from "@navikt/ds-react";
import {SkjemaIllustrasjon} from "../../../lib/components/svg/illustrasjoner/SkjemaIllustrasjon";
import {useTranslations} from "next-intl";

const Page = () => {
    const t = useTranslations("Introside");
    return (
        <main
            className="max-w-lg lg:max-w-xl w-full mx-auto gap-6 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
            aria-labelledby={"app-heading"}
        >
            <HStack wrap={false}>
                <Hide below="lg">
                    <Bleed marginInline="space-96 space-0">
                        <div>
                            <SkjemaIllustrasjon />
                        </div>
                    </Bleed>
                </Hide>
                <VStack gap="space-12" as="hgroup" className={"flex-col-reverse"}>
                    <Heading level="1" size="xlarge">
                        {t("title")}
                    </Heading>
                    <BodyShort size="small">{t("skjemaId")}</BodyShort>
                </VStack>
            </HStack>

            <GuidePanel poster>
                <Heading level="2" size="medium" spacing>
                    {t("dialog.hei")}
                </Heading>
                <BodyLong spacing>{t("dialog.avsnitt1")}</BodyLong>
                <BodyLong>{t("dialog.avsnitt2")}</BodyLong>
            </GuidePanel>
        </main>
    );
};

export default Page;
