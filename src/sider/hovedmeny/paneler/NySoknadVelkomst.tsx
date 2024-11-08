import {BodyLong, Heading} from "@navikt/ds-react";
import * as React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs.ts";
import StartNySoknadIllustrasjon from "../../../lib/components/svg/illustrasjoner/StartNySoknadIllustrasjon.tsx";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";

export const NySoknadVelkomst = () => {
    const {data: sessionInfo} = useGetSessionInfo();
    const {t, i18n} = useTranslation("skjema");

    type SupportedLanguage = "nb" | "nn" | "en";

    const sokUrl = "https://www.nav.no/okonomisk-sosialhjelp";

    const urlFragments: Record<SupportedLanguage, string> = {
        nb: "#sok",
        nn: "/nn#sok",
        en: "/en#apply",
    };
    const sokHref = `${sokUrl}${urlFragments[i18n.language as SupportedLanguage] || urlFragments.nb}`;

    const personUrl = "https://www.nav.no/personopplysninger-sosialhjelp";
    const personHref = i18n.language === "nb" ? personUrl : `${personUrl}/${i18n.language}`;

    return (
        <div className={"p-8 lg:py-12 lg:px-24 flex flex-col"}>
            <div className={"flex flex-col items-center mb-12"}>
                <StartNySoknadIllustrasjon />
            </div>
            <Heading level="2" size="small">
                {t("informasjon.start.undertittel")}
            </Heading>
            <BodyLong className={"pb-4"}>{t("informasjon.start.tekst_del1")}</BodyLong>
            <BodyLong className={"pb-4"}>
                <Trans
                    t={t}
                    i18nKey={"informasjon.start.tekst_del2"}
                    components={{
                        lenke: (
                            <a
                                href={sokHref}
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
                                {null}
                            </a>
                        ),
                    }}
                />
            </BodyLong>
            <BodyLong>{t("informasjon.start.tekst_del3")}</BodyLong>
            <Heading level="2" size="small" className={"pt-10"}>
                {t("informasjon.nodsituasjon.undertittel")}
            </Heading>
            <BodyLong>{t("informasjon.nodsituasjon.tekst")}</BodyLong>
            <Heading level="2" size="small" className={"pt-10"}>
                {t("informasjon.innhenting.undertittel")}
            </Heading>
            <BodyLong className={"pb-4"}>{t("informasjon.innhenting.tekst_del1")}</BodyLong>
            <BodyLong>
                <Trans
                    t={t}
                    i18nKey={"informasjon.innhenting.tekst_del2"}
                    components={{
                        lenke: (
                            <a href={personHref} target="_blank" rel="noreferrer">
                                {null}
                            </a>
                        ),
                    }}
                />
            </BodyLong>
        </div>
    );
};
