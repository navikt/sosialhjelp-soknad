import * as React from 'react';
import {
    connectSoknadsdataContainer,
    onEndretValideringsfeil,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Utbetalinger, UtbetalingerKeys} from "./utbetalingerTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../../nav-soknad/redux/valideringActionTypes";

const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";
const TEXT_AREA_ANNET_FAKTUM_KEY = UTBETALINGER + "utbetalinger.annet.textarea";


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
        if (restStatus === REST_STATUS.OK) {
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

    handleClickRadio(idToToggle: UtbetalingerKeys) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        utbetalinger[idToToggle]= !utbetalinger[idToToggle];
        if (!utbetalinger.bekreftelse || !utbetalinger.annet) {
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
        this.validerTekstfeltVerdi(value, TEXT_AREA_ANNET_FAKTUM_KEY);
    }

    onBlurTekstfeltAnnet() {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        const beskrivelseAvAnnet = utbetalinger.beskrivelseAvAnnet;
        const feilmeldingAnnet: ValideringsFeilKode | undefined = this.validerTekstfeltVerdi(beskrivelseAvAnnet, TEXT_AREA_ANNET_FAKTUM_KEY);

        if (!feilmeldingAnnet) {
            this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
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

    renderCheckBox(navn: UtbetalingerKeys, textKey: string) {
        const {soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;

        if (typeof utbetalinger[navn] === "boolean"){

            const isChecked: boolean = !!(utbetalinger[navn] && (utbetalinger[navn] === true));

            return (
                <CheckboxPanel
                    id={"boutgifter_" + navn + "_checkbox"}
                    name={navn}
                    checked={isChecked}
                    label={<FormattedHTMLMessage id={UTBETALINGER + ".true.type." + textKey}/>}
                    onClick={() => this.handleClickRadio(navn)}
                />
            )
        }

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
                    {this.renderCheckBox(UtbetalingerKeys.UTBYTTE, UtbetalingerKeys.UTBYTTE)}
                    {this.renderCheckBox(UtbetalingerKeys.SALG, UtbetalingerKeys.SALG)}
                    {this.renderCheckBox(UtbetalingerKeys.FORSIKRING, UtbetalingerKeys.FORSIKRING)}
                    {this.renderCheckBox(UtbetalingerKeys.ANNET, UtbetalingerKeys.ANNET)}
                    <NivaTreSkjema
                        visible={!!(utbetalinger.bekreftelse && utbetalinger.annet)}
                        size="small"
                    >
                        <TextareaEnhanced
                            id={replaceDotWithUnderscore(TEXT_AREA_ANNET_FAKTUM_KEY)}
                            placeholder=""
                            onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}
                            onBlur={() => this.onBlurTekstfeltAnnet()}
                            faktumKey={TEXT_AREA_ANNET_FAKTUM_KEY}
                            labelId={UTBETALINGER + ".true.type.annet.true.beskrivelse.label"}
                            maxLength={MAX_CHARS}
                            value={utbetalinger.beskrivelseAvAnnet ? utbetalinger.beskrivelseAvAnnet : ""}
                        />
                    </NivaTreSkjema>
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(UtbetalingerView));
