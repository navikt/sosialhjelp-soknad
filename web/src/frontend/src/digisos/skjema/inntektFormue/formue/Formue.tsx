import * as React from 'react';
import {
    connectSoknadsdataContainer, onEndretValideringsfeil,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {Formue} from "./FormueTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import { REST_STATUS } from "../../../../nav-soknad/types";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsfeilType} from "../../../../nav-soknad/redux/valideringActionTypes";

const MAX_CHARS = 500;
const FORMUE = "inntekt.bankinnskudd";
const FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY = FORMUE + "formue.annet.textarea";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

interface State {
    oppstartsModus: boolean
}

export class FormueView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            oppstartsModus: true
        }
    }

    componentDidMount() {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.FORMUE);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.state.oppstartsModus) {
            if (this.props.soknadsdata.restStatus.inntekt.formue === REST_STATUS.OK) {
                this.setState({oppstartsModus: false});
            }
        }
    }

    handleClickCheckbox(idToToggle: string) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (!this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
            const formue: Formue = soknadsdata.inntekt.formue;
            formue[idToToggle] = !formue[idToToggle];
            if (!formue.annet){
                formue.beskrivelseAvAnnet = "";
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue);
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORMUE, formue);
        }
    }

    onChangeAnnet(value: string) {
        const {soknadsdata} = this.props;
        const formue: Formue = soknadsdata.inntekt.formue;
        formue.beskrivelseAvAnnet = value;
        this.props.oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue);
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const formue: Formue = soknadsdata.inntekt.formue;
        const beskrivelseAvAnnet = formue.beskrivelseAvAnnet;
        const feilmeldingAnnet: ValideringsfeilType = this.validerTekstfeltVerdi(beskrivelseAvAnnet, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY);

        if (!feilmeldingAnnet) {
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORMUE, formue);
        }
    }

    validerTekstfeltVerdi(verdi: string, faktumKey: string): ValideringsfeilType {
        const feilkode: ValideringsfeilType = maksLengde(verdi, MAX_CHARS);
        onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
            this.props.setValideringsfeil(feilkode, faktumKey);
        });
        return feilkode;
    }

    renderCheckBox(navn: string) {
        const {soknadsdata} = this.props;
        const formue: Formue = soknadsdata.inntekt.formue;
        let label: React.ReactNode;
        let oppstartsModus = this.state.oppstartsModus;
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
            oppstartsModus = false;
        }
        if (oppstartsModus) {
            label = <TextPlaceholder lines={1} style={{marginTop: "0.2rem"}}/>
        } else {
            label = <FormattedHTMLMessage id={FORMUE + ".true.type." + navn}/>
        }
        return (
            <CheckboxPanel
                id={"formue_" + navn + "_checkbox"}
                name={navn}
                checked={formue && formue[navn] ? formue[navn] : false}
                label={label}
                onClick={() => this.handleClickCheckbox(navn)}
            />
        )
    }

    render() {
        const {soknadsdata} = this.props;
        const formue: Formue = soknadsdata.inntekt.formue;
        return (
            <Sporsmal
                tekster={getFaktumSporsmalTekst(this.props.intl, FORMUE + ".true.type")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {this.renderCheckBox("brukskonto")}
                {this.renderCheckBox("sparekonto")}
                {this.renderCheckBox("bsu")}
                {this.renderCheckBox("livsforsikring")}
                {this.renderCheckBox("verdipapirer")}
                {this.renderCheckBox("annet")}
                <NivaTreSkjema
                    visible={formue.annet}
                    size="small"
                >
                    <TextareaEnhanced
                        id="formue_annet_textarea"
                        placeholder=""
                        onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                        onBlur={() => this.onBlurTekstfeltAnnet()}
                        faktumKey={FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY}
                        labelId={FORMUE + ".true.type.annet.true.beskrivelse.label"}
                        maxLength={MAX_CHARS}
                        value={formue.beskrivelseAvAnnet}
                    />
                </NivaTreSkjema>
            </Sporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(FormueView));
