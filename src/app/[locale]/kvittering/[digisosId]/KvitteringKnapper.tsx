import {Button, VStack} from "@navikt/ds-react";
import {ArrowRightIcon, DownloadIcon} from "@navikt/aksel-icons";
import {useTranslations} from "next-intl";

export default function KvitteringKnapper({innsynHref, soknadPdfUrl}: {innsynHref: string; soknadPdfUrl?: string}) {
    const t = useTranslations("Kvittering");

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

            {soknadPdfUrl && (
                <Button
                    as="a"
                    href={soknadPdfUrl}
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
