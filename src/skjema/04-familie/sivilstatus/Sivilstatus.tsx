import {Status} from "./FamilieTypes";
import * as React from "react";
import Underskjema from "../../../nav-soknad/components/underskjema";
import PersonSkjema from "./PersonSkjema";
import {useTranslation} from "react-i18next";
import {Alert, BodyShort, Heading, Radio, RadioGroup} from "@navikt/ds-react";
import {useSivilstatus} from "./useSivilstatus";

const Sivilstatus = () => {
    const {t} = useTranslation("skjema");
    const {sivilstatus, setSivilstatus} = useSivilstatus();

    return (
        <div>
            <Heading level={"2"} size={"medium"} spacing>
                {t("familie.sivilstatus.sporsmal")}
            </Heading>
            <RadioGroup legend={t("system.familie.sivilstatus.sporsmal")} value={sivilstatus} onChange={setSivilstatus}>
                <Radio value="gift">{t("familie.sivilstatus.gift")}</Radio>
                <Underskjema visible={sivilstatus === Status.GIFT} arrow={true}>
                    <PersonSkjema />
                </Underskjema>
                <Radio value="ugift">{t("familie.sivilstatus.ugift")}</Radio>
                <Radio value="samboer">{t("familie.sivilstatus.samboer")}</Radio>
                <Radio value="enke">{t("familie.sivilstatus.enke")}</Radio>
                <Radio value="skilt">{t("familie.sivilstatus.skilt")}</Radio>
                <Radio value="separert">{t("familie.sivilstatus.separert")}</Radio>
            </RadioGroup>
            {sivilstatus === Status.GIFT && (
                <Alert variant={"warning"}>
                    <Heading level={"4"} size={"small"} spacing>
                        {t("system.familie.sivilstatus.informasjonspanel.tittel")}
                    </Heading>
                    <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
                </Alert>
            )}
        </div>
    );
};

export default Sivilstatus;
