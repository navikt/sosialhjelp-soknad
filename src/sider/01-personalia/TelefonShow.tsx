import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

interface Props {
    onEdit?: () => void;
    telefonnummerBruker?: string;
    telefonnummerRegister?: string;
}

export const TelefonShow = ({onEdit, telefonnummerBruker, telefonnummerRegister}: Props) => {
    const {t} = useTranslation();

    if (telefonnummerBruker)
        return <TelefonShowBrukerdefinert brukerutfyltVerdi={telefonnummerBruker} onEdit={onEdit} />;
    if (telefonnummerRegister?.length) return <TelefonShowFraKRR systemverdi={telefonnummerRegister} onEdit={onEdit} />;

    if (!onEdit)
        return (
            <SysteminfoItem as="div" label={"Telefonnummer"}>
                {t("kontakt.telefon.feilmelding")}
            </SysteminfoItem>
        );
    return (
        <div>
            {t("kontakt.system.telefoninfo.ingeninfo")} <br />
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};
