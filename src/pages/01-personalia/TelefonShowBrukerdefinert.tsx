import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import * as React from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {PencilWritingIcon} from "@navikt/aksel-icons";
import {parsePhoneNumber} from "libphonenumber-js";

export const TelefonShowBrukerdefinert = ({
    brukerutfyltVerdi,
    onEdit,
}: {
    brukerutfyltVerdi?: string;
    onEdit?: () => void;
}) => {
    const {t} = useTranslation("skjema");
    const telefonNummer = brukerutfyltVerdi && parsePhoneNumber(brukerutfyltVerdi);

    return (
        <li className={"flex flex-row place-content-between"}>
            <div>
                <SysteminfoItem>{telefonNummer && telefonNummer.formatInternational()}</SysteminfoItem>
            </div>
            {onEdit && (
                <div className={"flex flex-row items-center navds-link pr-3"}>
                    <PencilWritingIcon />
                    <LinkButton onClick={onEdit} data-testid="telefon-endreknapp">
                        {t("kontakt.system.telefon.endreknapp.label")}
                    </LinkButton>
                </div>
            )}
        </li>
    );
};
