import * as React from "react";
import {useTranslation} from "react-i18next";
import {useTitle} from "../../lib/hooks/useTitle";
import {SystemError} from "@navikt/ds-icons";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";
import AppHeader from "../components/appHeader/AppHeader";
import {logError} from "../utils/loggerUtils";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";

const useQuery = ({search}: Pick<Location, "search">) => useMemo(() => new URLSearchParams(search), [search]);

export const ServerFeil = () => {
    const {t} = useTranslation("skjema");
    const reason = useQuery(useLocation()).get("reason");

    useTitle(`Feilside - ${document.location.hostname}`);

    logError(`Viser feilside, error: ${reason}, referrer: ${document.referrer}`);
    return (
        <>
            <AppHeader />

            <div className={" text-[var(--a-text-on-danger-subtle)] px-8 py-12 md:py-24"}>
                <div className={"grid md:grid-cols-4 gap-8"}>
                    <div className={"md:ml-auto mt-3"}>
                        <SystemError fontSize={"96px"} className={"text-[var(--a-surface-danger)]"} />
                    </div>
                    <div className={"col-span-3"}>
                        <Heading level="1" size="xlarge">
                            Vi beklager!
                        </Heading>
                        <Heading level={"2"} size={"large"}>
                            En teknisk feil har oppstått.{" "}
                        </Heading>
                        <Heading level={"3"} size={"medium"}>
                            Vi anbefaler at du prøver på nytt.
                        </Heading>
                        <Button
                            className="!mb-8 !mt-4"
                            variant="secondary"
                            onClick={() => (window.location.href = "/sosialhjelp/soknad")}
                        >
                            Til startsiden for søknad
                        </Button>
                        <BodyShort spacing>
                            Hendelsen har blitt loggført og problemet utbedres så fort som mulig.
                        </BodyShort>
                    </div>
                </div>
            </div>
            <div className={"bg-[var(--a-surface-action-subtle)] grid md:grid-cols-4 gap-8 p-8"}>
                <div className={"md:col-start-2 col-span-2"}>
                    <Heading level={"3"} size={"large"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tittel")}
                    </Heading>
                    <BodyShort spacing>
                        Du kan også{" "}
                        <Link href={"https://www.nav.no/sosialhjelp/sok-papir"} className={"!inline"}>
                            søke om sosialhjelp på papir
                        </Link>{" "}
                        hos ditt NAV-kontor.
                    </BodyShort>
                    <BodyShort className={"whitespace-pre-line pb-3"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tekst")}
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="/sosialhjelp/soknad">Gå til forsiden for sosialhjelp</Link>
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="https://www.nav.no">Gå til nav.no</Link>
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="https://www.nav.no/minside">Gå til Min side</Link>
                    </BodyShort>
                    <BodyShort>
                        <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                            Send feilrapport
                        </Link>
                    </BodyShort>
                </div>
            </div>
        </>
    );
};
