import * as React from "react";
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedNumber, useIntl,
} from "react-intl";
import {Panel} from "nav-frontend-paneler";
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

const NavYtelserView = () => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    useEffect(() => {
        if (behandlingsId) {
            dispatch(
                hentSoknadsdata(behandlingsId, SoknadsSti.INNTEKT_SYSTEMDATA)
            );
        }
    }, [behandlingsId, dispatch]);

    const {systeminntekter} = soknadsdata.inntekt.systemdata;
    const {utbetalingerFraNavFeilet} = soknadsdata.inntekt.systemdata;
    const restStatus = soknadsdata.restStatus.inntekt.systemdata;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    const harNavytelser: boolean =
        systeminntekter && systeminntekter.length > 0;
    const navYtelser: Systeminntekt[] = systeminntekter;

    const utbetaltMelding = (
        <span>
            <FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label" />
        </span>
    );
    const navYtelserJsx: JSX.Element[] = navYtelser.map(
        (utbetaling: Systeminntekt, index) => {
            const type: string = utbetaling.inntektType;
            const utbetalingsdato: string = utbetaling.utbetalingsdato;
            let formattedDato = null;
            if (utbetalingsdato && utbetalingsdato.length > 9) {
                formattedDato = <Dato tidspunkt={utbetaling.utbetalingsdato} />;
            }
            const belop = (
                <FormattedNumber
                    value={utbetaling.belop}
                    minimumFractionDigits={2}
                />
            );
            return (
                <div key={index} className="utbetaling blokk-s">
                    <div>
                        <h4 className="blokk-null">{type}</h4>
                        <span className="verdi detaljeliste__verdi">
                            {belop}
                        </span>
                    </div>
                    {formattedDato && (
                        <div>
                            {utbetaltMelding} {formattedDato}
                        </div>
                    )}
                </div>
            );
        }
    );

    return (
        <div className={"skatt-wrapper"}>
            <h2>{getIntlTextOrKey(intl, "navytelser.titel")}</h2>
            {!visAnimerteStreker && !utbetalingerFraNavFeilet && harNavytelser && (
                <Lesmerpanel
                    apneTekst={"Se detaljer"}
                    lukkTekst={"Lukk"}
                    intro={
                        <div>
                            <FormattedHTMLMessage
                                id={"navytelser.infotekst.tekst"}
                            />
                        </div>
                    }
                    border={true}
                >
                    <div className="utbetalinger">
                        {navYtelserJsx}
                        <FormattedHTMLMessage id="utbetalinger.infotekst.tekst" />
                    </div>
                </Lesmerpanel>
            )}
            {!visAnimerteStreker &&
                !utbetalingerFraNavFeilet &&
                !harNavytelser && (
                    <Panel border={true} className={"ytelser_panel"}>
                        <div>
                            <FormattedMessage id="utbetalinger.ingen.true" />
                        </div>
                    </Panel>
                )}
            {utbetalingerFraNavFeilet && (
                <Panel border={true} className={"ytelser_panel"}>
                    <div>
                        <FormattedMessage id="utbetalinger.kontaktproblemer" />
                    </div>
                </Panel>
            )}

            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export default NavYtelserView;
