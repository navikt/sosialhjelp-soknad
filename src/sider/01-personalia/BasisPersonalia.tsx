import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Loader} from "@navikt/ds-react";
import {UseQueryResult} from "@tanstack/react-query";
import {PersonaliaDto} from "../../generated/new/model/personaliaDto.ts";

export const BasisPersonalia = ({data}: UseQueryResult<PersonaliaDto>) => {
    const {t} = useTranslation("skjema");
    return !data ? (
        <Loader />
    ) : (
        <Systeminfo>
            <SysteminfoItem as="div" label={t("kontakt.system.personalia.navn")}>
                {data.navn?.fulltNavn}
            </SysteminfoItem>
            <SysteminfoItem as="div" label={t("kontakt.system.personalia.fnr")}>
                {formatFodselsnummer(data.fodselsnummer ?? "")}
            </SysteminfoItem>
            <SysteminfoItem as="div" label={t("kontakt.system.personalia.statsborgerskap")}>
                {data.statsborgerskap}
            </SysteminfoItem>
            <BodyShort className={"pt-3"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
        </Systeminfo>
    );
};
