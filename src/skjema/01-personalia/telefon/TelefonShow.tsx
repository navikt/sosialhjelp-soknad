import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import {useHentTelefonnummer} from "../../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import * as React from "react";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
// TODO: Hardkodet i18n-streng

export const TelefonShow = ({onEdit}: {onEdit?: () => void}) => {
    const {expectOK} = useAlgebraic(useHentTelefonnummer(useBehandlingsId()));
    const {t} = useTranslation();

    return expectOK(({systemverdi, brukerutfyltVerdi, brukerdefinert}) => {
        if (brukerdefinert && brukerutfyltVerdi)
            return <TelefonShowBrukerdefinert brukerutfyltVerdi={brukerutfyltVerdi} onEdit={onEdit} />;
        if (systemverdi?.length) return <TelefonShowFraKRR systemverdi={systemverdi} onEdit={onEdit} />;

        if (!onEdit) return <SysteminfoItem label={"Telefonnummer"}>Intet nummer oppgitt</SysteminfoItem>;
        return (
            <>
                {t("kontakt.system.telefoninfo.ingeninfo")}
                <LinkButton onClick={onEdit}>{t("kontakt.telefon.oppgi")}</LinkButton>
            </>
        );
    });
};
