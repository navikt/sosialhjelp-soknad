import * as React from 'react';
import {
    connectSoknadsdataContainer,
    onEndretValideringsfeil,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, injectIntl } from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import {Formue, FormueId} from "./FormueTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../../nav-soknad/redux/valideringActionTypes";

const MAX_CHARS = 500;
const FORMUE = "inntekt.bankinnskudd";
const FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY = FORMUE + "formue.annet.textarea";

type Props = SoknadsdataContainerProps & IntlProps;

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

    handleClickCheckbox(idToToggle: FormueId) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (!this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
            const formue: Formue = soknadsdata.inntekt.formue;

            let formueElement: boolean | string = formue[idToToggle];
            if (typeof formueElement === 'boolean' && typeof formue[idToToggle] === 'boolean'){
                // @ts-ignore
                formue[idToToggle] = !formueElement;
            }

            if (formue && !formue.annet) {
                formue.beskrivelseAvAnnet = "";
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue);
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORMUE, formue);
        }
    }

    onChangeAnnet(value: string) {
        const {soknadsdata} = this.props;
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue){
            formue.beskrivelseAvAnnet = value;
            this.props.oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue);
        }
        this.validerTekstfeltVerdi(value, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY)
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue){
            const beskrivelseAvAnnet = formue.beskrivelseAvAnnet;
            const feilmeldingAnnet: ValideringsFeilKode | undefined = this.validerTekstfeltVerdi(beskrivelseAvAnnet, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY);
            if (!feilmeldingAnnet) {
                this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORMUE, formue);
            }
        }
    }

    validerTekstfeltVerdi(verdi: string, faktumKey: string): ValideringsFeilKode | undefined {
        const feilkode: ValideringsFeilKode | undefined = maksLengde(verdi, MAX_CHARS);
        onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
            (feilkode) ?
                this.props.setValideringsfeil(feilkode, faktumKey) :
                this.props.clearValideringsfeil(faktumKey);
        });
        return feilkode;
    }

    renderCheckBox(navn: FormueId) {
        const {soknadsdata} = this.props;
        const formue: Formue = soknadsdata.inntekt.formue;
        let label: React.ReactNode;
        let oppstartsModus = this.state.oppstartsModus;
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
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
                checked={!!(formue[navn])}
                label={label}
                onClick={() => this.handleClickCheckbox(navn)}
            />
        )
    }

    render() {
        const {soknadsdata, intl} = this.props;
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        return (
            <Sporsmal
                tekster={getFaktumSporsmalTekst(intl, FORMUE + ".true.type")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {this.renderCheckBox(FormueId.BRUKSKONTO)}
                {this.renderCheckBox(FormueId.SPAREKONTO )}
                {this.renderCheckBox(FormueId.BSU)}
                {this.renderCheckBox(FormueId.LIVSFORSIKRING)}
                {this.renderCheckBox(FormueId.VERDIPAPIRER)}
                {this.renderCheckBox(FormueId.ANNET)}
                <NivaTreSkjema
                    visible={formue !== undefined && formue.annet}
                    size="small"
                >
                    <TextareaEnhanced
                        id={replaceDotWithUnderscore(FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY)}
                        placeholder=""
                        onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                        onBlur={() => this.onBlurTekstfeltAnnet()}
                        faktumKey={FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY}
                        labelId={FORMUE + ".true.type.annet.true.beskrivelse.label"}
                        maxLength={MAX_CHARS}
                        value={formue && formue.beskrivelseAvAnnet ? formue.beskrivelseAvAnnet : ""}
                    />
                </NivaTreSkjema>
            </Sporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(FormueView));
