import * as React from 'react';
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Boutgifter, BoutgifterKeys} from "./BoutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";

const BOUTGIFTER = "utgifter.boutgift";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

export class BoutgifterView extends React.Component<Props, {}> {

    componentDidMount(): void {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BOUTGIFTER);
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
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
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOUTGIFTER, boutgifter);
    }

    handleClickRadio(idToToggle: BoutgifterKeys) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
        boutgifter[idToToggle] = !boutgifter[idToToggle];
        this.props.oppdaterSoknadsdataSti(SoknadsSti.BOUTGIFTER, boutgifter);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOUTGIFTER, boutgifter);
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
        const {soknadsdata} = this.props;
        const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
        return (
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(this.props.intl, BOUTGIFTER)}
                faktumKey={BOUTGIFTER}
                verdi={boutgifter.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(this.props.intl, BOUTGIFTER + ".true.type")}
                >
                    {this.renderCheckBox(BoutgifterKeys.HUSLEIE, BoutgifterKeys.HUSLEIE)}
                    {this.renderCheckBox(BoutgifterKeys.STROM, BoutgifterKeys.STROM)}
                    {this.renderCheckBox(BoutgifterKeys.KOMMUNALAVGIFT, BoutgifterKeys.KOMMUNALAVGIFT)}
                    {this.renderCheckBox(BoutgifterKeys.OPPVARMING, BoutgifterKeys.OPPVARMING)}
                    {this.renderCheckBox(BoutgifterKeys.BOLIGLAN, BoutgifterKeys.BOLIGLAN)}
                    {this.renderCheckBox(BoutgifterKeys.ANNET, "andreutgifter")}
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(BoutgifterView));