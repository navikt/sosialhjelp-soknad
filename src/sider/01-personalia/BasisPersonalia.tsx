import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Loader} from "@navikt/ds-react";
import {UseQueryResult} from "@tanstack/react-query";
import {PersonaliaDto} from "../../generated/new/model/personaliaDto.ts";

export const BasisPersonalia = ({data: personalia, isLoading}: UseQueryResult<PersonaliaDto, unknown>) => {
    const {t} = useTranslation("skjema");

    if (isLoading || !personalia) return <Loader />;

    const {navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"} = personalia;

    return (
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
    );
};
