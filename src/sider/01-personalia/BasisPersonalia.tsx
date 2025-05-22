import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort} from "@navikt/ds-react";
import {useGetBasisPersonalia} from "../../generated/new/basis-personalia-controller/basis-personalia-controller.ts";

export const BasisPersonalia = () => {
    const {expectOK} = useAlgebraic(useGetBasisPersonalia(useSoknadId()));
    const {t} = useTranslation("skjema");
    return expectOK(({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
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
    ));
};
