import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import * as React from "react";
import {parsePhoneNumber} from "libphonenumber-js";
import {BodyShort} from "@navikt/ds-react";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const TelefonShowFraKRR = ({systemverdi, onEdit}: {systemverdi: string; onEdit?: () => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    const telefonNummer = systemverdi && parsePhoneNumber(systemverdi);

    return (
        <div>
            <SysteminfoItem as="div">{telefonNummer && telefonNummer.formatInternational()}</SysteminfoItem>
            <BodyShort className={"pt-2"}>{t("telefoninfo.infotekst.tekst")}</BodyShort>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};
