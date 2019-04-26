import * as React from "react";
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedNumber,
    injectIntl,
    InjectedIntlProps
} from "react-intl";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema/index";
import {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";

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
            const formattedDato = <FormattedDate value={utbetaling.utbetalingsdato}/>
            const belop = <FormattedNumber value={utbetaling.belop} style="decimal" minimumFractionDigits={2}/>;

            return (
                <div key={index} className="utbetaling blokk-s">
                    <div>{type}<span className="verdi detaljeliste__verdi">{belop}</span></div>
                    <div>{utbetaltMelding} {formattedDato}</div>
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

        if (!visAnimerteStreker) {
            return (
                <SporsmalFaktum faktumKey="navytelser" style="system" legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    <SysteminfoMedSkjema>
                        <h4 className="skjema-sporsmal__infotekst__tittel">
                            <FormattedMessage id="utbetalinger.sporsmal"/>
                        </h4>
                        { harUtbetalinger &&
                        <div className="utbetalinger">
                            {this.renderUtbetalinger(systeminntekter)}
                            <FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
                        </div>
                        }
                        {!harUtbetalinger &&
                            <FormattedHTMLMessage id="utbetalinger.ingen.true"/>
                        }
                    </SysteminfoMedSkjema>
                </SporsmalFaktum>
            )
        }
        return (
            <SporsmalFaktum faktumKey="navytelser" style="system" legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                {visAnimerteStreker && (
                    <TextPlaceholder lines={3}/>
                )}
            </SporsmalFaktum>
        );
    }
}

export default connectSoknadsdataContainer(injectIntl(NavYtelserView));

