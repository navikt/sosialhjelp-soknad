import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";
import {LinkButton} from "../../lib/components/LinkButton";
import * as React from "react";
import {strip47} from "./Telefon";

export const TelefonShowFraKRR = ({systemverdi, onEdit}: {systemverdi: string; onEdit?: () => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    return (
        <li>
            <SysteminfoItem comment={t("telefoninfo.infotekst.tekst")} label={t("telefon.label")}>
                {systemverdi && formatTelefonnummer(strip47(systemverdi))}
            </SysteminfoItem>
            {onEdit && (
                <LinkButton onClick={onEdit} data-testid="telefon-endreknapp">
                    {t("telefon.endreknapp.label")}
                </LinkButton>
            )}
        </li>
    );
};
