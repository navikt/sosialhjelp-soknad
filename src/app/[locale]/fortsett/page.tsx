"use client";
import {Heading, LinkCard, VStack} from "@navikt/ds-react";
import {addDays, formatDistance} from "date-fns";
import {useTranslations} from "next-intl";
import {PabegyntSoknad} from "../../../generated/model/pabegyntSoknad.ts";
import {LocalizedDate} from "../../../lib/components/LocalizedDate.tsx";
import {SoknadHeader} from "../../../lib/components/SoknadHeader.tsx";
import {getDateFnLocale} from "../../../lib/i18n/dateFns.ts";
import {useContextSessionInfo} from "../../../lib/providers/useContextSessionInfo.ts";
import {useConfigFeatureFlags} from "../../../lib/config.ts";
import {redirect} from "next/navigation";

const DAYS_BEFORE_DELETION = 14;

const getTimeBeforeDeletion = (sistOppdatert: string) =>
    formatDistance(addDays(new Date(sistOppdatert), DAYS_BEFORE_DELETION), new Date(), {
        locale: getDateFnLocale(),
        addSuffix: true,
    });

const getSoknadUri = (soknadId: string, isKort: boolean) =>
    `/sosialhjelp/soknad/skjema${isKort ? "/kort" : ""}/${soknadId}/1`;

export const Page = () => {
    const {open} = useContextSessionInfo();
    const t = useTranslations("FortsettSoknad");
    const featureToggles = useConfigFeatureFlags();
    if (!featureToggles.nyIntroside) {
        redirect("/sosialhjelp/soknad");
    }

    return (
        <main className="max-w-lg lg:max-w-xl w-full mx-auto gap-6 p-3 py-6 lg:gap-8 lg:py-8 flex flex-col grow">
            <SoknadHeader></SoknadHeader>

            <VStack gap="space-8">
                <Heading level="2" size="small" className="lg:text-2xl">
                    {t("title")}
                </Heading>

                <VStack as="ul" gap={{xs: "space-24", lg: "space-32"}}>
                    {open?.map((soknad: PabegyntSoknad) => {
                        const {soknadId, isKort, sistOppdatert} = soknad;

                        return (
                            <li key={soknadId}>
                                <LinkCard data-color="accent">
                                    <LinkCard.Title>
                                        <LinkCard.Anchor href={getSoknadUri(soknadId, isKort)}>
                                            {t("cardTitle")} <LocalizedDate date={sistOppdatert} />
                                        </LinkCard.Anchor>
                                    </LinkCard.Title>
                                    <LinkCard.Description>
                                        {t("cardDescription")} {getTimeBeforeDeletion(sistOppdatert)}
                                    </LinkCard.Description>
                                </LinkCard>
                            </li>
                        );
                    })}
                </VStack>
            </VStack>
        </main>
    );
};

export default Page;
