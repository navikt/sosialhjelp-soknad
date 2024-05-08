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
        <div className={"p-8 lg:py-12 lg:px-24"}>
            <GuidePanel className={"!-ml-10 pb-8"}>
                {sessionInfo?.fornavn?.length && (
                    <Heading level={"3"} size={"small"} spacing>
                        {t("informasjon.hilsen.hei", {fornavn: sessionInfo.fornavn})}
                    </Heading>
                )}
                <BodyShort>{t("informasjon.hilsen.tittel")}</BodyShort>
            </GuidePanel>
            <Heading level="2" size="small" spacing>
                {t("informasjon.start.undertittel")}
            </Heading>
            <BodyLong spacing>{t("informasjon.start.tekst_del1")}</BodyLong>
            <BodyLong spacing>{t("informasjon.start.tekst_del2")}</BodyLong>
            <BodyLong spacing>
                <Trans
                    t={t}
                    i18nKey={"informasjon.start.tekst_del3"}
                    components={{
                        lenke: (
                            <a
                                href="https://www.nav.no/okonomisk-sosialhjelp#soknad"
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
            <Heading level="2" size="small" spacing>
                {t("informasjon.svarpasoknad.undertittel")}
            </Heading>
            <BodyLong spacing>{t("informasjon.svarpasoknad.tekst")}</BodyLong>
            <Heading level="2" size="small" spacing>
                {t("informasjon.nodsituasjon.undertittel")}
            </Heading>
            <BodyLong spacing>
                <Trans
                    t={t}
                    i18nKey={"informasjon.nodsituasjon.tekst"}
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
