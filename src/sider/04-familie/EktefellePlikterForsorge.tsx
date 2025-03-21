import {useTranslation} from "react-i18next";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import * as React from "react";

interface Props {
    className?: string;
}

export const EktefellerPlikterForsorge = ({className}: Props) => {
    const {t} = useTranslation("skjema");

    return (
        <GuidePanel poster className={className}>
            <Heading level={"4"} size={"small"} spacing>
                {t("system.familie.sivilstatus.informasjonspanel.tittel")}
            </Heading>
            <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
        </GuidePanel>
    );
};
