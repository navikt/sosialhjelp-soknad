import {BodyLong, Heading} from "@navikt/ds-react";
import * as React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
//import {useAmplitude} from "../../../lib/amplitude/useAmplitude";
import StartNySoknadIllustrasjon from "../../../lib/components/svg/illustrasjoner/StartNySoknadIllustrasjon";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";

export const NySoknadVelkomst = () => {
    //const {logevent} = useAmplitude();
    const {data: sessionInfo} = useGetSessionInfo();
    const {t} = useTranslation("skjema");

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
                                href="https://www.nav.no/okonomisk-sosialhjelp#sok"
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
                            <a
                                href="https://www.nav.no/personopplysninger-sosialhjelp"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {null}
                            </a>
                        ),
                    }}
                />
            </BodyLong>
        </div>
    );
};
