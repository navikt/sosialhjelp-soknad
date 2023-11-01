import {useTranslation} from "react-i18next";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import {useHentSivilstatus} from "../../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {BodyShort, Detail} from "@navikt/ds-react";
import cx from "classnames";
import * as React from "react";
import LocalizedDate from "../../../components/LocalizedDate";

export const EktefellePersonaliaSystem = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "system.familie.sivilstatus"});
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle, erFolkeregistrertSammen, harDiskresjonskode}) =>
        ektefelle?.navn?.fulltNavn ? (
            <>
                <SysteminfoItem
                    comment={
                        <>
                            <Detail className={cx("opacity-90 pb-1")}>{t("system.familie.sivilstatus")}</Detail>{" "}
                            <BodyShort spacing>{t("label")}:</BodyShort>
                        </>
                    }
                    label={t(`gift.ektefelle.navn`)}
                >
                    {ektefelle?.navn?.fulltNavn}
                </SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem label={t(`gift.ektefelle.fodselsdato`)}>
                        <LocalizedDate date={ektefelle.fodselsdato} />
                    </SysteminfoItem>
                )}
                <SysteminfoItem label={t(`gift.ektefelle.folkereg`)}>
                    {erFolkeregistrertSammen ? t("gift.ektefelle.borsammen.true") : t("gift.ektefelle.borsammen.false")}
                </SysteminfoItem>
            </>
        ) : null
    );
};
