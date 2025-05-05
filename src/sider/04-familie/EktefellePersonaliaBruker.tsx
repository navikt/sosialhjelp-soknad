import {useTranslation} from "react-i18next";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {BodyShort, Loader} from "@navikt/ds-react";
import * as React from "react";

import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {FullName} from "../../lib/components/FullName.tsx";
import {EktefelleDtoOrInput} from "../../lib/hooks/data/useSivilstatus.tsx";

interface Props {
    ektefelle: EktefelleDtoOrInput;
    isLoading?: boolean;
}

export const EktefellePersonaliaBruker = ({ektefelle, isLoading}: Props) => {
    const {t} = useTranslation("skjema");

    // FIXME: Handle the reverse case of this if clause
    return ektefelle?.navn ? (
        <div>
            <BodyShort className={"pb-3"}>
                {t("system.familie.sivilstatus.label")}
                {isLoading && <Loader />}
            </BodyShort>
            <SysteminfoItem as="div" label={t(`system.familie.sivilstatus.gift.ektefelle.navn`)}>
                <FullName name={ektefelle.navn} />
            </SysteminfoItem>
            {ektefelle?.fodselsdato && (
                <SysteminfoItem as="div" label={t(`system.familie.sivilstatus.gift.ektefelle.fodselsdato`)}>
                    <LocalizedDate date={ektefelle.fodselsdato} />
                </SysteminfoItem>
            )}
            <SysteminfoItem as="div" label={t(`familie.sivilstatus.gift.borsammen.sporsmal`)}>
                {ektefelle.folkeregistrertMedEktefelle ? t("avbryt.ja") : t("avbryt.nei")}
            </SysteminfoItem>
        </div>
    ) : null;
};
