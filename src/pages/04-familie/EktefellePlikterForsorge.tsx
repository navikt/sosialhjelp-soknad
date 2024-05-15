import {useTranslation} from "react-i18next";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import * as React from "react";

export const EktefellerPlikterForsorge = () => {
    const {t} = useTranslation("skjema");

    return (
        <GuidePanel className={"xs:!-ml-10 mb-6"}>
            <Heading level={"4"} size={"small"} spacing>
                {t("system.familie.sivilstatus.informasjonspanel.tittel")}
            </Heading>
            <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
        </GuidePanel>
    );
};
