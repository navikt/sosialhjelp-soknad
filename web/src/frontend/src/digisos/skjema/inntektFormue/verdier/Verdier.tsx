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
import { Verdier } from "./VerdierTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import { REST_STATUS } from "../../../../nav-soknad/types";

const MAX_CHARS = 500;
const Verdier = "inntekt.eierandeler";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

interface State {
    pending: boolean
}

export class VerdierView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            pending: true
        }
    }

    componentDidMount() {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.VERDIER);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.state.pending) {
            if (this.props.soknadsdata.restStatus.inntekt.verdier === REST_STATUS.OK) {
                this.setState({pending: false});
            }
        }
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const restStatus = soknadsdata.restStatus.inntekt.verdier;
        if (!this.state.pending && restStatus === REST_STATUS.OK) {
            const verdier: Verdier = soknadsdata.inntekt.verdier;
            verdier.bekreftelse = verdi;
            if (!verdi) {
                verdier.bolig = false;
                verdier.campingvogn = false;
                verdier.kjoretoy = false;
                verdier.fritidseiendom = false;
                verdier.annet = false;
                verdier.beskrivelseAvAnnet = "";
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
        }
    }

    handleClickRadio(idToToggle: string) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        verdier[idToToggle] = !verdier[idToToggle];
        this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
    }

    onChangeAnnet(value: string) {
        const {soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        verdier.beskrivelseAvAnnet = value;
        this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
    }

    renderCheckBox(navn: string) {
        const {soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        return (
            <CheckboxPanel
                id={"verdier_" + navn + "_checkbox"}
                name={navn}
                checked={verdier && verdier[navn] ? verdier[navn] : false}
                label={<FormattedHTMLMessage id={Verdier + ".true.type." + navn}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        const restStatus = soknadsdata.restStatus.inntekt.verdier;
        return (
            <JaNeiSporsmal
                visPlaceholder={this.state.pending && restStatus !== REST_STATUS.OK}
                tekster={getFaktumSporsmalTekst(this.props.intl, Verdier)}
                faktumKey={Verdier}
                verdi={verdier.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(this.props.intl, Verdier + ".true.type")}
                >
                    {this.renderCheckBox("bolig")}
                    {this.renderCheckBox("campingvogn")}
                    {this.renderCheckBox("kjoretoy")}
                    {this.renderCheckBox("fritidseiendom")}
                    {this.renderCheckBox("annet")}
                    <NivaTreSkjema
                        visible={verdier.bekreftelse && verdier.annet}
                        size="small"
                    >
                        <TextareaEnhanced
                            id="verdier_annet_textarea"
                            placeholder=""
                            onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                            onBlur={() => this.onBlurTekstfeltAnnet()}
                            faktumKey=""
                            labelId={Verdier + ".true.type.annet.true.beskrivelse.label"}
                            maxLength={MAX_CHARS}
                            value={verdier.beskrivelseAvAnnet}
                        />
                    </NivaTreSkjema>
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}

export default connectSoknadsdataContainer(injectIntl(VerdierView));
