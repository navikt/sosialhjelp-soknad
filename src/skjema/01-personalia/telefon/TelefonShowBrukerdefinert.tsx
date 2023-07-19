import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";
import * as React from "react";
import {strip47} from "./Telefon";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

export const TelefonShowBrukerdefinert = ({
    brukerutfyltVerdi,
    onEdit,
}: {
    brukerutfyltVerdi?: string;
    onEdit?: () => void;
}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    return (
        <>
            <SysteminfoItem comment={t("telefon.oppgitt")} label={t("telefon.label")}>
                {brukerutfyltVerdi && formatTelefonnummer(strip47(brukerutfyltVerdi))}
            </SysteminfoItem>
            {onEdit && <LinkButton onClick={onEdit}>{t("telefon.endre")}</LinkButton>}
        </>
    );
};
