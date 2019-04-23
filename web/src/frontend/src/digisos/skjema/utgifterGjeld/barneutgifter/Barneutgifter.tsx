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
import {Barneutgifter} from "./BarneutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
const Barneutgifter = "utgifter.barn";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

export class BarneutgifterView extends React.Component<Props, {}> {

    componentDidMount(): void {
        this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BARNEUTGIFTER);
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        barneutgifter.bekreftelse = verdi;
        if (!verdi) {
            barneutgifter.fritidsaktiviteter = false;
            barneutgifter.barnehage = false;
            barneutgifter.sfo = false;
            barneutgifter.tannregulering = false;
            barneutgifter.annet = false;
        }
        this.props.oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BARNEUTGIFTER, barneutgifter);
    }

    handleClickRadio(idToToggle: string) {
        const {brukerBehandlingId, soknadsdata} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        barneutgifter[idToToggle] = !barneutgifter[idToToggle];
        this.props.oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BARNEUTGIFTER, barneutgifter);
    }

    renderCheckBox(navn: string, textKey: string) {
        const {soknadsdata} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        return (
            <CheckboxPanel
                id={"barneutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={barneutgifter && barneutgifter[navn] ? barneutgifter[navn] : false}
                label={<FormattedHTMLMessage id={Barneutgifter + ".true.utgifter." + textKey}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        return (
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(this.props.intl, Barneutgifter)}
                visible={barneutgifter.harForsorgerplikt}
                faktumKey={Barneutgifter}
                verdi={barneutgifter.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(this.props.intl, Barneutgifter + ".true.utgifter")}
                >
                    {this.renderCheckBox("fritidsaktiviteter", "fritidsaktivitet")}
                    {this.renderCheckBox("barnehage", "barnehage")}
                    {this.renderCheckBox("sfo", "sfo")}
                    {this.renderCheckBox("tannregulering", "tannbehandling")}
                    {this.renderCheckBox("annet", "annet")}
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(BarneutgifterView));