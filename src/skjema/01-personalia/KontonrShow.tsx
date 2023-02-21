import {useAlgebraic} from "../../lib/hooks/useAlgebraic";
import {useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../nav-soknad/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";

export const KontonrShowBrukerdefinert = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.kontonummer"});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerutfyltVerdi}) => (
        <SysteminfoItem comment={t("bruker")} label={t(`label`)}>
            {formatKontonummer(brukerutfyltVerdi ?? "")}
        </SysteminfoItem>
    ));
};

export const KontonrShowSysteminfo = () => {
    const {t} = useTranslation("skjema", {keyPrefix: ""});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({systemverdi}) => (
        <SysteminfoItem comment={t("kontakt.system.personalia.infotekst.tekst")} label={t(`kontakt.kontonummer.label`)}>
            {formatKontonummer(systemverdi ?? "")}
        </SysteminfoItem>
    ));
};
export const KontonrShow = () => {
    const {t} = useTranslation("skjema", {keyPrefix: ""});

    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerdefinert, systemverdi, brukerutfyltVerdi, harIkkeKonto}) => {
        if (harIkkeKonto)
            return (
                <SysteminfoItem comment={t("kontakt.kontonummer.bruker")} label={t(`kontakt.kontonummer.sporsmal`)}>
                    <span className={"italic"}> {t("kontakt.kontonummer.harikke.true")}</span>
                </SysteminfoItem>
            );

        if (brukerdefinert && brukerutfyltVerdi) return <KontonrShowBrukerdefinert />;

        if (systemverdi) return <KontonrShowSysteminfo />;

        return <div>Ingen opplysninger om bankkonto</div>;
    });
};
