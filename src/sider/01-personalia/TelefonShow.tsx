import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentTelefonnummer} from "../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";
import {useIsNyDatamodell} from "../../generated/soknad-ressurs/soknad-ressurs.ts";
import {useGetTelefonnummer} from "../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";

interface Props {
    onEdit?: () => void;
    systemverdi?: string;
    brukerutfyltVerdi?: string | null;
    brukerdefinert: boolean;
}

const Telefonnummer = ({systemverdi, brukerutfyltVerdi, brukerdefinert, onEdit}: Props) => {
    const {t} = useTranslation("skjema");
    if (brukerdefinert && brukerutfyltVerdi)
        return <TelefonShowBrukerdefinert brukerutfyltVerdi={brukerutfyltVerdi} onEdit={onEdit} />;
    if (systemverdi?.length) return <TelefonShowFraKRR systemverdi={systemverdi} onEdit={onEdit} />;

    if (!onEdit) return <SysteminfoItem label={"Telefonnummer"}>{t("kontakt.telefon.feilmelding")}</SysteminfoItem>;
    return (
        <li>
            {t("kontakt.system.telefoninfo.ingeninfo")} <br />
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </li>
    );
};

export const TelefonShow = ({onEdit}: {onEdit?: () => void}) => {
    const behandlingsId = useBehandlingsId();
    const {data: isNyDatamodell, isPending} = useIsNyDatamodell(behandlingsId);
    const {expectOK: expectOkNew} = useAlgebraic(
        useGetTelefonnummer(behandlingsId, {query: {enabled: isNyDatamodell === true}})
    );

    const {expectOK: expectOkOld} = useAlgebraic(
        useHentTelefonnummer(behandlingsId, {query: {enabled: isNyDatamodell === false}})
    );

    if (isPending && isNyDatamodell !== undefined) {
        return <TextPlaceholder lines={1} />;
    }

    if (isNyDatamodell === true) {
        return expectOkNew((data) => (
            <Telefonnummer
                brukerdefinert={Boolean(data.telefonnummerBruker)}
                brukerutfyltVerdi={data.telefonnummerBruker}
                systemverdi={data.telefonnummerRegister}
                onEdit={onEdit}
            />
        ));
    } else if (isNyDatamodell === false) {
        return expectOkOld((data) => <Telefonnummer {...data} onEdit={onEdit} />);
    } else {
        return null;
    }
};
