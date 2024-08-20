import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import * as React from "react";
import {parsePhoneNumber} from "libphonenumber-js";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const TelefonShowBrukerdefinert = ({
    brukerutfyltVerdi,
    onEdit,
}: {
    brukerutfyltVerdi?: string;
    onEdit?: () => void;
}) => {
    const telefonNummer = brukerutfyltVerdi && parsePhoneNumber(brukerutfyltVerdi);

    return (
        <div>
            <SysteminfoItem>{telefonNummer && telefonNummer.formatInternational()}</SysteminfoItem>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};
