import {useTranslation} from "react-i18next";
import {Detail} from "@navikt/ds-react";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";
import {LinkButton} from "../../../../nav-soknad/components/linkButton/LinkButton";
import * as React from "react";
import {strip47} from "./Telefon";

export const TelefonShowFraKRR = ({systemverdi, onEdit}: {systemverdi: string; onEdit: () => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    return (
        <>
            <Detail spacing>{t("telefoninfo.infotekst.tekst")}</Detail>
            <Systeminfo>
                <SysteminfoItem label={t("telefon.label")}>
                    {systemverdi && formatTelefonnummer(strip47(systemverdi))}
                </SysteminfoItem>
            </Systeminfo>
            <LinkButton onClick={onEdit}>{t("telefon.endreknapp.label")}</LinkButton>
        </>
    );
};
