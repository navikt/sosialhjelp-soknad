import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentBasisPersonalia} from "../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {Heading} from "@navikt/ds-react";
import {FullName} from "./FulltNavn";

export const BasisPersonaliaData = () => {
    const {expectOK} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system.personalia"});
    return expectOK(({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
        <Systeminfo>
            <SysteminfoItem commentAbove={t("infotekst.tekst")} label={t("navn")}>
                <FullName name={navn} />
            </SysteminfoItem>
            <SysteminfoItem label={t("fnr")}>{formatFodselsnummer(fodselsnummer ?? "")}</SysteminfoItem>
            <SysteminfoItem label={t("statsborgerskap")}>{statsborgerskap}</SysteminfoItem>
        </Systeminfo>
    ));
};

export const BasisPersonalia = () => {
    const {t} = useTranslation("skjema");
    return (
        <div className={"space-y-2"}>
            <Heading level={"3"} size={"small"}>
                {t("kontakt.system.personalia.sporsmal")}
            </Heading>
            <BasisPersonaliaData />
        </div>
    );
};
