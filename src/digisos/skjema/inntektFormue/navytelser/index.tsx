import * as React from "react";
import {FormattedMessage, FormattedNumber, useIntl} from "react-intl";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import {UndertekstBold} from "nav-frontend-typografi";
import {Link} from "@navikt/ds-react";

const NavYtelserView = () => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.INNTEKT_SYSTEMDATA, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const {systeminntekter} = soknadsdata.inntekt.systemdata;
    const {utbetalingerFraNavFeilet} = soknadsdata.inntekt.systemdata;
    const restStatus = soknadsdata.restStatus.inntekt.systemdata;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    const harNavytelser: boolean = systeminntekter && systeminntekter.length > 0;
    const navYtelser: Systeminntekt[] = systeminntekter;

    const utbetaltMelding = (
        <span>
            <FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label" />
        </span>
    );
    const navYtelserJsx: JSX.Element[] = navYtelser.map((utbetaling: Systeminntekt, index) => {
        const type: string = utbetaling.inntektType;
        const utbetalingsdato: string = utbetaling.utbetalingsdato;
        let formattedDato = null;
        if (utbetalingsdato && utbetalingsdato.length > 9) {
            formattedDato = <Dato tidspunkt={utbetaling.utbetalingsdato} />;
        }
        const belop = <FormattedNumber value={utbetaling.belop} minimumFractionDigits={2} />;
        return (
            <div key={index} className="utbetaling blokk-s">
                <div>
                    <UndertekstBold className="blokk-null">{type}</UndertekstBold>
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
            <h2>{getIntlTextOrKey(intl, "navytelser.sporsmal")}</h2>
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && harNavytelser && (
                <Lesmerpanel
                    apneTekst={"Se detaljer"}
                    lukkTekst={"Lukk"}
                    intro={
                        <div>
                            <FormattedMessage id={"navytelser.infotekst.tekst"} />
                        </div>
                    }
                    border={true}
                >
                    <div className="utbetalinger">
                        {navYtelserJsx}
                        <FormattedMessage
                            id={"utbetalinger.infotekst.tekst.v2"}
                            values={{
                                a: (msg: string) => (
                                    <Link
                                        href={intl.formatMessage({id: "utbetalinger.infotekst.tekst.url"})}
                                        target="_blank"
                                    >
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </div>
                </Lesmerpanel>
            )}
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && !harNavytelser && (
                <div className={"ytelser_panel"}>
                    <div>
                        <FormattedMessage id="utbetalinger.ingen.true" />
                    </div>
                </div>
            )}
            {utbetalingerFraNavFeilet && (
                <div className={"ytelser_panel"}>
                    <div>
                        <FormattedMessage id="utbetalinger.kontaktproblemer" />
                    </div>
                </div>
            )}

            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export default NavYtelserView;
