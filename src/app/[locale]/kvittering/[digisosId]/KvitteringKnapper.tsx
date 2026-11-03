import {Button, Stack} from "@navikt/ds-react";
import {ArrowRightIcon, DownloadIcon} from "@navikt/aksel-icons";
import {useTranslations} from "next-intl";

export default function KvitteringKnapper({innsynHref, soknadPdfUrl}: {innsynHref: string; soknadPdfUrl?: string}) {
    const t = useTranslations("Kvittering");

    return (
        <Stack
            align="stretch"
            direction={{xs: "column", lg: "row"}}
            wrap={false}
            gap="space-12"
            width="100%"
            maxWidth="100%"
            marginInline="auto"
            marginBlock={{xs: "space-24 space-0", lg: "space-64 space-0"}}
        >
            <Button
                as="a"
                href={innsynHref}
                className="w-full text-center lg:flex-1 lg:min-w-0"
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
                    className="w-full text-center lg:flex-1 lg:min-w-0"
                    variant={"tertiary"}
                    iconPosition={"left"}
                    icon={<DownloadIcon aria-hidden="true" />}
                    size={"medium"}
                >
                    {t("lastNed")}
                </Button>
            )}
        </Stack>
    );
}
