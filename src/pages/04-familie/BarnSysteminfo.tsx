import {useTranslation} from "react-i18next";
import {useAnsvar} from "../../lib/hooks/data/useAnsvar";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {FullName} from "../01-personalia/FulltNavn";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {LocalizedYesNo} from "../../lib/components/LocalizedYesNo";
import * as React from "react";

export const BarnSysteminfo = ({barnIndex}: {barnIndex: number}) => {
    const {t} = useTranslation("skjema");
    const {ansvar} = useAnsvar(barnIndex);
    if (!ansvar) return null;

    return (
        <Systeminfo>
            <SysteminfoItem label={t("kontakt.system.personalia.navn")}>
                <FullName name={ansvar.barn.navn} />
            </SysteminfoItem>
            <SysteminfoItem label={t("familierelasjon.fodselsdato")}>
                <LocalizedDate date={ansvar.barn.fodselsdato} />
            </SysteminfoItem>
            <SysteminfoItem label={t("familierelasjon.samme_folkeregistrerte_adresse")}>
                <LocalizedYesNo value={ansvar.erFolkeregistrertSammen} />
            </SysteminfoItem>
        </Systeminfo>
    );
};
