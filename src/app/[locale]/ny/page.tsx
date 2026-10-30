"use client";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {
    Accordion,
    Alert,
    BodyLong,
    Button,
    Checkbox,
    ErrorMessage,
    GuidePanel,
    Heading,
    HStack,
    Link,
    List,
    Loader,
} from "@navikt/ds-react";
import {AccordionContent, AccordionHeader, AccordionItem} from "@navikt/ds-react/Accordion";
import {ListItem} from "@navikt/ds-react/List";
import {useTranslations} from "next-intl";
import {redirect, useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useCreateSoknad} from "../../../generated";
import {SoknadHeader} from "../../../lib/components/SoknadHeader";
import {useConfigFeatureFlags} from "../../../lib/config";
import {umamiTrack} from "../../umami";

const Page = () => {
    const featureToggles = useConfigFeatureFlags();
    if (!featureToggles.nyIntroside) {
        redirect("/sosialhjelp/soknad");
    }

    const t = useTranslations("NySoknad");
    const router = useRouter();
    const [isTransitioning, startTransition] = useTransition();
    const {mutate, isPending, error} = useCreateSoknad({
        mutation: {
            onSuccess: async (data) => {
                startTransition(() => router.push(`/skjema/${data.soknadId}/1`));
                umamiTrack("Skjema startet");
            },
        },
    });
    const [checked, setChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);

    return (
        <main className="max-w-lg lg:max-w-xl w-full mx-auto gap-8 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
            <SoknadHeader />

            <GuidePanel poster>
                <Heading level="2" size="medium" spacing>
                    {t("dialog.hei")}
                </Heading>
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

            <HStack>
                <Heading level="2" size="medium" spacing className="lg:text-[32px]">
                    {t("personopplysninger.title")}
                </Heading>
                <BodyLong spacing>{t("personopplysninger.tekst")}</BodyLong>
                <Accordion>
                    <AccordionItem>
                        <AccordionHeader>{t("personopplysninger.accordion.item1.title")}</AccordionHeader>
                        <AccordionContent>
                            <BodyLong spacing>{t("personopplysninger.accordion.item1.p1")}</BodyLong>
                            <List as="ul" className="mb-7">
                                {t.rich("personopplysninger.accordion.item1.liste", {
                                    li: (chuncks) => <ListItem>{chuncks}</ListItem>,
                                })}
                            </List>
                            <BodyLong spacing>{t("personopplysninger.accordion.item1.p2")}</BodyLong>
                            <BodyLong>
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
                            <BodyLong spacing>{t("personopplysninger.accordion.item2.p1")}</BodyLong>
                            <BodyLong>
                                {t.rich("personopplysninger.accordion.item2.p2", {
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
                </Accordion>
            </HStack>

            <div>
                <BodyLong className="mb-4">
                    {t.rich("bekreftelse.tekst", {
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
                <Checkbox onChange={(e) => setChecked(e.target.checked)} error={!!checkboxError}>
                    {t("bekreftelse.checkboxLabel")}
                </Checkbox>
                {checkboxError && (
                    <ErrorMessage className="font-normal ml-8" size="small">
                        {t("bekreftelse.checkboxError")}
                    </ErrorMessage>
                )}
            </div>

            {error && <Alert variant="error">{t("bekreftelse.feilet")}</Alert>}

            <Button
                variant="primary"
                iconPosition="right"
                icon={isTransitioning || isPending ? <Loader aria-hidden /> : <ArrowRightIcon aria-hidden />}
                disabled={isTransitioning || isPending}
                onClick={(event) => {
                    event.preventDefault();
                    if (checked) {
                        setCheckboxError(false);
                        mutate({});
                    } else {
                        setCheckboxError(true);
                    }
                }}
            >
                {t("bekreftelse.button")}
            </Button>
        </main>
    );
};

export default Page;
