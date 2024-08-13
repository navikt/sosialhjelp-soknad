import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentTelefonnummer} from "../../generated/client/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import {LinkButton} from "../../lib/components/LinkButton";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {PencilWritingIcon} from "@navikt/aksel-icons";

export const TelefonShow = ({onEdit}: {onEdit?: () => void}) => {
    const {expectOK} = useAlgebraic(useHentTelefonnummer(useBehandlingsId()));
    const {t} = useTranslation();

    return expectOK(({systemverdi, brukerutfyltVerdi, brukerdefinert}) => {
        if (brukerdefinert && brukerutfyltVerdi)
            return <TelefonShowBrukerdefinert brukerutfyltVerdi={brukerutfyltVerdi} onEdit={onEdit} />;
        if (systemverdi?.length) return <TelefonShowFraKRR systemverdi={systemverdi} onEdit={onEdit} />;

        if (!onEdit) return <SysteminfoItem label={"Telefonnummer"}>{t("kontakt.telefon.feilmelding")}</SysteminfoItem>;
        return (
            <li>
                {t("kontakt.system.telefoninfo.ingeninfo")} <br />
                <div className={"flex flex-row items-center navds-link"}>
                    {onEdit && (
                        <>
                            <PencilWritingIcon />
                            <LinkButton onClick={onEdit}>{t("kontakt.telefon.oppgi")}</LinkButton>
                        </>
                    )}
                </div>
            </li>
        );
    });
};
