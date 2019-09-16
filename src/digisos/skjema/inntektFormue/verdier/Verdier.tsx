import * as React from 'react';
import {
    connectSoknadsdataContainer, onEndretValideringsfeil,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Verdier, VerdierKeys} from "./VerdierTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../../nav-soknad/redux/valideringActionTypes";

const MAX_CHARS = 500;
const VERDIER = "inntekt.eierandeler";
const VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY = VERDIER + "verdier.annet.textarea";

type Props = SoknadsdataContainerProps & IntlProps;

interface State {
    oppstartsModus: boolean
}

export class VerdierView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            oppstartsModus: true
        }
    }

    componentDidMount() {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.VERDIER);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.state.oppstartsModus) {
            if (this.props.soknadsdata.restStatus.inntekt.verdier === REST_STATUS.OK) {
                this.setState({oppstartsModus: false});
            }
        }
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const restStatus = soknadsdata.restStatus.inntekt.verdier;

        if (!this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
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

    handleClickRadio(idToToggle: VerdierKeys) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        if (typeof verdier[idToToggle] === 'boolean') {
            // @ts-ignore
            verdier[idToToggle] = !verdier[idToToggle];
        }
        if (!verdier.bekreftelse || !verdier.annet) {
            verdier.beskrivelseAvAnnet = "";
        }
        this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
    }

    onChangeAnnet(value: string) {
        const {soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        verdier.beskrivelseAvAnnet = value;
        this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
        this.validerTekstfeltVerdi(value, VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        const beskrivelseAvAnnet = verdier.beskrivelseAvAnnet;
        const feilmeldingAnnet: ValideringsFeilKode | undefined = this.validerTekstfeltVerdi(beskrivelseAvAnnet, VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);

        if (!feilmeldingAnnet) {
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
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

    renderCheckBox(navn: VerdierKeys) {
        const {soknadsdata} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        return (
            <CheckboxPanel
                id={"verdier_" + navn + "_checkbox"}
                name={navn}
                checked={!!(verdier[navn])}
                label={<FormattedHTMLMessage id={VERDIER + ".true.type." + navn}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata, intl} = this.props;
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        const restStatus = soknadsdata.restStatus.inntekt.verdier;
        return (
            <JaNeiSporsmal
                visPlaceholder={this.state.oppstartsModus && restStatus !== REST_STATUS.OK}
                tekster={getFaktumSporsmalTekst(intl, VERDIER)}
                faktumKey={VERDIER}
                verdi={verdier.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(intl, VERDIER + ".true.type")}
                >
                    {this.renderCheckBox(VerdierKeys.BOLIG)}
                    {this.renderCheckBox(VerdierKeys.CAMPINGVOGN)}
                    {this.renderCheckBox(VerdierKeys.KJORETOY)}
                    {this.renderCheckBox(VerdierKeys.FRITIDSEIENDOM)}
                    {this.renderCheckBox(VerdierKeys.ANNET)}
                    <NivaTreSkjema
                        visible={!!(verdier.bekreftelse && verdier.annet)}
                        size="small"
                    >
                        <TextareaEnhanced
                            id={replaceDotWithUnderscore(VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY)}
                            placeholder=""
                            onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                            onBlur={() => this.onBlurTekstfeltAnnet()}
                            faktumKey={VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY}
                            labelId={VERDIER + ".true.type.annet.true.beskrivelse.label"}
                            maxLength={MAX_CHARS}
                            value={verdier.beskrivelseAvAnnet ? verdier.beskrivelseAvAnnet : "" }
                        />
                    </NivaTreSkjema>
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}

export default connectSoknadsdataContainer(injectIntl(VerdierView));
