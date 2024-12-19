import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {BodyShort} from "@navikt/ds-react";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const KontonrShowBrukerdefinert = ({onEdit}: {onEdit?: () => void}) => {
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));
    const {t} = useTranslation("skjema");

    return expectOK(({brukerutfyltVerdi}) => (
        <div className={"flex flex-row place-content-between"}>
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <SysteminfoItem as="div" label={t(`kontakt.kontonummer.sporsmal`)}>
                    {formatKontonummer(brukerutfyltVerdi ?? "")}
                </SysteminfoItem>
            </div>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    ));
};
export const KontonrShowSysteminfo = ({onEdit}: {onEdit?: () => void}) => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({systemverdi}) => (
        <div>
            <SysteminfoItem as="div">{formatKontonummer(systemverdi ?? "")}</SysteminfoItem>
            <BodyShort className={"pt-2"}>{t("kontakt.system.kontonummer.infotekst.tekst")}</BodyShort>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </div>
    ));
};

export const KontonrShow = ({onEdit}: {onEdit?: () => void}) => {
    const {t} = useTranslation("skjema");

    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerdefinert, systemverdi, brukerutfyltVerdi, harIkkeKonto}) => {
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

        if (brukerdefinert && brukerutfyltVerdi) return <KontonrShowBrukerdefinert onEdit={onEdit} />;

        if (systemverdi) return <KontonrShowSysteminfo onEdit={onEdit} />;

        return (
            <div>
                {t("kontakt.kontonummer.ingeninfo")} <br />
                {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
            </div>
        );
    });
};
