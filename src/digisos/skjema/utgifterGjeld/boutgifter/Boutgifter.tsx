import * as React from 'react';
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Boutgifter, BoutgifterKeys} from "./BoutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";

const BOUTGIFTER = "utgifter.boutgift";

type Props = SoknadsdataContainerProps & IntlProps;

export class BoutgifterView extends React.Component<Props, {}> {

    componentDidMount(): void {
        const {behandlingsId} = this.props;
        if (behandlingsId){
            this.props.hentSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER);
        }
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {behandlingsId, soknadsdata} = this.props;
        if (behandlingsId){
            const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
            boutgifter.bekreftelse = verdi;
            if (!verdi) {
                boutgifter.husleie = false;
                boutgifter.strom = false;
                boutgifter.kommunalAvgift = false;
                boutgifter.oppvarming = false;
                boutgifter.boliglan = false;
                boutgifter.annet = false;
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.BOUTGIFTER, boutgifter);
            this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER, boutgifter);
        }
    }

    handleClickRadio(idToToggle: BoutgifterKeys) {
        const {behandlingsId, soknadsdata} = this.props;
        if (behandlingsId){
            const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
            boutgifter[idToToggle] = !boutgifter[idToToggle];
            this.props.oppdaterSoknadsdataSti(SoknadsSti.BOUTGIFTER, boutgifter);
            this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER, boutgifter);
        }
    }

    renderCheckBox(navn: BoutgifterKeys, textKey: string) {
        const {soknadsdata} = this.props;
        const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;

        const boutgifterElement: boolean | null = boutgifter[navn];
        const isChecked: boolean = boutgifterElement ? boutgifterElement : false;

        return (
            <CheckboxPanel
                id={"boutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={<FormattedHTMLMessage id={BOUTGIFTER + ".true.type." + textKey}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata, intl} = this.props;
        const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
        return (
            <div className="skjema-sporsmal">
                <JaNeiSporsmal
                    tekster={getFaktumSporsmalTekst(intl, BOUTGIFTER)}
                    faktumKey={BOUTGIFTER}
                    verdi={boutgifter.bekreftelse}
                    onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                    legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                >
                    <Sporsmal
                        tekster={getFaktumSporsmalTekst(intl, BOUTGIFTER + ".true.type")}
                    >
                        {this.renderCheckBox(BoutgifterKeys.HUSLEIE, BoutgifterKeys.HUSLEIE)}
                        {this.renderCheckBox(BoutgifterKeys.STROM, BoutgifterKeys.STROM)}
                        {this.renderCheckBox(BoutgifterKeys.KOMMUNALAVGIFT, BoutgifterKeys.KOMMUNALAVGIFT)}
                        {this.renderCheckBox(BoutgifterKeys.OPPVARMING, BoutgifterKeys.OPPVARMING)}
                        {this.renderCheckBox(BoutgifterKeys.BOLIGLAN, BoutgifterKeys.BOLIGLAN)}
                        {this.renderCheckBox(BoutgifterKeys.ANNET, "andreutgifter")}
                    </Sporsmal>
                </JaNeiSporsmal>
                <Informasjonspanel
                    synlig={boutgifter && boutgifter.skalViseInfoVedBekreftelse && boutgifter.bekreftelse === true}
                    ikon={InformasjonspanelIkon.ELLA}
                    farge={DigisosFarge.VIKTIG}
                >
                    <FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
                </Informasjonspanel>

            </div>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(BoutgifterView));
