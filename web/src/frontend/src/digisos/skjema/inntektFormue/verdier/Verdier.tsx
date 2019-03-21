import * as React from 'react';
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Verdier} from "./VerdierTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";

const MAX_CHARS = 500;
const Verdier = "inntekt.eierandeler";

type Props = SoknadsdataContainerProps & InjectedIntlProps;


export class VerdierView extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.VERDIER);
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
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
        this.props.oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.VERDIER, verdier);
    }


    render() {

        const {soknadsdata} = this.props;

        const verdier: Verdier = soknadsdata.inntekt.verdier;

        return (
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(this.props.intl, Verdier)}
                faktumKey={Verdier}
                verdi={verdier.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(this.props.intl, Verdier + ".true.type")}
                >

                    <CheckboxPanel
                        id={"verdier_bolig_checkbox"}
                        name={"bolig"}
                        checked={verdier && verdier.bolig ? verdier.bolig : false}
                        label={<FormattedHTMLMessage id={Verdier + ".true.type.bolig"}/>}
                        onClick={() => this.handleClickRadio("bolig")}
                    />
                    <CheckboxPanel
                        id={"verdier_campingvogn_checkbox"}
                        name={"campingvogn"}
                        checked={verdier && verdier.campingvogn ? verdier.campingvogn : false}
                        label={<FormattedHTMLMessage id={Verdier + ".true.type.campingvogn"}/>}
                        onClick={() => this.handleClickRadio("campingvogn")}
                    />
                    <CheckboxPanel
                        id={"verdier_kjoretoy_checkbox"}
                        name={"kjoretoy"}
                        checked={verdier && verdier.kjoretoy ? verdier.kjoretoy : false}
                        label={<FormattedHTMLMessage id={Verdier + ".true.type.kjoretoy"}/>}
                        onClick={() => this.handleClickRadio("kjoretoy")}
                    />
                    <CheckboxPanel
                        id={"verdier_fritidseiendom_checkbox"}
                        name={"fritidseiendom"}
                        checked={verdier && verdier.fritidseiendom ? verdier.fritidseiendom : false}
                        label={<FormattedHTMLMessage id={Verdier + ".true.type.fritidseiendom"}/>}
                        onClick={() => this.handleClickRadio("fritidseiendom")}
                    />
                    <CheckboxPanel
                        id={"verdier_annet_checkbox"}
                        name={"annet"}
                        checked={verdier && verdier.annet ? verdier.annet : false}
                        label={<FormattedHTMLMessage id={Verdier + ".true.type.annet"}/>}
                        onClick={() => this.handleClickRadio("annet")}
                    />
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
