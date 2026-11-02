import {Button, VStack} from "@navikt/ds-react";
import {ArrowRightIcon, DownloadIcon} from "@navikt/aksel-icons";
import {getTranslations} from "next-intl/server";
import type {SupportedLanguage} from "../../../../lib/i18n/common.ts";

export default async function KvitteringKnapper({
    language,
    innsynHref,
    pdfUrl,
}: {
    language: SupportedLanguage;
    innsynHref: string;
    pdfUrl?: string;
}) {
    const t = await getTranslations({locale: language, namespace: "Kvittering"});

    return (
        <VStack
            align="stretch"
            gap="space-12"
            width="100%"
            maxWidth="100%"
            marginInline="auto"
            marginBlock="space-24 space-0"
        >
            <Button
                as="a"
                href={innsynHref}
                className="w-full text-center"
                iconPosition={"right"}
                icon={<ArrowRightIcon aria-hidden="true" />}
                size={"medium"}
            >
                {t("minSide")}
            </Button>

            {pdfUrl && (
                <Button
                    as="a"
                    href={pdfUrl}
                    download
                    className="w-full text-center"
                    variant={"tertiary"}
                    iconPosition={"right"}
                    icon={<DownloadIcon aria-hidden="true" />}
                    size={"medium"}
                >
                    {t("lastNed")}
                </Button>
            )}
        </VStack>
    );
}
