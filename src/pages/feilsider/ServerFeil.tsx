import * as React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useTitle} from "../../lib/hooks/common/useTitle";
import {SystemError} from "@navikt/ds-icons";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {logError} from "../../lib/utils/loggerUtils";

const useQuery = ({search}: Pick<Location, "search">) => useMemo(() => new URLSearchParams(search), [search]);

export const ServerFeil = () => {
    const {t} = useTranslation("skjema");
    const reason = useQuery(useLocation()).get("reason");

    useTitle(`Feilside - ${document.location.hostname}`);

    logError(`Viser feilside, error: ${reason}, referrer: ${document.referrer}`);
    return (
        <>
            <AppHeader />

            <div className={"text-[var(--a-text-on-danger-subtle)] px-8 py-8 md:py-12"}>
                <div className={"grid grid-cols-[30px_auto_repeat(2,_minmax(0,_1fr))] md:grid-cols-4 gap-8"}>
                    <div className={"md:ml-auto md:row-span-2"}>
                        <SystemError className={"text-[var(--a-surface-danger)] md:pr-2 h-full w-full"} />
                    </div>
                    <Heading level="1" size="xlarge" className={"col-span-3 !leading-[0.75em] !mt-auto"}>
                        {t("feilside.serverfeil.beklager")}
                    </Heading>
                    <div className={"col-span-4 md:col-span-2 md:col-start-2"}>
                        <div className={"-mb-2.5"}>
                            <Heading level={"2"} size={"large"}>
                                {t("feilside.serverfeil.teknisk.feil")}
                            </Heading>
                            <Heading level={"3"} size={"medium"}>
                                {t("feilside.serverfeil.prov.igjen")}
                            </Heading>
                        </div>
                    </div>
                    <div className={"col-span-4 md:col-span-2 md:col-start-2"}>
                        <Button
                            className="md:!mb-8 md:!mt-4 !mb-6"
                            variant="secondary"
                            onClick={() => (window.location.href = "/sosialhjelp/soknad")}
                        >
                            {t("feilside.serverfeil.til.startsiden")}
                        </Button>
                        <BodyShort spacing>{t("feilside.serverfeil.loggfort")}</BodyShort>
                    </div>
                </div>
            </div>
            <div className={"bg-[var(--a-surface-action-subtle)] grid md:grid-cols-4 gap-8 p-8 grow"}>
                <div className={"md:col-start-2 col-span-2"}>
                    <Heading level={"3"} size={"xlarge"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tittel")}
                    </Heading>
                    <Heading level={"4"} size={"small"} spacing>
                        <Trans
                            t={t}
                            i18nKey={"feilside.serverfeil.papir"}
                            components={{
                                lenke: <Link href="https://www.nav.no/sosialhjelp/sok-papir">{null}</Link>,
                            }}
                        />
                    </Heading>
                    <BodyShort className={"whitespace-pre-line pb-3"} spacing>
                        {t("feilside.serverfeil.nodsituasjon.tekst")}
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="/sosialhjelp/soknad">{t("feilside.serverfeil.startside")}</Link>
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="https://www.nav.no">{t("feilside.serverfeil.lenke.nav")}</Link>
                    </BodyShort>

                    <BodyShort spacing>
                        <Link href="https://www.nav.no/minside">{t("feilside.serverfeil.lenke.minside")}</Link>
                    </BodyShort>
                    <BodyShort>
                        <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                            {t("feilside.serverfeil.lenke.meldfra")}
                        </Link>
                    </BodyShort>
                </div>
            </div>
        </>
    );
};
export default ServerFeil;
