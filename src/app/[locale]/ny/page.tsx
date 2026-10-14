import {
    Accordion,
    Bleed,
    BodyLong,
    BodyShort,
    GuidePanel,
    Heading,
    Hide,
    HStack,
    Link,
    List,
    VStack,
} from "@navikt/ds-react";
import {SkjemaIllustrasjon} from "../../../lib/components/svg/illustrasjoner/SkjemaIllustrasjon";
import {useTranslations} from "next-intl";
import {AccordionItem, AccordionHeader, AccordionContent} from "@navikt/ds-react/Accordion";
import {ListItem} from "@navikt/ds-react/List";

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
            <HStack>
                <Heading level="2" size="medium" spacing>
                    {t("forDuSoker.title")}
                </Heading>
                <BodyLong spacing>{t("forDuSoker.tekst")}</BodyLong>
                <Accordion>
                    <AccordionItem>
                        <AccordionHeader>{t("forDuSoker.accordion.item1.title")}</AccordionHeader>
                        <AccordionContent>
                            <List as="ol" className="mb-7">
                                {t.rich("forDuSoker.accordion.item1.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong>
                                {t.rich("forDuSoker.accordion.item1.tekst", {
                                    a: (chuncks) => (
                                        <Link
                                            href="https://www.nav.no/okonomisk-sosialhjelp"
                                            inlineText
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {chuncks}
                                        </Link>
                                    ),
                                })}
                            </BodyLong>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>{t("forDuSoker.accordion.item2.title")}</AccordionHeader>
                        <AccordionContent>
                            <List className="mb-7">
                                {t.rich("forDuSoker.accordion.item2.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong>{t("forDuSoker.accordion.item2.tekst")}</BodyLong>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </HStack>
        </main>
    );
};

export default Page;
