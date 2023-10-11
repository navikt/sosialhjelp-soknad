import * as React from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {Detail, ExpansionCard, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import LocalizedDate from "../../../components/LocalizedDate";

const NavYtelserView = () => {
    const {t, i18n} = useTranslation("skjema");

    const {soknadsdata} = useSoknadsdata(SoknadsSti.INNTEKT_SYSTEMDATA);

    const {systeminntekter} = soknadsdata.inntekt.systemdata;
    const {utbetalingerFraNavFeilet} = soknadsdata.inntekt.systemdata;
    const restStatus = soknadsdata.restStatus.inntekt.systemdata;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    const harNavytelser: boolean = systeminntekter && systeminntekter.length > 0;

    const navYtelserJsx: JSX.Element[] = systeminntekter.map((utbetaling: Systeminntekt, index) => {
        const type: string = utbetaling.inntektType;
        const utbetalingsdato: string = utbetaling.utbetalingsdato;
        const formattedDato = utbetalingsdato?.length > 9 ? <LocalizedDate date={utbetalingsdato} /> : null;
        const belop = fmtCurrency(i18n.language, utbetaling.belop);
        return (
            <div key={index} className="utbetaling blokk-s">
                <div>
                    <Detail>{type}</Detail>
                    <span className="verdi detaljeliste__verdi">{belop}</span>
                </div>
                {formattedDato && (
                    <div>
                        <span>{t("utbetalinger.utbetaling.erutbetalt.label")}</span> {formattedDato}
                    </div>
                )}
            </div>
        );
    });

    return (
        <div className={"skatt-wrapper"}>
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && harNavytelser && (
                <ExpansionCard aria-label={t("utbetalinger.infotekst.detaljer")}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>{getIntlTextOrKey(t, "navytelser.sporsmal")}</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
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
                    </ExpansionCard.Content>
                </ExpansionCard>
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
