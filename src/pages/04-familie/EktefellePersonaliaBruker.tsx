import {useTranslation} from "react-i18next";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentSivilstatus} from "../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {BodyShort} from "@navikt/ds-react";
import * as React from "react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {EktefelleFrontend} from "../../generated/model";
import {FullName} from "../01-personalia/FulltNavn";

export const EktefellePersonaliaBruker = ({ektefelle}: {ektefelle: EktefelleFrontend | undefined}) => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle, borSammenMed, harDiskresjonskode}) =>
        ektefelle?.navn ? (
            <>
                <SysteminfoItem
                    comment={<BodyShort spacing>{t("system.familie.sivilstatus.label")}:</BodyShort>}
                    label={t(`system.familie.sivilstatus.gift.ektefelle.navn`)}
                >
                    <FullName name={ektefelle.navn} />
                </SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem label={t(`system.familie.sivilstatus.gift.ektefelle.fodselsdato`)}>
                        <LocalizedDate date={ektefelle.fodselsdato} />
                    </SysteminfoItem>
                )}
                <SysteminfoItem label={t(`familie.sivilstatus.gift.borsammen.sporsmal`)}>
                    {borSammenMed ? t("avbryt.ja") : t("avbryt.nei")}
                </SysteminfoItem>
            </>
        ) : null
    );
};
