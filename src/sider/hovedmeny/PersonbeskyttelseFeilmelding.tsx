"use client";

import * as React from "react";
import {Alert, Heading, Link} from "@navikt/ds-react";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {useTranslations} from "next-intl";

export const PersonbeskyttelseFeilmelding = () => {
    const t = useTranslations("PersonbeskyttelseFeilmelding");

    return (
        <div>
            <AppHeader />
            <div className={"py-24 px-4 max-w-3xl mx-auto"}>
                <Alert variant={"warning"}>
                    <Heading level={"2"} size={"medium"}>
                        {t("title")}
                    </Heading>
                    {t.rich("text", {
                        lenke: (chunks) => (
                            <Link href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor" target="_blank">
                                {chunks}
                            </Link>
                        ),
                    })}
                </Alert>
            </div>
        </div>
    );
};
