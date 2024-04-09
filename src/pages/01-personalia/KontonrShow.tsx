import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";

export const KontonrShowBrukerdefinert = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.kontonummer"});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({brukerutfyltVerdi}) => (
        <SysteminfoItem commentAbove={t("bruker")} label={t(`label`)}>
            {formatKontonummer(brukerutfyltVerdi ?? "")}
        </SysteminfoItem>
    ));
};

export const KontonrShowSysteminfo = () => {
    const {t} = useTranslation("skjema", {keyPrefix: ""});
    const {expectOK} = useAlgebraic(useHentKontonummer(useBehandlingsId()));

    return expectOK(({systemverdi}) => (
        <SysteminfoItem
            commentAbove={t("kontakt.system.personalia.infotekst.tekst")}
            label={t(`kontakt.kontonummer.label`)}
        >
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
                <SysteminfoItem
                    commentAbove={t("kontakt.kontonummer.bruker")}
                    label={t(`kontakt.kontonummer.sporsmal`)}
                >
                    <span className={"italic"}> {t("kontakt.kontonummer.harikke.true")}</span>
                </SysteminfoItem>
            );

        if (brukerdefinert && brukerutfyltVerdi) return <KontonrShowBrukerdefinert />;

        if (systemverdi) return <KontonrShowSysteminfo />;

        return <div>{t("kontakt.kontonummer.ingeninfo")}</div>;
    });
};
