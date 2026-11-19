import {Accordion, BodyLong, GuidePanel, Heading, HStack, Link, List} from "@navikt/ds-react";
import {AccordionContent, AccordionHeader, AccordionItem} from "@navikt/ds-react/Accordion";
import {ListItem} from "@navikt/ds-react/List";
import {useTranslations} from "next-intl";

const NySoknadInnhold = () => {
    const t = useTranslations("NySoknad");

    return (
        <>
            <GuidePanel poster>
                <b className="block text-2xl mb-3">{t("dialog.hei")}</b>
                <BodyLong spacing>{t("dialog.avsnitt1")}</BodyLong>
                <BodyLong>{t("dialog.avsnitt2")}</BodyLong>
            </GuidePanel>

            <HStack>
                <Heading level="2" size="medium" spacing className="lg:text-[32px]">
                    {t("forDuSoker.title")}
                </Heading>
                <BodyLong spacing>{t("forDuSoker.tekst")}</BodyLong>
                <Accordion>
                    <AccordionItem>
                        <AccordionHeader>{t("forDuSoker.accordion.item1.title")}</AccordionHeader>
                        <AccordionContent>
                            <List as="ol" className="mt-2 mb-7">
                                {t.rich("forDuSoker.accordion.item1.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong className="mb-2">
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
                            <List className="mt-2 mb-7">
                                {t.rich("forDuSoker.accordion.item2.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong className="mb-2">{t("forDuSoker.accordion.item2.tekst")}</BodyLong>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </HStack>

            <HStack>
                <Heading level="2" size="medium" spacing className="lg:text-[32px]">
                    {t("personopplysninger.title")}
                </Heading>
                <BodyLong spacing>{t("personopplysninger.tekst")}</BodyLong>
                <Accordion>
                    <AccordionItem>
                        <AccordionHeader>{t("personopplysninger.accordion.item1.title")}</AccordionHeader>
                        <AccordionContent>
                            <BodyLong className="mt-2" spacing>
                                {t("personopplysninger.accordion.item1.p1")}
                            </BodyLong>
                            <List as="ul" className="mb-7">
                                {t.rich("personopplysninger.accordion.item1.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong spacing>{t("personopplysninger.accordion.item1.p2")}</BodyLong>
                            <BodyLong className="mb-2">
                                {t.rich("personopplysninger.accordion.item1.p3", {
                                    a: (chuncks) => (
                                        <Link
                                            href="https://www.nav.no/personopplysninger-sosialhjelp"
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
                        <AccordionHeader>{t("personopplysninger.accordion.item2.title")}</AccordionHeader>
                        <AccordionContent>
                            <BodyLong className="mt-2" spacing>
                                {t("personopplysninger.accordion.item2.p1")}
                            </BodyLong>
                            <BodyLong className="mb-2">
                                {t.rich("personopplysninger.accordion.item2.p2", {
                                    a: (chuncks) => (
                                        <Link
                                            href="https://www.nav.no/endringer"
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
                </Accordion>
            </HStack>
        </>
    );
};

export default NySoknadInnhold;
