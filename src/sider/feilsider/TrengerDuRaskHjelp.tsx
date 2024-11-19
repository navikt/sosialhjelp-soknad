import {BodyShort, Heading, Link} from "@navikt/ds-react";
import * as React from "react";
import {useTranslations} from "next-intl";
import {ReactNode} from "react";
import {ErrorPageColumnarLayout} from "./ErrorPageColumnarLayout.tsx";

export const TrengerDuRaskHjelp = () => {
    const t = useTranslations("TrengerDuRaskHjelp");

    return (
        <ErrorPageColumnarLayout className={"bg-[var(--a-surface-action-subtle)] grow"}>
            <Heading level={"3"} size={"xlarge"} spacing>
                {t("title")}
            </Heading>
            <Heading level={"4"} size={"small"} spacing>
                {t.rich("papirAlternativ", {
                    lenke: (chunks: ReactNode) => <Link href={t("papirAlternativUrl")}>{chunks}</Link>,
                })}
            </Heading>
            <BodyShort className={"whitespace-pre-line pb-3"} spacing>
                {t("kontaktKontoret")}
            </BodyShort>

            <BodyShort spacing>
                <Link href="/sosialhjelp/soknad">{t("lenkeTilHovedmeny")}</Link>
            </BodyShort>

            <BodyShort spacing>
                <Link href="https://www.nav.no">{t("lenkeTilNavForside")}</Link>
            </BodyShort>

            <BodyShort spacing>
                <Link href="https://www.nav.no/minside">{t("lenkeTilMinSide")}</Link>
            </BodyShort>

            <BodyShort>
                <Link href={t("bugRapportUrl")}>{t("sendBugRapport")}</Link>
            </BodyShort>
        </ErrorPageColumnarLayout>
    );
};
