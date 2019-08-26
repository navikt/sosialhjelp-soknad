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
import {konverterFraISODato, konverterTilISODato} from "../sivilstatus/datoUtils";
import {fdato} from "../../../../nav-soknad/validering/valideringer";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

const TEXT_KEY = "familie.barn.true.barn";
const TEXT_KEY_FNR = TEXT_KEY + ".fnr";

class BrukerregistrerteBarn extends React.Component<Props, {synligeBarn: boolean[]}> {

    navnInput!: HTMLInputElement;

    constructor(props: Props) {
        super(props);
        const {soknadsdata} = props;
        const barn = soknadsdata.familie.forsorgerplikt.brukerregistrertAnsvar;
        let initialSynligeBarn: boolean[] = [];
        for (let i = 0; i < barn.length; i++) {
            initialSynligeBarn.push(true)
        }
        this.state = {
            synligeBarn: initialSynligeBarn
        };
    }

    componentDidMount() {
        if (this.navnInput) {
            this.focus();
        }
    }

    focus() {
        this.navnInput.focus();
    }

    handleLeggTilBarn() {
        const {soknadsdata, oppdaterSoknadsdataSti} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const brukerregistrerteAnsvar = forsorgerplikt.brukerregistrertAnsvar;
        brukerregistrerteAnsvar.push(getTomtBarn());
        this.setState({synligeBarn: this.state.synligeBarn.concat(false)});
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);

        setTimeout(() => {
            this.endreSynligBarnState(this.state.synligeBarn.length - 1, true);
        }, 100);
    }

    handleFjernBarn(radIndex: number) {
        const {soknadsdata, oppdaterSoknadsdataSti, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const brukerregistrerteAnsvar = forsorgerplikt.brukerregistrertAnsvar;
        brukerregistrerteAnsvar.splice(radIndex, 1);
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
        this.fjernSisteSynligBarnRadFraState();
        lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    endreSynligBarnState(index: number, bool: boolean) {
        this.setState(state => {
            const synligeBarn = state.synligeBarn.map((synlig, j) => {
                if (j === index) {
                    return bool;
                } else {
                    return synlig;
                }
            });
            return {
                synligeBarn,
            };
        });
    };

    fjernSisteSynligBarnRadFraState() {
        this.setState(state => {
            const synligeBarn = state.synligeBarn.filter((item, j) => j !== state.synligeBarn.length - 1);

            return {
                synligeBarn,
            };
        });
    };

    oppdaterTekstfelt(sti: string, verdi: string | null, barnIndex: number) {
        this.props.clearValideringsfeil(TEXT_KEY_FNR + barnIndex);
        if (verdi && verdi.length === 0) {
            verdi = null;
        }
        const {soknadsdata, oppdaterSoknadsdataSti} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex].barn;
        setPath(barnet, sti, verdi);
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
    }

    onClickBorSammen(verdi: boolean, barnIndex: number) {
        const {soknadsdata, oppdaterSoknadsdataSti} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        barnet.borSammenMed = verdi;
        if (!verdi) {
            barnet.samvarsgrad = null;
        }
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
        this.onBlur();
    }

    onChangeSamvaersgrad(verdi: string, barnIndex: number) {
        const {soknadsdata, oppdaterSoknadsdataSti} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        barnet.samvarsgrad = parseInt(verdi, 10);
        oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
        this.onBlur();
    }

    onBlur() {
        const {soknadsdata, lagreSoknadsdata, brukerBehandlingId} = this.props;
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barn: Barn[] = forsorgerplikt.brukerregistrertAnsvar;
        let feilkodeFodselsdato = null;
        let ingenFeilKoder = true;
        for (let i = 0; i < barn.length; i++) {
            let barnet = barn[i];
            let fodselsdato: string | null = barnet.barn.fodselsdato;
            console.warn(barnet.barn.fodselsdato);

            if (fodselsdato === "") {
                barnet.barn.fodselsdato = null;
            }
            if (fodselsdato && fodselsdato !== "") {
                fodselsdato = konverterFraISODato(fodselsdato);
                feilkodeFodselsdato = fdato(fodselsdato);
                if (feilkodeFodselsdato) {
                    this.props.setValideringsfeil(feilkodeFodselsdato, TEXT_KEY_FNR + i);
                    ingenFeilKoder = false;
                } else {
                    this.props.clearValideringsfeil(TEXT_KEY_FNR + i);
                }

                if (!feilkodeFodselsdato && fodselsdato) {
                    fodselsdato = konverterTilISODato(fodselsdato);
                    barnet.barn.fodselsdato = fodselsdato;
                }
            } else {
                this.props.clearValideringsfeil(TEXT_KEY_FNR + i);
            }
        }
        if (ingenFeilKoder) {
            lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
        }
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
                            visible={this.state.synligeBarn[index].valueOf()}
                            arrow={false}
                            key={index}
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
                                                        getName={() => TEXT_KEY + "_fornavn_input" + index}
                                                        id={TEXT_KEY + "_fornavn_input" + index}
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
                                                        getName={() => TEXT_KEY + "_mellomnavn_input" + index}
                                                        id={TEXT_KEY + "_mellomnavn_input" + index}
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
                                                        getName={() => TEXT_KEY + "_etternavn_input" + index}
                                                        id={TEXT_KEY + "_etternavn_input" + index}
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
                                                        getName={() => TEXT_KEY_FNR + index}
                                                        id={TEXT_KEY_FNR + index}
                                                        maxLength={8}
                                                        minLength={8}
                                                        verdi={barnet.barn.fodselsdato ? konverterFraISODato(barnet.barn.fodselsdato) : ""}
                                                        onChange={(verdi: string) => this.oppdaterTekstfelt("fodselsdato", verdi, index)}
                                                        bredde="S"
                                                        onBlur={() => this.onBlur()}
                                                        faktumKey={TEXT_KEY_FNR + index}
                                                        textKey={TEXT_KEY_FNR}
                                                        required={true}
                                                    />
                                                </Column>
                                            </Row>
                                        </Container>
                                        <Detaljeliste>
                                            <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                                <JaNeiSporsmal
                                                    id={"brukerregistrert_brukerregistrert_barn_radio_" + index}
                                                    tekster={getFaktumSporsmalTekst(this.props.intl, "familie.barn.true.barn.borsammen")}
                                                    faktumKey={"familie.barn.true.barn.borsammen"}
                                                    verdi={barnet.borSammenMed}
                                                    onChange={(verdi: boolean) => this.onClickBorSammen(verdi, index)}
                                                    legendTittelStyle={LegendTittleStyle.NORMAL}

                                                />
                                            </div>
                                            {barnet.borSammenMed === false && (
                                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                                    <InputEnhanced
                                                        getName={() => "brukerregistrert_barn" + index + "_samvaersgrad"}
                                                        id={"brukerregistrert_barn" + index + "_samvaersgrad"}
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
                                            id={index + "_fjern_brukerregistrert_barn_lenke"}
                                        >
                                            Slett informasjon
                                        </Lenkeknapp>
                                    </div>
                                </div>
                            </Sporsmal>
                        </Underskjema>
                    )}
                    <div className="legg-til-barn-knapp">
                        <Lenkeknapp onClick={() => this.handleLeggTilBarn()} stil="add" id={"legg_til_brukerregistrert_barn_link"}>
                            Legg til barn som ikke er registrert
                        </Lenkeknapp>
                    </div>
                </div>
            </Sporsmal>
        );
    }

}

export default connectSoknadsdataContainer(injectIntl(BrukerregistrerteBarn));

