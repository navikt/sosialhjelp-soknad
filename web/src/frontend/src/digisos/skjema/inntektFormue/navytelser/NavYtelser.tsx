import * as React from "react";
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedNumber,
    injectIntl,
    InjectedIntlProps
} from "react-intl";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema/index";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

const FAKTUM_KEY_NAV_YTELSER = "navytelser";

class NavYtelserView extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.INNTEKT_SYSTEMDATA);
    }

    renderUtbetalinger(utbetalinger: Systeminntekt[]) {
        if (utbetalinger == null || utbetalinger.length === 0) {
            return <FormattedMessage id="utbetalinger.ingen.true"/>;
        }
        const utbetaltMelding = <span><FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/></span>;
        const utbetalingerView = utbetalinger.map((utbetaling, index) => {
            const type: string = utbetaling.inntektType;
            const utbetalingsdato: string = utbetaling.utbetalingsdato;
            let formattedDato = null;
            if (utbetalingsdato && utbetalingsdato.length > 9) {
                formattedDato = <FormattedDate value={utbetaling.utbetalingsdato}/>
            }
            const belop = <FormattedNumber value={utbetaling.belop} format="decimal" minimumFractionDigits={2}/>;
            return (
                <div key={index} className="utbetaling blokk-s">
                    <div>{type}<span className="verdi detaljeliste__verdi">{belop}</span></div>
                    {formattedDato && (<div>{utbetaltMelding} {formattedDato}</div>)}
                </div>
            );
        });
        return utbetalingerView;
    }

    render() {
        const {soknadsdata} = this.props;
        const {systeminntekter} = soknadsdata.inntekt.systemdata;
        const restStatus = soknadsdata.restStatus.inntekt.systemdata;
        const visAnimerteStreker = restStatus !== REST_STATUS.OK;
        const harUtbetalinger: boolean = systeminntekter && systeminntekter.length > 0;

        return (
            <Sporsmal
                faktumKey= { FAKTUM_KEY_NAV_YTELSER + ".tittel" }
                sprakNokkel={FAKTUM_KEY_NAV_YTELSER}
                stil="system"
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                visLedetekst={true}
            >
                {!visAnimerteStreker &&
                <SysteminfoMedSkjema>
                    {harUtbetalinger &&
                    <div className="utbetalinger">
                        {this.renderUtbetalinger(systeminntekter)}
                        <FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
                    </div>
                    }
                    {!harUtbetalinger &&
                    <FormattedHTMLMessage id="utbetalinger.ingen.true"/>
                    }
                </SysteminfoMedSkjema>

                }
                {visAnimerteStreker &&
                <TextPlaceholder lines={3}/>
                }
            </Sporsmal>
        )
    }
}

export default connectSoknadsdataContainer(injectIntl(NavYtelserView));

