import {useTranslation} from "react-i18next";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import * as React from "react";

export const EktefellerPlikterForsorge = () => {
    const {t} = useTranslation("skjema");

    return (
        <Alert variant={"warning"} className={"mb-4"}>
            <Heading level={"4"} size={"small"} spacing>
                {t("system.familie.sivilstatus.informasjonspanel.tittel")}
            </Heading>
            <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
        </Alert>
    );
};
