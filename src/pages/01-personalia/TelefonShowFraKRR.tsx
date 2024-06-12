import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {LinkButton} from "../../lib/components/LinkButton";
import * as React from "react";
import {PencilWritingIcon} from "@navikt/aksel-icons";
import {parsePhoneNumber} from "libphonenumber-js";
import {BodyShort} from "@navikt/ds-react";

export const TelefonShowFraKRR = ({systemverdi, onEdit}: {systemverdi: string; onEdit?: () => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    const telefonNummer = systemverdi && parsePhoneNumber(systemverdi);

    return (
        <li className={"flex flex-row place-content-between"}>
            <div>
                <SysteminfoItem>{telefonNummer && telefonNummer.formatInternational()}</SysteminfoItem>
                <BodyShort className={"pt-2"}>{t("telefoninfo.infotekst.tekst")}</BodyShort>
            </div>
            {onEdit && (
                <div className={"flex flex-row items-center navds-link pr-3"}>
                    <PencilWritingIcon />
                    <LinkButton onClick={onEdit} data-testid="telefon-endreknapp">
                        {t("telefon.endreknapp.label")}
                    </LinkButton>
                </div>
            )}
        </li>
    );
};
