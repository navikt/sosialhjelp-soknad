import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {BodyShort} from "@navikt/ds-react";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";
import {useIsNyDatamodell} from "../../generated/soknad-ressurs/soknad-ressurs.ts";
import {useGetKontonummer} from "../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";

interface Props {
    onEdit?: () => void;
    verdi?: string | null;
}

export const KontonrShowBrukerdefinert = ({onEdit, verdi}: Props) => {
    const {t} = useTranslation("skjema");

    return (
        <li className={"flex flex-row place-content-between"}>
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <SysteminfoItem as="div" label={t(`kontakt.kontonummer.sporsmal`)}>
                    {formatKontonummer(verdi ?? "")}
                </SysteminfoItem>
            </div>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </li>
    );
};
export const KontonrShowSysteminfo = ({onEdit, verdi}: Props) => {
    const {t} = useTranslation("skjema");
    return (
        <li>
            <SysteminfoItem as="div">{formatKontonummer(verdi ?? "")}</SysteminfoItem>
            <BodyShort className={"pt-2"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
            {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
        </li>
    );
};

export const KontonrShow = ({onEdit}: Omit<Props, "verdi">) => {
    const {t} = useTranslation("skjema");

    const behandlingsId = useBehandlingsId();
    const {data: isNyDatamodellData, isPending} = useIsNyDatamodell(behandlingsId);
    const {expectOK: expectOkNew} = useAlgebraic(
        useGetKontonummer(behandlingsId, {query: {enabled: isNyDatamodellData === true}})
    );
    const {expectOK: expectOkOld} = useAlgebraic(
        useHentKontonummer(behandlingsId, {query: {enabled: isNyDatamodellData === false}})
    );

    if (isPending) {
        return <TextPlaceholder lines={1} />;
    }
    if (isNyDatamodellData === false) {
        return expectOkOld(({brukerdefinert, systemverdi, brukerutfyltVerdi, harIkkeKonto}) => {
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

            if (brukerdefinert && brukerutfyltVerdi)
                return <KontonrShowBrukerdefinert verdi={brukerutfyltVerdi} onEdit={onEdit} />;

            if (systemverdi) return <KontonrShowSysteminfo verdi={systemverdi} onEdit={onEdit} />;

            return (
                <li>
                    {t("kontakt.kontonummer.ingeninfo")} <br />
                    {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
                </li>
            );
        });
    } else if (isNyDatamodellData === true) {
        return expectOkNew(({kontonummerBruker, harIkkeKonto, kontonummerRegister}) => {
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

            if (kontonummerBruker) return <KontonrShowBrukerdefinert onEdit={onEdit} verdi={kontonummerBruker} />;

            if (kontonummerRegister) return <KontonrShowSysteminfo onEdit={onEdit} verdi={kontonummerRegister} />;

            return (
                <li>
                    {t("kontakt.kontonummer.ingeninfo")} <br />
                    {onEdit && <PersonaliaEditKnapp onClick={onEdit} />}
                </li>
            );
        });
    } else {
        return null;
    }
};
