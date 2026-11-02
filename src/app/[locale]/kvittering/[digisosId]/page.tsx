import {BodyLong, Box, Heading, HStack, Link} from "@navikt/ds-react";
import {InfoCard, InfoCardHeader, InfoCardTitle, InfoCardContent} from "@navikt/ds-react/InfoCard";
import {getTranslations} from "next-intl/server";
import digisosConfig from "../../../../lib/config.ts";
import {supportedLanguageOrFallback} from "../../../../lib/i18n/common.ts";
import {CheckmarkCircleFillIcon, LightBulbIcon} from "@navikt/aksel-icons";
import KvitteringKnapper from "./KvitteringKnapper.tsx";
import KvitteringProsess from "./KvitteringProsess.tsx";
import {hentKvittering} from "../../../../lib/api/ssr/hentKvittering.ts";

export default async function KvitteringPage({params}: {params: Promise<{locale: string; digisosId: string}>}) {
    const {locale, digisosId} = await params;
    const language = supportedLanguageOrFallback(locale);
    const t = await getTranslations({locale: language, namespace: "Kvittering"});
    const kvittering = await hentKvittering(digisosId);
    const href = `${digisosConfig.innsynURL}/${language}/soknad/${encodeURIComponent(digisosId)}`;

    return (
        <Box
            as="main"
            width="100%"
            marginInline="auto"
            className="max-w-lg lg:max-w-3xl"
            paddingInline={{xs: "space-12", lg: "space-96"}}
            paddingBlock={{xs: "space-24", lg: "space-64"}}
        >
            <HStack align="center" gap="space-12" wrap={false}>
                <CheckmarkCircleFillIcon
                    className="size-(--ax-space-40) shrink-0 md:size-(--ax-space-64)"
                    style={{color: "var(--ax-text-success-decoration)"}}
                    aria-hidden="true"
                />
                <Heading level="1" size="large">
                    {t("tittel")}
                </Heading>
            </HStack>

            <KvitteringProsess language={language} tidspunktSendt={kvittering?.tidspunktSendt} />

            <Heading size={"small"} level="3" className="mt-8" spacing>
                {t("sporsmal.tittel")}
            </Heading>
            <BodyLong spacing>
                {t.rich("sporsmal.tekst", {
                    navKontor: (chunks) => <Link href="#">{chunks}</Link>,
                    telefon: (chunks) => <Link href="tel:+4755553333">{chunks}</Link>,
                })}
            </BodyLong>

            <Heading size={"small"} level="3" className="mt-8" spacing>
                {t("dokumentasjon.tittel")}
            </Heading>
            <BodyLong spacing>
                {t.rich("dokumentasjon.tekst", {
                    dokumentasjon: (chunks) => (
                        <Link href={href} rel="noreferrer">
                            {chunks}
                        </Link>
                    ),
                })}
            </BodyLong>

            <InfoCard as="section" data-color="info">
                <InfoCardHeader icon={<LightBulbIcon aria-hidden />}>
                    <InfoCardTitle>{t("status.tittel")}</InfoCardTitle>
                </InfoCardHeader>
                <InfoCardContent>{t("status.tekst")}</InfoCardContent>
            </InfoCard>

            <KvitteringKnapper language={language} innsynHref={href} pdfUrl={kvittering?.soknadPdfUrl} />
        </Box>
    );
}
