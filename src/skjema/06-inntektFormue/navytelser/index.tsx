import * as React from "react";
import Lesmerpanel from "nav-frontend-lesmerpanel";

import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Dato from "../../../nav-soknad/components/tidspunkt/Dato";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {Detail, Heading, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const NavYtelserView = () => {
    const {t, i18n} = useTranslation("skjema");

    const {soknadsdata} = useSoknadsdata(SoknadsSti.INNTEKT_SYSTEMDATA);

    const {systeminntekter} = soknadsdata.inntekt.systemdata;
    const {utbetalingerFraNavFeilet} = soknadsdata.inntekt.systemdata;
    const restStatus = soknadsdata.restStatus.inntekt.systemdata;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    const harNavytelser: boolean = systeminntekter && systeminntekter.length > 0;
    const navYtelser: Systeminntekt[] = systeminntekter;

    const utbetaltMelding = <span>{t("utbetalinger.utbetaling.erutbetalt.label")}</span>;
    const navYtelserJsx: JSX.Element[] = navYtelser.map((utbetaling: Systeminntekt, index) => {
        const type: string = utbetaling.inntektType;
        const utbetalingsdato: string = utbetaling.utbetalingsdato;
        let formattedDato = null;
        if (utbetalingsdato && utbetalingsdato.length > 9) {
            formattedDato = <Dato>{utbetaling.utbetalingsdato}</Dato>;
        }
        const belop = fmtCurrency(i18n.language, utbetaling.belop);
        return (
            <div key={index} className="utbetaling blokk-s">
                <div>
                    <Detail>{type}</Detail>
                    <span className="verdi detaljeliste__verdi">{belop}</span>
                </div>
                {formattedDato && (
                    <div>
                        {utbetaltMelding} {formattedDato}
                    </div>
                )}
            </div>
        );
    });

    return (
        <div className={"skatt-wrapper"}>
            <Heading size="medium" level="2" spacing>
                {getIntlTextOrKey(t, "navytelser.sporsmal")}
            </Heading>
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && harNavytelser && (
                <Lesmerpanel
                    apneTekst={t("utbetalinger.infotekst.detaljer")}
                    lukkTekst={t("utbetalinger.infotekst.lukk")}
                    intro={<div>{t("navytelser.infotekst.tekst")}</div>}
                    border={true}
                >
                    <div className="utbetalinger">
                        {navYtelserJsx}
                        <Trans
                            t={t}
                            i18nKey={"utbetalinger.infotekst.tekst.v2"}
                            components={{
                                lenke: (
                                    <Link href={t("utbetalinger.infotekst.tekst.url")} target="_blank">
                                        {null}
                                    </Link>
                                ),
                            }}
                        />
                    </div>
                </Lesmerpanel>
            )}
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && !harNavytelser && (
                <div className={"ytelser_panel"}>
                    <div>{t("utbetalinger.ingen.true")}</div>
                </div>
            )}
            {utbetalingerFraNavFeilet && (
                <div className={"ytelser_panel"}>
                    <div>{t("utbetalinger.kontaktproblemer")}</div>
                </div>
            )}

            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export default NavYtelserView;
