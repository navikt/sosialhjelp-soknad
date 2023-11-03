import * as React from "react";
import {Alert, Heading, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";

export const PersonbeskyttelseFeilmelding = () => {
    const {t} = useTranslation();

    return (
        <div>
            <AppHeader />
            <div className={"py-24 px-4 max-w-3xl mx-auto"}>
                <Alert variant={"warning"}>
                    <Heading level={"2"} size={"medium"}>
                        {t("informasjon.ikketilgang.bruker.tittel")}
                    </Heading>
                    <Trans
                        t={t}
                        i18nKey={"informasjon.ikketilgang.bruker.tekst.v2"}
                        components={{
                            lenke: (
                                <Link
                                    href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor"
                                    target="_blank"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </Alert>
            </div>
        </div>
    );
};
