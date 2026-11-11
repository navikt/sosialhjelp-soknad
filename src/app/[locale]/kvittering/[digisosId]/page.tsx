"use client";

import {Heading, HStack} from "@navikt/ds-react";
import {InfoCard, InfoCardContent, InfoCardHeader, InfoCardTitle} from "@navikt/ds-react/InfoCard";
import {useLocale, useTranslations} from "next-intl";
import {redirect, useParams} from "next/navigation";
import {isAxiosError} from "axios";
import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {useEffect} from "react";
import digisosConfig, {useConfigFeatureFlags} from "../../../../lib/config.ts";
import {supportedLanguageOrFallback} from "../../../../lib/i18n/common.ts";
import {useRouter} from "../../../../i18n/routing.ts";
import {getPathPrefixIncludingLocale} from "../../../../getPathPrefixIncludingLocale.ts";
import {CheckmarkCircleFillIcon, LightBulbIcon} from "@navikt/aksel-icons";
import {AppHeader} from "../../../../lib/components/appHeader/AppHeader.tsx";
import KvitteringKnapper from "./KvitteringKnapper.tsx";
import KvitteringProsess from "./KvitteringProsess.tsx";
import KvitteringInformasjon from "./KvitteringInformasjon.tsx";
import useDecoratorLogin from "../../../../lib/hooks/auth/useDecoratorLogin.ts";
import {useHentKvittering} from "../../../../generated";
import {ApplicationSpinner} from "../../../../lib/components/animasjoner/ApplicationSpinner.tsx";

export default function KvitteringPage() {
    const featureToggles = useConfigFeatureFlags(); //todo fjern når testing ferdig
    if (!featureToggles.kvittering) {
        redirect("/");
    }

    const {digisosId} = useParams<{digisosId: string}>();
    const language = supportedLanguageOrFallback(useLocale());
    const t = useTranslations("Kvittering");
    const {data, isPending, error} = useHentKvittering(digisosId, {query: {retry: 0}});
    const router = useRouter();
    const {isLoading} = useDecoratorLogin();

    useEffect(() => {
        document.documentElement.lang = language;
        void setParams({language});

        onLanguageSelect(({locale}) => {
            const {path} = getPathPrefixIncludingLocale();
            router.replace(path, {locale: supportedLanguageOrFallback(locale)});
        });
    }, [language, router]);

    if (isAxiosError(error) && error.response?.status === 400) {
        redirect("/");
    }

    if (isLoading || isPending) return <ApplicationSpinner />;

    const href = `${digisosConfig.innsynURL}/${language}/soknad/${encodeURIComponent(digisosId)}`;

    return (
        <>
            <AppHeader />
            <main
                className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
                aria-labelledby={"kvittering-heading"}
            >
                <HStack align="center" gap="space-12" wrap={false}>
                    <CheckmarkCircleFillIcon
                        fontSize={"3rem"}
                        className={"text-ax-text-success-subtle"}
                        aria-hidden="true"
                    />
                    <Heading id="kvittering-heading" level="2" size="large">
                        {t("tittel")}
                    </Heading>
                </HStack>

                <KvitteringProsess tidspunktSendt={data?.tidspunktSendt} />
                <KvitteringInformasjon innsynHref={href} />

                <InfoCard as="section" data-color="info">
                    <InfoCardHeader icon={<LightBulbIcon aria-hidden />}>
                        <InfoCardTitle as="h3">{t("status.tittel")}</InfoCardTitle>
                    </InfoCardHeader>
                    <InfoCardContent>{t("status.tekst")}</InfoCardContent>
                </InfoCard>

                <KvitteringKnapper innsynHref={href} soknadPdfUrl={data?.soknadPdfUrl} />
            </main>
        </>
    );
}
