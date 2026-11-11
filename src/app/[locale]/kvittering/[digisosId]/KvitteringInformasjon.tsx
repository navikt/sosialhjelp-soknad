import {useLocale, useTranslations} from "next-intl";
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {AccordionContent, AccordionHeader, AccordionItem} from "@navikt/ds-react/Accordion";
import digisosConfig from "../../../../lib/config.ts";
import {supportedLanguageOrFallback} from "../../../../lib/i18n/common.ts";

export default function KvitteringInformasjon({innsynHref}: {innsynHref: string}) {
    const t = useTranslations("Kvittering");
    const language = supportedLanguageOrFallback(useLocale());

    return (
        <div>
            <Heading size={"medium"} level="3" spacing>
                {t("info")}
            </Heading>
            <Accordion>
                <AccordionItem>
                    <AccordionHeader>{t("dokumentasjon.tittel")}</AccordionHeader>
                    <AccordionContent>
                        {t.rich("dokumentasjon.tekst", {
                            dokumentasjon: (chunks) => (
                                <Link href={innsynHref} rel="noreferrer">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>{t("utbetaling.tittel")}</AccordionHeader>
                    <AccordionContent>
                        {t.rich("utbetaling.tekst", {
                            utbetalinger: (chunks) => (
                                <Link href={`${digisosConfig.innsynURL}/${language}/utbetalinger`} rel="noreferrer">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>{t("sporsmal.tittel")}</AccordionHeader>
                    <AccordionContent>
                        {t.rich("sporsmal.tekst", {
                            navKontor: (chunks) => <Link href="https://www.nav.no/sok-nav-kontor">{chunks}</Link>,
                            telefon: (chunks) => <Link href="tel:+4755553333">{chunks}</Link>,
                        })}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
