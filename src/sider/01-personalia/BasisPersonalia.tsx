import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentBasisPersonalia} from "../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Heading} from "@navikt/ds-react";

export const BasisPersonalia = () => {
    const {expectOK} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const {t} = useTranslation("skjema");
    return expectOK(({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
        <section aria-labelledby={"basispersonalia-heading"}>
            <Heading id="basispersonalia-heading" level={"3"} size={"small"} spacing>
                {t("kontakt.system.personalia.sporsmal")}
            </Heading>
            <Systeminfo>
                <SysteminfoItem as="div" label={t("kontakt.system.personalia.navn")}>
                    {navn?.fulltNavn}
                </SysteminfoItem>
                <SysteminfoItem as="div" label={t("kontakt.system.personalia.fnr")}>
                    {formatFodselsnummer(fodselsnummer ?? "")}
                </SysteminfoItem>
                <SysteminfoItem as="div" label={t("kontakt.system.personalia.statsborgerskap")}>
                    {statsborgerskap}
                </SysteminfoItem>
                <BodyShort className={"pt-3"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
            </Systeminfo>
        </section>
    ));
};
