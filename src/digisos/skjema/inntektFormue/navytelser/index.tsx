import * as React from "react";
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedNumber,
    injectIntl
} from "react-intl";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {Systeminntekt} from "./navYtelserTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {Panel} from "nav-frontend-paneler";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {IntlProps} from "../../../../nav-soknad/utils";

type Props = SoknadsdataContainerProps & IntlProps;

class NavYtelserView extends React.Component<Props, {}> {

    componentDidMount() {
        const {behandlingsId} = this.props;
        if (behandlingsId){
            this.props.hentSoknadsdata(behandlingsId, SoknadsSti.INNTEKT_SYSTEMDATA);
        }
    }

    render() {
        const {soknadsdata} = this.props;
        const {systeminntekter} = soknadsdata.inntekt.systemdata;
        const {utbetalingerFraNavFeilet} = soknadsdata.inntekt.systemdata;
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
            <div className={"skatt-wrapper"}>
                {!visAnimerteStreker && !utbetalingerFraNavFeilet && harNavytelser && (
                    <Lesmerpanel
                        apneTekst={"Se detaljer"}
                        lukkTekst={"Lukk"}
                        intro={
                            <div>
                                {tittel}
                                <FormattedHTMLMessage id={"navytelser.infotekst.tekst"}/>
                            </div>
                        }
                        border={true}
                    >
                        <div className="utbetalinger">
                            {navYtelserJsx}
                            <FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
                        </div>
                    </Lesmerpanel>)
                }
                {!visAnimerteStreker && !utbetalingerFraNavFeilet && !harNavytelser && (
                    <Panel
                        border={true}
                        className={"ytelser_panel"}
                    >
                        <div>
                            {tittel}
                            <FormattedMessage id="utbetalinger.ingen.true"/>
                        </div>
                    </Panel>)
                }
                {utbetalingerFraNavFeilet && (
                    <Panel
                        border={true}
                        className={"ytelser_panel"}
                    >
                        <div>
                            {tittel}
                            <FormattedMessage id="utbetalinger.kontaktproblemer"/>
                        </div>
                    </Panel>
                )}

                {visAnimerteStreker &&
                <TextPlaceholder lines={3}/>
                }
            </div>
        )
    }
}

export default connectSoknadsdataContainer(injectIntl(NavYtelserView));

