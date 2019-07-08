import * as React from "react";
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedNumber,
    injectIntl,
    InjectedIntlProps
} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {SkjemaGruppe} from "nav-frontend-skjema";
import EkspanderbartpanelBase from "nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base";
import {Panel} from "nav-frontend-paneler";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

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
            const belop = <FormattedNumber value={utbetaling.belop} minimumFractionDigits={2}/>;
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

        const harNavytelser: boolean = systeminntekter && systeminntekter.length > 0;
        const navYtelser: Systeminntekt[] = systeminntekter;

        const utbetaltMelding = <span><FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/></span>;
        const navYtelserJsx: JSX.Element[] = navYtelser.map((utbetaling: Systeminntekt, index) => {
            const type: string = utbetaling.inntektType;
            const utbetalingsdato: string = utbetaling.utbetalingsdato;
            let formattedDato = null;
            if (utbetalingsdato && utbetalingsdato.length > 9) {
                formattedDato = <FormattedDate value={utbetaling.utbetalingsdato}/>
            }
            const belop = <FormattedNumber value={utbetaling.belop} minimumFractionDigits={2}/>;
            return (
                <div key={index} className="utbetaling blokk-s">
                    <div><h4 className="blokk-null">{type}</h4><span
                        className="verdi detaljeliste__verdi">{belop}</span></div>
                    {formattedDato && (<div>{utbetaltMelding} {formattedDato}</div>)}
                </div>
            );
        });


        const tittel: JSX.Element = <h4><FormattedMessage id="navytelser.sporsmal"/></h4>;

        return (
            <SkjemaGruppe className={"skjema-sporsmal"}>
                {!visAnimerteStreker && harNavytelser && (
                    <EkspanderbartpanelBase
                        heading={
                            <div>
                                {tittel}
                                <FormattedHTMLMessage id={"navytelser.infotekst.tekst"}/>
                            </div>
                        }
                        border={true}
                        ariaTittel={this.props.intl.formatMessage({id: "navytelser.infotekst.tekst"})}
                    >
                        <div className="utbetalinger">
                            {navYtelserJsx}
                            <FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
                        </div>
                    </EkspanderbartpanelBase>)
                }
                {!visAnimerteStreker && !harNavytelser && (
                    <Panel
                        border={true}
                        className={"ytelser_panel"}
                    >
                        <div>
                            <h4>{tittel}</h4>
                            <FormattedMessage id="utbetalinger.ingen.true"/>
                        </div>
                    </Panel>)
                }

                {visAnimerteStreker &&
                <TextPlaceholder lines={3}/>
                }
            </SkjemaGruppe>
        )
    }
}

export default connectSoknadsdataContainer(injectIntl(NavYtelserView));

