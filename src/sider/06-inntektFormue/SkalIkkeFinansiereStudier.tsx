import {Trans, useTranslation} from "react-i18next";
import {BodyShort, GuidePanel, Heading, Link} from "@navikt/ds-react";
import * as React from "react";

export const SkalIkkeFinansiereStudier = () => {
    const {t} = useTranslation("skjema");

    return (
        <GuidePanel>
            <Heading level={"3"} size={"small"} spacing>
                {t("informasjon.student.studielan.tittel")}
            </Heading>
            <BodyShort spacing>
                <Trans
                    t={t}
                    i18nKey={"informasjon.student.studielan.number1.v2"}
                    components={{
                        lenke: (
                            <Link
                                href={t("informasjon.student.studielan.url")}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {null}
                            </Link>
                        ),
                    }}
                />
            </BodyShort>
            <BodyShort spacing>{t("informasjon.student.studielan.number2")}</BodyShort>
        </GuidePanel>
    );
};
