import * as React from "react";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import {useHentBasisPersonalia} from "../../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";

export const BasisPersonaliaData = () => {
    const {expectOK} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system.personalia"});
    return expectOK(({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
        <>
            <SysteminfoItem comment={t("infotekst.tekst")} label={t("navn")}>
                {navn?.fulltNavn}
            </SysteminfoItem>
            <SysteminfoItem label={t("fnr")}>{formatFodselsnummer(fodselsnummer ?? "")}</SysteminfoItem>
            <SysteminfoItem label={t("statsborgerskap")}>{statsborgerskap}</SysteminfoItem>
        </>
    ));
};
