import * as React from "react";
import {useTitle} from "../../lib/hooks/useTitle";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";
import AppHeader from "../components/appHeader/AppHeader";
import {SystemError} from "@navikt/ds-icons";
import {useTranslation} from "react-i18next";
import {useRouteError} from "react-router-dom";
import * as Sentry from "@sentry/react";
import {useEffect} from "react";

export interface FeilsideProps {
    tittel?: string;
    children: React.ReactNode;
    visKnapp?: boolean;
    knappTekst?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
}

const Feilside: React.FC<FeilsideProps> = ({
    tittel = "OOPS, NOE GIKK GALT",
    children,
    visKnapp,
    knappTekst = "Gå tilbake",
    onClick,
}) => {
    const {t} = useTranslation("skjema");
    useTitle(`Feilside - ${document.location.hostname}`);
    const error = useRouteError();

    useEffect(() => {
        if (!error) return;

        Sentry.captureException(error);
        console.warn("error", error);
    }, [error]);

    return (
        <>
            <AppHeader />
            <div className={"text-center space-y-4 pb-10 bg-[var(--a-surface-danger-subtle)] grow"}>
                <div
                    className={
                        "flex justify-center gap-4 text-[var(--a-text-on-danger)] bg-[var(--a-surface-danger)] p-4"
                    }
                >
                    <SystemError fontSize={"var(--a-font-size-heading-2xlarge)"} />
                    <Heading level="1" size="xlarge">
                        {tittel}
                    </Heading>
                </div>
                <BodyShort spacing>{children}</BodyShort>
                {visKnapp ? (
                    <Button variant="primary" onClick={onClick}>
                        {knappTekst}
                    </Button>
                ) : null}

                <BodyShort>
                    <Link href="https://www.nav.no">{t("feilside.lenke.nav.tekst")}</Link>
                </BodyShort>

                <BodyShort>
                    <Link href="https://www.nav.no/minside">{t("feilside.lenke.minside.teskt")}</Link>
                </BodyShort>

                <BodyShort>
                    <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        {t("feilside.lenke.meldfra.tekst")}
                    </Link>
                </BodyShort>
            </div>
        </>
    );
};

export default Feilside;
