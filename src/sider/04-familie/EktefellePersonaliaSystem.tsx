import {useTranslation} from "react-i18next";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import * as React from "react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {FullName} from "../01-personalia/FulltNavn";
import {LocalizedYesNo} from "../../lib/components/LocalizedYesNo";
import {BodyShort} from "@navikt/ds-react";
import {useGetSivilstand} from "../../generated/new/sivilstand-controller/sivilstand-controller.ts";

export const EktefellePersonaliaSystem = () => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useGetSivilstand(useSoknadId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle}) =>
        ektefelle?.navn ? (
            <>
                <BodyShort className={"pb-3"}>{t("system.familie.sivilstatus.label")} </BodyShort>
                <SysteminfoItem as="div" label={t(`system.familie.sivilstatus.gift.ektefelle.navn`)}>
                    <FullName name={ektefelle.navn} />
                </SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem as="div" label={t(`system.familie.sivilstatus.gift.ektefelle.fodselsdato`)}>
                        <LocalizedDate date={ektefelle.fodselsdato} />
                    </SysteminfoItem>
                )}
                <SysteminfoItem as="div" label={t(`system.familie.sivilstatus.gift.ektefelle.folkereg`)}>
                    <LocalizedYesNo value={ektefelle?.folkeregistrertMedEktefelle} />
                </SysteminfoItem>
                <BodyShort className={"pt-3"}>{t("system.familie.sivilstatus.stringValue")}</BodyShort>
            </>
        ) : null
    );
};
