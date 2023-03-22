import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import * as React from "react";
import {strip47} from "./Telefon";

export const TelefonShowFraKRR = ({systemverdi, onEdit}: {systemverdi: string; onEdit?: () => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    return (
        <>
            <SysteminfoItem comment={t("telefoninfo.infotekst.tekst")} label={t("telefon.label")}>
                {systemverdi && formatTelefonnummer(strip47(systemverdi))}
            </SysteminfoItem>
            {onEdit && (
                <LinkButton onClick={onEdit} data-testid="telefon-endreknapp">
                    {t("telefon.endreknapp.label")}
                </LinkButton>
            )}
        </>
    );
};
