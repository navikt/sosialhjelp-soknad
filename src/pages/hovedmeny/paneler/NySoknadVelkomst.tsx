import {BodyLong, BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import * as React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {logAmplitudeEvent} from "../../../lib/utils/amplitude";

export const NySoknadVelkomst = () => {
    const {data: sessionInfo} = useGetSessionInfo();
    const {t} = useTranslation("skjema");

    const logLinkClicked = () => {
        logAmplitudeEvent("navigere", {
            lenkeTekst: "opplysninger du kan bli bedt om å levere",
            destinasjon: "https://www.nav.no/okonomisk-sosialhjelp#soknad",
            antallNyligInnsendteSoknader: sessionInfo?.numRecentlySent ?? 0,
        });
    };

    return (
        <div className={"p-81 lg:py-12 lg:px-24"}>
            <GuidePanel className={"!-ml-10 pb-8"}>
                {sessionInfo?.fornavn?.length && (
                    <Heading level={"3"} size={"small"} spacing>
                        {t("informasjon.hilsen.hei", {fornavn: sessionInfo.fornavn})}
                    </Heading>
                )}
                <BodyShort>{t("informasjon.hilsen.tittel")}</BodyShort>
            </GuidePanel>
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
                                href="https://www.nav.no/okonomisk-sosialhjelp#sok"
                                target="_blank"
                                rel="noreferrer"
                                onClick={logLinkClicked}
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
                            <a href="https://www.nav.no/sok-nav-kontor" target="_blank" rel="noreferrer">
                                {null}
                            </a>
                        ),
                    }}
                />
            </BodyLong>
        </div>
    );
};
