import * as React from 'react';
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import { Utbetalinger } from "./utbetalingerTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import { REST_STATUS } from "../../../../nav-soknad/types";

const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

interface State {
    oppstartsModus: boolean
}

export class UtbetalingerView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            oppstartsModus: true
        }
    }

    componentDidMount() {
        const {hentSoknadsdata, brukerBehandlingId} = this.props;
        hentSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.state.oppstartsModus) {
            if (this.props.soknadsdata.restStatus.inntekt.utbetalinger === REST_STATUS.OK) {
                this.setState({oppstartsModus: false});
            }
        }
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const restStatus = soknadsdata.restStatus.inntekt.utbetalinger;
        if(restStatus === REST_STATUS.OK) {
            const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
            utbetalinger.bekreftelse = verdi;
            if (!verdi) {
                utbetalinger.salg = false;
                utbetalinger.utbytte = false;
                utbetalinger.forsikring = false;
                utbetalinger.annet = false;
                utbetalinger.beskrivelseAvAnnet = "";
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
        }
    }

    handleClickRadio(idToToggle: string) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        utbetalinger[idToToggle] = !utbetalinger[idToToggle];
        if (!utbetalinger.bekreftelse || !utbetalinger.annet){
            utbetalinger.beskrivelseAvAnnet = "";
        }
        this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
    }

    onChangeAnnet(value: string) {
        const {soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        utbetalinger.beskrivelseAvAnnet = value;
        this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
    }

    renderCheckBox(navn: string, textKey: string) {
        const {soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        return (
            <CheckboxPanel
                id={"boutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={utbetalinger && utbetalinger[navn] ? utbetalinger[navn] : false}
                label={<FormattedHTMLMessage id={UTBETALINGER + ".true.type." + textKey}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        const restStatus = soknadsdata.restStatus.inntekt.utbetalinger;
        let oppstartsModus = this.state.oppstartsModus;
        if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
            oppstartsModus = false;
        }
        return (
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(this.props.intl, UTBETALINGER)}
                faktumKey={UTBETALINGER}
                verdi={utbetalinger.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(this.props.intl, UTBETALINGER + ".true.type")}
                >
                    {this.renderCheckBox("utbytte", "utbytte")}
                    {this.renderCheckBox("salg", "salg")}
                    {this.renderCheckBox("forsikring", "forsikring")}
                    {this.renderCheckBox("annet", "annet")}
                    <NivaTreSkjema
                        visible={utbetalinger.bekreftelse && utbetalinger.annet}
                        size="small"
                    >
                        <TextareaEnhanced
                            id="utbetalinger_annet_textarea"
                            placeholder=""
                            onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                            onBlur={() => this.onBlurTekstfeltAnnet()}
                            faktumKey=""
                            labelId={UTBETALINGER + ".true.type.annet.true.beskrivelse.label"}
                            maxLength={MAX_CHARS}
                            value={utbetalinger.beskrivelseAvAnnet}
                        />
                    </NivaTreSkjema>
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(UtbetalingerView));
