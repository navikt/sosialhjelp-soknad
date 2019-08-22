import * as React from "react";
import {Barn} from "./ForsorgerPliktTypes";
import Detaljeliste from "../../../../nav-soknad/components/detaljeliste";
import {InjectedIntlProps, injectIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import {Column, Container, Row} from "nav-frontend-grid";
import {setPath} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import {getTomtBarn} from "./ForsorgerPliktUtils";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import Underskjema from "../../../../nav-soknad/components/underskjema";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

const TEXT_KEY = "familie.barn.true.barn";
const TEXT_KEY_FNR = TEXT_KEY + ".fnr";

class BrukerregistrerteBarn extends React.Component<Props, {}> {

    navnInput!: HTMLInputElement;

    handleLeggTilBarn() {
        const {soknadsdata, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const brukerregistrerteAnsvar = forsorgerplikt.brukerregistrertAnsvar;
        brukerregistrerteAnsvar.push(getTomtBarn());
        lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    handleFjernBarn(radIndex: number) {
        const {soknadsdata, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const brukerregistrerteAnsvar = forsorgerplikt.brukerregistrertAnsvar;
        brukerregistrerteAnsvar.splice(radIndex, 1);
        lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    oppdaterTekstfelt(sti: string, verdi: string | null, barnIndex: number) {
        this.props.clearValideringsfeil(TEXT_KEY_FNR);
        if (verdi && verdi.length === 0) {
            verdi = null;
        }
        const {soknadsdata, oppdaterSoknadsdataSti} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex].barn;
        setPath(barnet, sti, verdi);
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    handleClickJaNeiSpsm(verdi: boolean, barnIndex: number) {
        const {soknadsdata, oppdaterSoknadsdataSti, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        barnet.borSammenMed = verdi;
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
        lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    onChangeSamvaersgrad(verdi: string, barnIndex: number) {
        const {soknadsdata, oppdaterSoknadsdataSti } = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        barnet.samvarsgrad = parseInt(verdi,10);
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    onBlur() {
        const {soknadsdata, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    render() {
        const {soknadsdata} = this.props;
        const barn = soknadsdata.familie.forsorgerplikt.brukerregistrertAnsvar;

        return (
            <Sporsmal
                sprakNokkel="familierelasjon.faktum.leggtil"
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <div className="skjema-legg-til-barn">
                    {barn.map((barnet: Barn, index: number) =>
                        <Underskjema
                            visible={true}
                            arrow={false}
                        >
                            <Sporsmal
                                sprakNokkel={TEXT_KEY}
                                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                            >
                                <div className="blokk-s">
                                    <div key={index} className={(index + 1 === barn.length) ? "barn barn_siste_liste_element" : "barn"}>
                                        <Container fluid={true} className="container--noPadding">
                                            <Row>
                                                <Column xs="12">
                                                    <InputEnhanced
                                                        getName={() => TEXT_KEY + "_fornavn_input"}
                                                        id={TEXT_KEY + "_fornavn_input"}
                                                        inputRef={ (c: any) => (this.navnInput = c)}
                                                        maxLength={100}
                                                        verdi={barnet.barn.navn.fornavn}
                                                        onChange={(verdi: string) => this.oppdaterTekstfelt("navn/fornavn", verdi, index)}
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey={TEXT_KEY + ".fornavn"}
                                                        required={true}
                                                    />
                                                </Column>
                                            </Row>
                                            <Row>
                                                <Column xs="12">
                                                    <InputEnhanced
                                                        getName={() => TEXT_KEY + "_mellomnavn_input"}
                                                        id={TEXT_KEY + "_mellomnavn_input"}
                                                        maxLength={100}
                                                        verdi={barnet.barn.navn.mellomnavn ? barnet.barn.navn.mellomnavn : ""}
                                                        onChange={(verdi: string) => this.oppdaterTekstfelt("navn/mellomnavn", verdi, index)}
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey={TEXT_KEY + ".mellomnavn"}
                                                        required={true}
                                                    />
                                                </Column>
                                            </Row>
                                            <Row className="add-padding-bottom">
                                                <Column xs="12">
                                                    <InputEnhanced
                                                        getName={() => TEXT_KEY + "_etternavn_input"}
                                                        id={TEXT_KEY + "_etternavn_input"}
                                                        maxLength={100}
                                                        verdi={barnet.barn.navn.etternavn}
                                                        onChange={(verdi: string) => this.oppdaterTekstfelt("navn/etternavn", verdi, index)}
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey={TEXT_KEY + ".etternavn"}
                                                        required={true}
                                                    />
                                                </Column>
                                            </Row>
                                            <Row>
                                                <Column xs="12">
                                                    <InputEnhanced
                                                        getName={() => TEXT_KEY_FNR}
                                                        id={TEXT_KEY_FNR}
                                                        maxLength={8}
                                                        minLength={8}
                                                        verdi={barnet.barn.fodselsdato == null ? "" : barnet.barn.fodselsdato}
                                                        onChange={(verdi: string) => this.oppdaterTekstfelt("fodselsdato", verdi, index)}
                                                        bredde="S"
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey={TEXT_KEY_FNR}
                                                        required={true}
                                                    />
                                                </Column>
                                            </Row>
                                        </Container>
                                        <Detaljeliste>
                                            <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                                <JaNeiSporsmal
                                                    id={"barn_radio_" + index}
                                                    tekster={getFaktumSporsmalTekst(this.props.intl, "familie.barn.true.barn.borsammen")}
                                                    faktumKey={"familie.barn.true.barn.borsammen"}
                                                    verdi={barnet.borSammenMed}
                                                    onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi, index)}
                                                    legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                                                />
                                            </div>
                                            {barnet.borSammenMed === false && (
                                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                                    <InputEnhanced
                                                        getName={() => "barn" + index + "_samvaersgrad"}
                                                        id={"barn" + index + "_samvaersgrad"}
                                                        maxLength={3}
                                                        verdi={barnet.samvarsgrad !== null ? barnet.samvarsgrad.toString() : ""}
                                                        onChange={(verdi: string) => this.onChangeSamvaersgrad(verdi, index)}
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey="system.familie.barn.true.barn.grad"
                                                        required={false}
                                                    />
                                                </div>
                                            )}
                                        </Detaljeliste>
                                        <Lenkeknapp
                                            onClick={() => {
                                                this.handleFjernBarn(index)
                                            }}
                                            id={index + "_fjern_barn_lenke"}
                                        >
                                            Fjern forsørgerpliktig barn
                                        </Lenkeknapp>
                                    </div>
                                </div>
                            </Sporsmal>
                        </Underskjema>
                    )}
                    <div className="legg-til-barn-knapp">
                        <Lenkeknapp onClick={() => this.handleLeggTilBarn()} stil="add" id={"legg_til_barn_link"}>
                            Legg til forsørgerpliktig barn
                        </Lenkeknapp>
                    </div>
                </div>
            </Sporsmal>
        );
    }

}

export default connectSoknadsdataContainer(injectIntl(BrukerregistrerteBarn));

