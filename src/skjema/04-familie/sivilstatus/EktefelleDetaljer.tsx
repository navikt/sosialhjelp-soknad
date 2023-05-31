import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {Alert, BodyShort, Detail, Heading} from "@navikt/ds-react";
import {useHentSivilstatus} from "../../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import cx from "classnames";

const EktefelleNavn = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "system.familie.sivilstatus"});
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle, erFolkeregistrertSammen, harDiskresjonskode}) =>
        ektefelle?.navn?.fulltNavn ? (
            <>
                <li>
                    <BodyShort spacing>{t("label")}:</BodyShort>
                </li>
                <SysteminfoItem label={t(`gift.ektefelle.navn`)}>{ektefelle?.navn?.fulltNavn}</SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem label={t(`gift.ektefelle.fodselsdato`)}>{ektefelle.fodselsdato}</SysteminfoItem>
                )}
                <SysteminfoItem label={t(`gift.ektefelle.folkereg`)}>
                    {erFolkeregistrertSammen ? "Ja" : "Nei"}
                </SysteminfoItem>
            </>
        ) : null
    );
};

const EktefelleDetaljer = () => {
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    const {t} = useTranslation();
    return expectOK(({harDiskresjonskode}) => (
        <div className="sivilstatus skjema-sporsmal space-y-4">
            <Sporsmal sporsmal={t("system.familie.sivilstatus.sporsmal")} stil="system">
                <Systeminfo>
                    <li>
                        <Detail className={cx("opacity-90 pb-1")}>{t("system.familie.sivilstatus")}</Detail>{" "}
                    </li>
                    {harDiskresjonskode ? t("system.familie.sivilstatus.ikkeTilgang.label") : <EktefelleNavn />}
                </Systeminfo>
            </Sporsmal>
            {!harDiskresjonskode && (
                <Alert variant={"warning"}>
                    <Heading level={"2"} size={"small"} spacing>
                        {t("system.familie.sivilstatus.informasjonspanel.tittel")}
                    </Heading>
                    <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
                </Alert>
            )}
        </div>
    ));
};

export default EktefelleDetaljer;
