import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentTelefonnummer} from "../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const TelefonShow = ({onEdit}: {onEdit?: () => void}) => {
    const {expectOK} = useAlgebraic(useHentTelefonnummer(useBehandlingsId()));
    const {t} = useTranslation();

    return expectOK(({systemverdi, brukerutfyltVerdi, brukerdefinert}) => {
        if (brukerdefinert && brukerutfyltVerdi)
            return <TelefonShowBrukerdefinert brukerutfyltVerdi={brukerutfyltVerdi} onEdit={onEdit} />;
        if (systemverdi?.length) return <TelefonShowFraKRR systemverdi={systemverdi} onEdit={onEdit} />;

        if (!onEdit)
            return (
                <SysteminfoItem as="div" label={"Telefonnummer"}>
                    {t("kontakt.telefon.feilmelding")}
                </SysteminfoItem>
            );
        return (
            <>
                {t("kontakt.system.telefoninfo.ingeninfo")} <br />
                {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
            </>
        );
    });
};
