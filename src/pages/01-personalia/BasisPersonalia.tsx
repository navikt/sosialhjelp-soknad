import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentBasisPersonalia} from "../../generated/client/basis-personalia-ressurs/basis-personalia-ressurs";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Heading} from "@navikt/ds-react";
import {FullName} from "./FulltNavn";

export const BasisPersonaliaData = () => {
    const {expectOK} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const {t} = useTranslation("skjema");
    return expectOK(({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
        <Systeminfo>
            <SysteminfoItem label={t("kontakt.system.personalia.navn")}>
                <FullName name={navn} />
            </SysteminfoItem>
            <SysteminfoItem label={t("kontakt.system.personalia.fnr")}>
                {formatFodselsnummer(fodselsnummer ?? "")}
            </SysteminfoItem>
            <SysteminfoItem label={t("kontakt.system.personalia.statsborgerskap")}>{statsborgerskap}</SysteminfoItem>
            <BodyShort className={"pt-3"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
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
