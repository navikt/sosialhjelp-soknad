import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import {useHentKontonummer} from "../../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {Detail} from "@navikt/ds-react";

export const KontonrShowBrukerdefinert = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.kontonummer"});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerutfyltVerdi}) => (
        <>
            <Detail spacing>{t("infotekst.tekst")}</Detail>
            <Systeminfo>
                <SysteminfoItem label={t(`label`)}>{formatKontonummer(brukerutfyltVerdi ?? "")}</SysteminfoItem>
            </Systeminfo>
        </>
    ));
};

export const KontonrShowSysteminfo = () => {
    const {t} = useTranslation("skjema", {keyPrefix: ""});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({systemverdi}) => (
        <>
            <Detail spacing>{t("kontakt.system.personalia.infotekst.tekst")}</Detail>
            <Systeminfo>
                <SysteminfoItem label={t(`kontakt.kontonummer.label`)}>
                    {formatKontonummer(systemverdi ?? "")}
                </SysteminfoItem>
            </Systeminfo>
        </>
    ));
};
export const KontonrShow = () => {
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerdefinert, systemverdi, brukerutfyltVerdi, harIkkeKonto}) => {
        if (harIkkeKonto) return <div>Intet kontonummer</div>;

        if (brukerdefinert && brukerutfyltVerdi) return <KontonrShowBrukerdefinert />;

        if (systemverdi) return <KontonrShowSysteminfo />;

        return <div>Ingen opplysninger om bankkonto</div>;
    });
};
