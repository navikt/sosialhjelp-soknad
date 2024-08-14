import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {LinkButton} from "../../lib/components/LinkButton";
import {PencilWritingIcon} from "@navikt/aksel-icons";
import {BodyShort} from "@navikt/ds-react";

export const KontonrShowBrukerdefinert = ({onEdit}: {onEdit?: () => void}) => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerutfyltVerdi}) => (
        <li className={"flex flex-row place-content-between"}>
            <div>
                <SysteminfoItem as="div">{formatKontonummer(brukerutfyltVerdi ?? "")}</SysteminfoItem>
            </div>
            {onEdit && (
                <div className={"flex flex-row items-center navds-link pr-3"}>
                    <PencilWritingIcon />
                    <LinkButton onClick={onEdit} data-testid="kontonummer-endreknapp">
                        {t("kontakt.system.kontonummer.endreknapp.label")}
                    </LinkButton>
                </div>
            )}
        </li>
    ));
};
export const KontonrShowSysteminfo = ({onEdit}: {onEdit?: () => void}) => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({systemverdi}) => (
        <li className={"flex flex-row place-content-between"}>
            <div>
                <SysteminfoItem as="div">{formatKontonummer(systemverdi ?? "")}</SysteminfoItem>
                <BodyShort className={"pt-2"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
            </div>
            {onEdit && (
                <div className={"flex flex-row items-center navds-link pr-3"}>
                    <PencilWritingIcon />
                    <LinkButton onClick={onEdit} data-testid="kontonummer-endreknapp">
                        {t("kontakt.system.kontonummer.endreknapp.label")}
                    </LinkButton>
                </div>
            )}
        </li>
    ));
};

export const KontonrShow = ({onEdit}: {onEdit?: () => void}) => {
    const {t} = useTranslation("skjema");

    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerdefinert, systemverdi, brukerutfyltVerdi, harIkkeKonto}) => {
        if (harIkkeKonto)
            return (
                <>
                    <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                    <SysteminfoItem as="div" label={t(`kontakt.kontonummer.sporsmal`)}>
                        <span className={"italic"}> {t("kontakt.kontonummer.harikke.true")}</span>
                    </SysteminfoItem>
                </>
            );

        if (brukerdefinert && brukerutfyltVerdi) return <KontonrShowBrukerdefinert onEdit={onEdit} />;

        if (systemverdi) return <KontonrShowSysteminfo onEdit={onEdit} />;

        return (
            <li>
                {t("kontakt.kontonummer.ingeninfo")} <br />
                <div className={"flex flex-row items-center navds-link"}>
                    {onEdit && (
                        <>
                            <PencilWritingIcon />
                            <LinkButton onClick={onEdit}>{t("kontakt.kontonummer.oppgi")}</LinkButton>
                        </>
                    )}
                </div>
            </li>
        );
    });
};
