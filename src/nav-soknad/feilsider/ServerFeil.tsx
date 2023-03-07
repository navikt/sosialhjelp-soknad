import * as React from "react";
import {useTranslation} from "react-i18next";
import {useTitle} from "../../lib/hooks/useTitle";
import {SystemError} from "@navikt/ds-icons";
import {BodyShort, Heading, Link} from "@navikt/ds-react";
import AppHeader from "../components/appHeader/AppHeader";
import {logError} from "../utils/loggerUtils";

export const ServerFeil = () => {
    const {t} = useTranslation("skjema");
    useTitle(`Feilside - ${document.location.hostname}`);

    logError(`Viser feilside, referrer: ${document.referrer}`);
    return (
        <>
            <AppHeader />

            <div className={"text-center text-[var(--a-text-on-danger)] bg-[var(--a-surface-danger)] p-16"}>
                <div className={"flex justify-center gap-4 rotate-[4deg] pt-4"}>
                    <SystemError fontSize={"var(--a-font-size-heading-2xlarge)"} />
                    <Heading level="1" size="xlarge" spacing>
                        Vi <span className={"inline-block rotate-[-19deg]"}>beklager</span> teknisk{" "}
                        <span className={"inline-block rotate-[-10deg]"}>feil</span>
                    </Heading>
                </div>
                <Heading level={"2"} size={"medium"} spacing>
                    En feil har oppstått i digital sosialhjelpsøknad
                </Heading>
            </div>
            <div className={"bg-[var(--a-surface-danger-subtle)] p-8"}>
                <div className={"max-w-3xl mx-auto"}>
                    <Heading level={"2"} size={"medium"} spacing>
                        Vi anbefaler at du prøver på nytt litt senere, eller kontakter{" "}
                        <Link className={"!inline"} href={"https://www.nav.no/finnkontor"}>
                            ditt NAV-kontor
                        </Link>
                        .
                    </Heading>
                    <Heading level={"2"} size={"medium"} spacing>
                        Problemet er blitt loggført og vil utbedres så fort som mulig.
                    </Heading>
                    <Heading level={"2"} size={"medium"} spacing>
                        Du kan{" "}
                        <Link href={"https://www.nav.no/sosialhjelp/sok-papir"} className={"!inline"}>
                            søke om sosialhjelp på papir
                        </Link>{" "}
                        hos ditt NAV-kontor.
                    </Heading>
                    <Heading level={"2"} size={"medium"}>
                        <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                            Du kan også sende en feilrapport.
                        </Link>
                    </Heading>
                </div>
            </div>
            <div className={"bg-[var(--a-surface-action-subtle)] p-8 pb-96"}>
                <div className={"max-w-3xl mx-auto"}>
                    <Heading level={"3"} size={"large"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tittel")}
                    </Heading>
                    <BodyShort className={"whitespace-pre-line pb-3"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tekst")}
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="/sosialhjelp/soknad">Gå til forsiden for sosialhjelp</Link>
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="https://www.nav.no">Gå til nav.no</Link>
                    </BodyShort>

                    <BodyShort>
                        <Link href="https://www.nav.no/minside">Gå til Min side</Link>
                    </BodyShort>
                </div>
            </div>
        </>
    );
};
