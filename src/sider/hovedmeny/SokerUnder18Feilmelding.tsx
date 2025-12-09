"use client";

import * as React from "react";
import {Alert, BodyLong, Heading, Link, VStack} from "@navikt/ds-react";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {useTranslations} from "next-intl";

export const SokerUnder18Feilmelding = () => {
    const t = useTranslations("SokerUnder18Feilmelding");

    return (
        <div>
            <AppHeader />
            <div className={"py-24 px-4 max-w-3xl mx-auto"}>
                <Alert variant={"info"}>
                    <Heading level={"2"} size={"medium"}>
                        {t("title")}
                    </Heading>
                    <VStack gap="5">
                        <BodyLong>{t("text1")}</BodyLong>
                        <BodyLong>
                            {t.rich("text2", {
                                lenke: (chunks) => (
                                    <Link
                                        href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor"
                                        target="_blank"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                                phone: (chunks) => (
                                    <Link href="tel:+4755553333" inlineText>
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </BodyLong>
                    </VStack>
                </Alert>
            </div>
        </div>
    );
};
