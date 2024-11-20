import {BodyLong, Heading} from "@navikt/ds-react";
import * as React from "react";
import StartNySoknadIllustrasjon from "../../../lib/components/svg/illustrasjoner/StartNySoknadIllustrasjon.tsx";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";
import {useTranslations} from "next-intl";
import {ReactNode} from "react";
import {useContextSessionInfo} from "../../../lib/providers/useContextSessionInfo.ts";

export const NySoknadVelkomst = () => {
    const sessionInfo = useContextSessionInfo();
    const t = useTranslations("NySoknadVelkomst");

    const amplitudeLenke = (chunks: ReactNode) => (
        <a
            href={t("intro.soknadUrl")}
            target="_blank"
            rel="noreferrer"
            onClick={async () => {
                await logAmplitudeEvent("navigere", {
                    lenkeTekst: "opplysninger du kan bli bedt om å levere",
                    destinasjon: "https://www.nav.no/okonomisk-sosialhjelp#soknad",
                    antallNyligInnsendteSoknader: sessionInfo?.numRecentlySent ?? 0,
                });
            }}
        >
            {chunks}
        </a>
    );

    return (
        <div className={"p-8 lg:py-12 lg:px-24 flex flex-col"}>
            <div className={"flex flex-col items-center mb-12"}>
                <StartNySoknadIllustrasjon />
            </div>
            <Heading level="3" size="small">
                {t("intro.title")}
            </Heading>
            <BodyLong className={"pb-4"}>{t("intro.text.p1")}</BodyLong>
            <BodyLong className={"pb-4"}>{t.rich("intro.text.p2", {lenke: amplitudeLenke})}</BodyLong>
            <BodyLong>{t("intro.text.p3")}</BodyLong>
            <Heading level="3" size="small" className={"pt-10"}>
                {t("nodsituasjon.title")}
            </Heading>
            <BodyLong>{t("nodsituasjon.text")}</BodyLong>
            <Heading level="3" size="small" className={"pt-10"}>
                {t("innhenting.title")}
            </Heading>
            <BodyLong className={"pb-4"}>{t("innhenting.text.p1")}</BodyLong>
            <BodyLong>
                {t.rich("innhenting.text.p2", {
                    lenke: (chunks) => (
                        <a href={t("innhenting.persondataUrl")} target="_blank" rel="noreferrer">
                            {chunks}
                        </a>
                    ),
                })}
            </BodyLong>
        </div>
    );
};
