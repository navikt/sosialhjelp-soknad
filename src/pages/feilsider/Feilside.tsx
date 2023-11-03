import * as React from "react";
import {useTitle} from "../../lib/hooks/common/useTitle";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";
import {SystemError} from "@navikt/ds-icons";
import {useTranslation} from "react-i18next";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {useEffect} from "react";
import {faro} from "@grafana/faro-react";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";

export interface FeilsideProps {
    tittel?: string;
    children: React.ReactNode;
    visKnapp?: boolean;
    knappTekst?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
}

const Feilside = ({
    tittel = "OOPS, NOE GIKK GALT",
    children,
    visKnapp,
    knappTekst = "Gå tilbake",
    onClick,
}: FeilsideProps) => {
    const {t} = useTranslation("skjema");
    useTitle(`Feilside - ${document.location.hostname}`);
    const error = useRouteError();

    useEffect(() => {
        if (!error) return;
        if (isRouteErrorResponse(error)) {
            faro.api.pushError(new Error(`${error.status} ${error.statusText}`));
        } else {
            faro.api.pushError(new Error(JSON.stringify(error)));
        }
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
