import {Trans, useTranslation} from "react-i18next";
import {BodyShort, GuidePanel, Heading, Link} from "@navikt/ds-react";
import * as React from "react";

const STUDERER_INFO_TITTEL = "informasjon.student.studielan.tittel";
const STUDERER_INFO_DEL1 = "informasjon.student.studielan.1.v2";
const STUDERER_INFO_DEL2 = "informasjon.student.studielan.2";
export const InformasjonTilStudent = () => {
    const {t} = useTranslation("skjema");

    return (
        <GuidePanel className={"!-ml-10"}>
            <Heading level={"3"} size={"small"} spacing>
                {t(STUDERER_INFO_TITTEL)}
            </Heading>
            <BodyShort spacing>
                <Trans
                    t={t}
                    i18nKey={STUDERER_INFO_DEL1}
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
            <BodyShort spacing>{t(STUDERER_INFO_DEL2)}</BodyShort>
        </GuidePanel>
    );
};
