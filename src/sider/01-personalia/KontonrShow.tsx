import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {BodyShort} from "@navikt/ds-react";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const KontonrShowBrukerdefinert = ({onEdit, kontonummer}: {onEdit?: () => void; kontonummer?: string}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className={"flex flex-row place-content-between"}>
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <SysteminfoItem as="div" label={t(`kontakt.kontonummer.sporsmal`)}>
                    {formatKontonummer(kontonummer ?? "")}
                </SysteminfoItem>
            </div>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};
export const KontonrShowSysteminfo = ({onEdit, kontonummer}: {onEdit?: () => void; kontonummer?: string}) => {
    const {t} = useTranslation("skjema");
    return (
        <div>
            <SysteminfoItem as="div">{formatKontonummer(kontonummer ?? "")}</SysteminfoItem>
            <BodyShort className={"pt-2"}>{t("kontakt.system.kontonummer.infotekst.tekst")}</BodyShort>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};

interface Props {
    onEdit?: () => void;
    harIkkeKonto?: boolean;
    kontonummer?: string;
    isBrukerUtfylt?: boolean;
}

export const KontonrShow = ({onEdit, harIkkeKonto, kontonummer, isBrukerUtfylt}: Props) => {
    const {t} = useTranslation("skjema");

    if (harIkkeKonto)
        return (
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <SysteminfoItem as="div">
                    <span className={"italic"}> {t("kontakt.kontonummer.harikke.true")}</span>
                </SysteminfoItem>
                {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
            </div>
        );

    if (isBrukerUtfylt && kontonummer) return <KontonrShowBrukerdefinert onEdit={onEdit} kontonummer={kontonummer} />;

    if (isBrukerUtfylt === false) return <KontonrShowSysteminfo onEdit={onEdit} kontonummer={kontonummer} />;

    return (
        <div>
            {t("kontakt.kontonummer.ingeninfo")} <br />
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    );
};
