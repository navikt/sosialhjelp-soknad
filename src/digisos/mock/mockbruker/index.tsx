import {connect} from "react-redux";
import * as React from "react";
import {DispatchProps} from "../../redux/reduxTypes";
import {State} from "../../redux/reducers";
import {Radio, Select} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";
import {tilStart} from "../../redux/navigasjon/navigasjonActions";
import NyttArbeidsforhold, {ArbeidsforholdType, NyttArbeidsforholdObject} from "./mockComponents/nyttArbeidsforhold";
import * as mocksystemdata from "../mocksystemdata/mocksystemdata";
import {NyttBarn, NyttBarnObject} from "./mockComponents/nyttBarn";
import MockDataBolkWrapper from "./mockComponents/mockDataBolkWrapper";
import MockInput from "./mockComponents/mockInput";
import {fetchPost} from "../../../nav-soknad/utils/rest-utils";
import "whatwg-fetch";
import {NyBostotteUtbetaling, NyUtbetalingObject} from "./mockComponents/nyBostotteUtbetaling";
import {NyBostotteSak, NySakObject} from "./mockComponents/nyBostotteSak";
import {Hovedknapp} from "nav-frontend-knapper";
import {Sidetittel} from "nav-frontend-typografi";
import {
    NySkattetatenForskuddstrekkObject,
    NySkattetatenInntektObject,
    NyPeriodeOgUtbetaler,
    NySkattetatenUtbetaling
} from "./mockComponents/nySkattetatenUtbetaling";
import {NyNavUtbetaling, NyNavUtbetalingObject, NyNavYtelseObject} from "./mockComponents/nyNavUtbetaling";


interface OwnState {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    statsborgerskap: string;
    telefonnummer: boolean;
    telefonnummer_value: string;
    bankkonto: boolean;
    bankkonto_value: string;
    organisasjon: boolean;
    organisasjon_orgnummer: string;
    organisasjon_navn: string;
    arbeidsforhold: boolean;
    arbeidsforhold_liste: NyttArbeidsforholdObject[];
    ektefelle: boolean;
    ektefelle_foedselsnummer: string;
    ektefelle_fornavn: string;
    ektefelle_mellomnavn: string;
    ektefelle_etternavn: string;
    ektefelle_foedselsdato: string;
    ektefelle_medSammeBostedsadresse: boolean;
    ektefelle_medKode: string;
    barn: boolean;
    barn_liste: NyttBarnObject[];
    navUtbetaling: boolean;
    loading: boolean;
    bostotteUtbetalinger: boolean;
    periodeOgUtbetaler: NyPeriodeOgUtbetaler[];
    navUtbetalingsListe: NyNavUtbetalingObject[];
    harSkattetatenUtbetalinger: boolean;
    bostotteSaker: boolean;
    bostotteDto: {
        utbetalinger: NyUtbetalingObject[],
        saker: NySakObject[]
    };
    skatt_feiler: boolean;
    bostotte_feiler: boolean;
    navUtbetalinger_feiler: boolean;
}

interface StoreProps {
    mock_ident: string;
}

type Props = StoreProps & DispatchProps;


class MockBruker extends React.Component<Props, OwnState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            fornavn: "Han",
            mellomnavn: "",
            etternavn: "Solo",
            statsborgerskap: "NOR",
            telefonnummer: false,
            telefonnummer_value: "99887766",
            bankkonto: false,
            bankkonto_value: "12345678903",
            organisasjon: false,
            organisasjon_orgnummer: "123",
            organisasjon_navn: "Team Liquid",
            arbeidsforhold: false,
            arbeidsforhold_liste: [],
            ektefelle: false,
            ektefelle_foedselsnummer: "01017066655",
            ektefelle_fornavn: "Leia",
            ektefelle_mellomnavn: "",
            ektefelle_etternavn: "Skywalker",
            ektefelle_foedselsdato: "1970-01-01",
            ektefelle_medSammeBostedsadresse: true,
            ektefelle_medKode: "",
            barn: false,
            barn_liste: [],
            loading: false,
            bostotteUtbetalinger: false,
            periodeOgUtbetaler: [],
            navUtbetaling: false,
            navUtbetalingsListe: [],
            harSkattetatenUtbetalinger: false,
            bostotteSaker: false,
            bostotteDto: {
                utbetalinger: [],
                saker: []
            },
            skatt_feiler: false,
            bostotte_feiler: false,
            navUtbetalinger_feiler: false,
        }
    }

    handleLeggTilNyttArbeidsforhold(nyttArbeidsforhold: NyttArbeidsforholdObject) {
        const arbeidsforhold_liste = this.state.arbeidsforhold_liste;
        arbeidsforhold_liste.push(nyttArbeidsforhold);
        this.setState({arbeidsforhold_liste})
    }

    settInnListeOverArbeidsforhold() {
        const a: any = [];
        this.state.arbeidsforhold_liste.forEach((forhold: NyttArbeidsforholdObject, key: number) => {
            a.push(<div className="mock-thing" key={key}>{this.renderForholdRad(forhold, key)}</div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (<div className="mock-listOfThings">{a}</div>)
    }


    renderForholdRad(forhold: NyttArbeidsforholdObject, key: number) {
        return (
            <div>
                <div>{key + 1}</div>
                <div>Start dato: {forhold.startDato}</div>
                <div>Slutt dato: {forhold.sluttDato}</div>
                <div>Stillingsprosent: {forhold.stillingsProsent}</div>
                <div>
                    {forhold.type === ArbeidsforholdType.PERSON && <div>Ident: {forhold.ident}</div>}
                    {forhold.type === ArbeidsforholdType.ORGANISASJON && <div>Orgnummer: {forhold.orgnummer}</div>}
                </div>
                <button onClick={() => {
                    const list: NyttArbeidsforholdObject[] = this.state.arbeidsforhold_liste;
                    list.splice(key, key);
                    this.setState({arbeidsforhold_liste: list})
                }}>x
                </button>
            </div>
        )
    }

    handleLeggTilNyttBarn(nyttBarn: NyttBarnObject) {
        const barn_liste = this.state.barn_liste;
        barn_liste.push(nyttBarn);
        this.setState({barn_liste})
    }

    handleLeggTilNySkattetatebUtbetaling(kalendermaaned: string, orgNummer: number, nyInntekt: NySkattetatenInntektObject, nyTrekk: NySkattetatenForskuddstrekkObject | undefined) {
        const skattetatenManeder: NyPeriodeOgUtbetaler[] = this.state.periodeOgUtbetaler;
        let skattetatenManedList = skattetatenManeder.filter(it => it.kalendermaaned === kalendermaaned && it.opplysningspliktigId === orgNummer.toString());
        if (skattetatenManedList.length > 0) {
            if (nyInntekt.beloep.toString() !== "0") {
                skattetatenManedList[0].inntekt.push(nyInntekt);
            }
            if (nyTrekk) {
                skattetatenManedList[0].forskuddstrekk.push(nyTrekk);
            }
        } else {
            const skattetatenManed = new NyPeriodeOgUtbetaler();
            skattetatenManed.kalendermaaned = kalendermaaned;
            skattetatenManed.opplysningspliktigId = orgNummer.toString();
            if (nyInntekt.beloep.toString() !== "0") {
                skattetatenManed.inntekt.push(nyInntekt);
            }
            if (nyTrekk) {
                skattetatenManed.forskuddstrekk.push(nyTrekk);
            }
            skattetatenManeder.push(skattetatenManed);
        }
        this.setState({periodeOgUtbetaler: skattetatenManeder});
    }

    handleLeggTilNyUtbetaling(nyUtbetaling: NyUtbetalingObject) {
        const bostotteDto = {...this.state.bostotteDto};
        bostotteDto.utbetalinger.push(nyUtbetaling);
        this.setState({bostotteDto});
    }

    handleLeggTilNySak(nySak: NySakObject) {
        const bostotteDto = {...this.state.bostotteDto};
        bostotteDto.saker.push(nySak);
        this.setState({bostotteDto});
    }

    handleLeggTilNyNavUtbetaling(nyNavUtbetaling: NyNavUtbetalingObject, nyNavYtelse: NyNavYtelseObject) {
        const nyNavUtbetalingsListe = this.state.navUtbetalingsListe;
        let treffListe = nyNavUtbetalingsListe.filter(it =>
            it.forfallsdato === nyNavUtbetaling.forfallsdato
            && it.posteringsdato === nyNavUtbetaling.posteringsdato
            && it.utbetalingsdato === nyNavUtbetaling.utbetalingsdato);
        if (treffListe.length > 0) {
            const treff = treffListe[0];
            treff.ytelsesListe.push(nyNavYtelse);
        } else {
            nyNavUtbetaling.ytelsesListe.push(nyNavYtelse);
            nyNavUtbetalingsListe.push(nyNavUtbetaling);
        }
        this.setState({navUtbetalingsListe: nyNavUtbetalingsListe});
    }

    settInnListeOverBarn() {
        const a: any = [];
        this.state.barn_liste.forEach((barn: NyttBarnObject, key: number) => {
            a.push(<div className="mock-thing" key={key}>{this.renderBarnRad(barn, key)} </div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (
            <div className="mock-listOfThings">{a}</div>
        )
    }

    settInnListeOverSkattetatenUtbetalinger() {
        const a: any = [];
        this.state.periodeOgUtbetaler.forEach((periodeOgUtbetaler: NyPeriodeOgUtbetaler, key: number) => {
            a.push(<div className="mock-thing" key={key}>
                {this.renderPeriodeOgUtbetaler(periodeOgUtbetaler, key)}
            </div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (
            <div className="mock-listOfThings">{a}</div>
        )
    }


    settInnListeOverNavUtbetalinger() {
        const a: any = [];
        this.state.navUtbetalingsListe.forEach((navUtbetaling: NyNavUtbetalingObject, key: number) => {
            a.push(<div className="mock-thing" key={key}>
                {this.renderNavUtbetaling(navUtbetaling, key)}
            </div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (
            <div className="mock-listOfThings">{a}</div>
        )
    }

    settInnListeOverUtbetalinger() {
        const a: any = [];
        this.state.bostotteDto.utbetalinger.forEach((utbetaling: NyUtbetalingObject, key: number) => {
            a.push(<div className="mock-thing" key={key}>{this.renderUtbetalingRad(utbetaling, key)} </div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (
            <div className="mock-listOfThings">{a}</div>
        )
    }

    settInnListeOverSaker() {
        const a: any = [];
        this.state.bostotteDto.saker.forEach((sak: NySakObject, key: number) => {
            a.push(<div className="mock-thing" key={key}>{this.renderSakRad(sak, key)} </div>)
        });

        if (a.length === 0) {
            return (<div className="mock-listOfThings">...</div>)
        }

        return (
            <div className="mock-listOfThings">{a}</div>
        )
    }

    renderBarnRad(barn: NyttBarnObject, key: number) {
        return (
            <div className="mock-liste-of-things">
                <div>{key + 1}</div>
                <div>Fødselsnummer: {barn.ident}</div>
                <div>Fornavn: {barn.fornavn}</div>
                <div>Mellomnavn: {barn.mellomnavn}</div>
                <div>Etternavn: {barn.etternavn}</div>
                {barn.sammeBostedsadresse && <div>samme bostedsadresse</div>}
                {!barn.sammeBostedsadresse && <div>ikke samme bostedsadresse</div>}
                {barn.doedsdato && <div>Har doedsdato: {barn.doedsdato_value}</div>}
                <button onClick={() => {
                    const list: NyttBarnObject[] = this.state.barn_liste;
                    list.splice(key, 1);
                    this.setState({barn_liste: list})
                }}>x
                </button>
            </div>
        )
    }


    private renderNavUtbetaling(navUtbetaling: NyNavUtbetalingObject, utbetalingsKey: number) {
        const ytelser: any = [];
        navUtbetaling.ytelsesListe.forEach((ytelse: NyNavYtelseObject, key: number) => {
            ytelser.push(<div className="mock-liste-of-things">
                <div>Beløp: {ytelse.ytelseskomponentbeloep}</div>
                <div>Type: {ytelse.ytelsestype}</div>
                <button onClick={() => {
                    let state = {...this.state};
                    state.navUtbetalingsListe[utbetalingsKey].ytelsesListe.splice(key, 1);
                    this.setState(state)
                }}>x
                </button>
            </div>);
        })
        return (
            <div className="mock-liste-of-things">
                <div>Utbetalingsdato: {navUtbetaling.utbetalingsdato}</div>
                {ytelser}
                <button onClick={() => {
                    let state = {...this.state};
                    state.navUtbetalingsListe.splice(utbetalingsKey, 1);
                    this.setState(state)
                }}>x
                </button>
            </div>
        )
    }

    renderPeriodeOgUtbetaler(periodeOgUtbetaler: NyPeriodeOgUtbetaler, periodeKey: number) {
        const inttekter: any = [];
        const trekk: any = [];
        periodeOgUtbetaler.inntekt.forEach((inntekt: NySkattetatenInntektObject, key: number) => {
            inttekter.push(<div className="mock-thing" key={key}>
                {this.renderSkattetatenInntektRad(inntekt, periodeKey, key)}
            </div>)
        });
        periodeOgUtbetaler.forskuddstrekk.forEach((etTrekk: NySkattetatenForskuddstrekkObject, key: number) => {
            trekk.push(<div className="mock-thing" key={key}>
                {this.renderSkattetatenForskuddstrekkRad(etTrekk, periodeKey, key)}
            </div>)
        });
        return (
            <div className="mock-liste-of-things">
                <div>Måned: {periodeOgUtbetaler.kalendermaaned}</div>
                <div>OrgNummer: {periodeOgUtbetaler.opplysningspliktigId}</div>
                <div>Inntekter:</div>
                {inttekter}
                <div>Fratrekk:</div>
                {trekk}
                <button onClick={() => {
                    let state = {...this.state};
                    state.periodeOgUtbetaler.splice(periodeKey, 1);
                    this.setState(state)
                }}>x
                </button>
            </div>
        )
    }

    renderSkattetatenInntektRad(inntekt: NySkattetatenInntektObject, periodeKey: number, key: number) {
        return (
            <div className="mock-liste-of-things">
                <div>Beløp: {inntekt.beloep}</div>
                <button onClick={() => {
                    const state = {...this.state};
                    state.periodeOgUtbetaler[periodeKey].inntekt.splice(key, 1);
                    this.setState(state)
                }}>x
                </button>
            </div>
        )
    }

    renderSkattetatenForskuddstrekkRad(trekk: NySkattetatenForskuddstrekkObject, periodeKey: number, key: number) {
        return (
            <div className="mock-liste-of-things">
                <div>Forskuddstrekk: {trekk.beloep}</div>
                <button onClick={() => {
                    const state = {...this.state};
                    state.periodeOgUtbetaler[periodeKey].forskuddstrekk.splice(key, 1);
                    this.setState(state)
                }}>x
                </button>
            </div>
        )
    }

    renderUtbetalingRad(utbetaling: NyUtbetalingObject, key: number) {
        return (
            <div className="mock-liste-of-things">
                <div>Dato: {utbetaling.utbetalingsdato}</div>
                <div>Beløp: {utbetaling.belop}</div>
                <div>Mottaker: {utbetaling.mottaker}</div>
                <button onClick={() => {
                    const bostotteDto = {...this.state.bostotteDto};
                    bostotteDto.utbetalinger.splice(key, 1);
                    this.setState({bostotteDto})
                }}>x
                </button>
            </div>
        )
    }

    renderSakRad(sak: NySakObject, key: number) {
        return (
            <div className="mock-liste-of-things">
                <div>År: {sak.ar}</div>
                <div>Måned: {sak.mnd}</div>
                <div>Status: {sak.status}</div>
                {sak.status === "VEDTATT" && sak.vedtak &&
                <div>Vedtak: {sak.vedtak.type} - {sak.vedtak.beskrivelse}</div>
                }
                <button onClick={() => {
                    const bostotteDto = {...this.state.bostotteDto};
                    bostotteDto.saker.splice(key, 1);
                    this.setState({bostotteDto})
                }}>x
                </button>
            </div>
        )
    }

    start() {

        // Sett navn
        mocksystemdata.settNavn(this.state.fornavn, this.state.mellomnavn, this.state.etternavn);
        mocksystemdata.settStatsborgerskap(this.state.statsborgerskap);

        // Sett ident
        mocksystemdata.settIdent(this.props.mock_ident);

        // Sett adresse

        // Sett telefonnummer
        if (this.state.telefonnummer) {
            mocksystemdata.settTelefonnummer(this.state.telefonnummer_value);
        } else {
            mocksystemdata.settTelefonnummer("");
        }

        // Sett bankkonto
        if (this.state.bankkonto) {
            mocksystemdata.settBankkontonummer(this.state.bankkonto_value);
        } else {
            mocksystemdata.settBankkontonummer("");
        }

        // Sett organisasjon
        if (this.state.organisasjon) {
            mocksystemdata.settOrganisasjon(this.state.organisasjon_orgnummer, this.state.organisasjon_navn);
        } else {
            mocksystemdata.clearOrganisasjon();
        }


        // Sett arbeidsforhold
        if (this.state.arbeidsforhold) {
            if (this.state.arbeidsforhold_liste.length > 0) {
                this.state.arbeidsforhold_liste.forEach((forhold: NyttArbeidsforholdObject, key: number) => {
                    if (forhold.type === ArbeidsforholdType.PERSON) {
                        mocksystemdata.settArbeidsforholdArbeidsgiverPerson(forhold.id, forhold.startDato, forhold.sluttDato, forhold.stillingsProsent, forhold.ident);
                    }
                    if (forhold.type === ArbeidsforholdType.ORGANISASJON) {
                        mocksystemdata.settArbeidsforholdArbeidsgiverOrganisasjon(forhold.id, forhold.startDato, forhold.sluttDato, forhold.stillingsProsent, forhold.orgnummer);
                    }
                })
            }
        } else {
            mocksystemdata.clearArbeidsforhold();
        }

        // Sett ektefelle
        if (this.state.ektefelle) {

            if (this.state.ektefelle_medKode.length > 0) {
                if (this.state.ektefelle_medKode === "6") {
                    mocksystemdata.settEktefelleMedKodeSeks(
                        this.state.ektefelle_foedselsnummer,
                        this.state.ektefelle_fornavn,
                        this.state.ektefelle_mellomnavn,
                        this.state.ektefelle_etternavn,
                        this.state.ektefelle_foedselsdato
                    )
                }
                if (this.state.ektefelle_medKode === "7") {
                    mocksystemdata.settEktefelleMedKodeSyv(
                        this.state.ektefelle_foedselsnummer,
                        this.state.ektefelle_fornavn,
                        this.state.ektefelle_mellomnavn,
                        this.state.ektefelle_etternavn,
                        this.state.ektefelle_foedselsdato
                    )
                }

            } else {
                if (this.state.ektefelle_medSammeBostedsadresse) {
                    mocksystemdata.settEktefelleMedSammeBostedsadresse(
                        this.state.ektefelle_foedselsnummer,
                        this.state.ektefelle_fornavn,
                        this.state.ektefelle_mellomnavn,
                        this.state.ektefelle_etternavn,
                        this.state.ektefelle_foedselsdato
                    )
                } else {
                    mocksystemdata.settEktefelleUtenSammeBostedsadresse(
                        this.state.ektefelle_foedselsnummer,
                        this.state.ektefelle_fornavn,
                        this.state.ektefelle_mellomnavn,
                        this.state.ektefelle_etternavn,
                        this.state.ektefelle_foedselsdato
                    )
                }
            }
        }

        // Sett barn
        if (this.state.barn) {
            this.state.barn_liste.forEach((barn: NyttBarnObject, key: number) => {
                if (barn.doedsdato) {
                    mocksystemdata.settBarnMedDoedsdato(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn, barn.doedsdato_value);
                } else {
                    if (barn.sammeBostedsadresse) {
                        mocksystemdata.settBarnSammeBostedsadresse(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn);
                    } else {
                        mocksystemdata.settBarnIkkeSammeBostedsadresse(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn);
                    }
                }
            })
        }

        let navUtbetalingerStreng = "";
        if (this.state.navUtbetaling) {
            mocksystemdata.leggTilNavUtbetaling(this.state.navUtbetalingsListe);
            navUtbetalingerStreng = JSON.stringify(mocksystemdata.getNavUtbetalingJson());
        }

        if (this.state.bostotteUtbetalinger) {
            mocksystemdata.leggTilBostotteUtbetalinger(this.state.bostotteDto.utbetalinger);
        }

        let skattetatenStreng = "{}";
        if (this.state.harSkattetatenUtbetalinger) {
            mocksystemdata.leggTilSkattetatenUtbetalinger(this.state.periodeOgUtbetaler);
            skattetatenStreng = JSON.stringify(mocksystemdata.getSkattetatenJson());
        }

        if (this.state.bostotteSaker) {
            mocksystemdata.leggTilBostotteSaker(this.state.bostotteDto.saker);
        }

        this.setState({loading: true});
        Promise.all([
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getTelefonPath(), JSON.stringify(mocksystemdata.getTelefonJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getFamiliePath(), JSON.stringify(mocksystemdata.getFamilieJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getBrukerprofilPath(), JSON.stringify(mocksystemdata.getBrukerprofilJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getOrganisasjonPath(), JSON.stringify(mocksystemdata.getOrganisasjonJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getArbeidPath(), JSON.stringify(mocksystemdata.getArbeidJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getUtbetalingPath(), navUtbetalingerStreng),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getUtbetalingPath() + "_feiler", JSON.stringify(this.state.navUtbetalinger_feiler)),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getSkattetatenPath(), skattetatenStreng),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getSkattetatenPath() + "_feiler", JSON.stringify(this.state.skatt_feiler)),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getBostottePath(), JSON.stringify(mocksystemdata.getBostotteJson())),
            fetchPost("internal/mock/tjeneste/" + mocksystemdata.getBostottePath() + "_feiler", JSON.stringify(this.state.bostotte_feiler)),
        ]).then(() => {
            this.props.dispatch(tilStart());
        });

    }

    render() {

        return (
            <div className="mock-body">
                <div className="mock-egendefinert-section">
                    <div className={"mock-bruker-luft-over"}>
                        <Sidetittel>Mock systemdata for bruker</Sidetittel>
                    </div>

                    <MockDataBolkWrapper tittel="Personalia">
                        <MockInput label="Fornavn:" onChange={(evt: any) => this.setState({fornavn: evt.target.value})}
                                   value={this.state.fornavn}/>
                        <MockInput label="Mellomnavn:"
                                   onChange={(evt: any) => this.setState({mellomnavn: evt.target.value})}
                                   value={this.state.mellomnavn}/>
                        <MockInput label="Etternavn:"
                                   onChange={(evt: any) => this.setState({etternavn: evt.target.value})}
                                   value={this.state.etternavn}/>
                        <Select label='Statsborgerskap:'
                                defaultValue="NOR"
                                onChange={(evt: any) => this.setState({statsborgerskap: evt.target.value})}>
                            <option value="NOR" key="NOR">NOR</option>
                            <option value="SWE" key="SWE">SWE</option>
                            <option value="DEN" key="DEN">DEN</option>
                            <option value="GER" key="GER">GER</option>
                            <option value="USA" key="USA">USA</option>
                            <option value="xxx" key="xxx">xxx (Statsløs)</option>
                            <option value="???" key="???">??? (Mangler opplysninger)</option>
                        </Select>
                    </MockDataBolkWrapper>

                    {/*<div className="mock-data-bolk">*/}
                    {/*Midlertidig Adresse:*/}
                    {/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Nei})} label='Nei' name='midlertidigPostadresse' value={'nei'} defaultChecked={true} />*/}
                    {/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Default})} label='Ja, defaultadresse' name='midlertidigPostadresse' value={'default'} />*/}
                    {/*</div>*/}

                    <MockDataBolkWrapper tittel="Telefonnummer" value={this.state.telefonnummer}
                                         callback={(value: boolean) => this.setState({telefonnummer: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.telefonnummer}>
                            <MockInput label="Telefonnummer:"
                                       onChange={(evt: any) => this.setState({telefonnummer_value: evt.target.value})}
                                       value={this.state.telefonnummer_value}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Bankkontonummer" value={this.state.bankkonto}
                                         callback={(value: boolean) => this.setState({bankkonto: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.bankkonto}>
                            <MockInput label="Bankkontonummer:"
                                       onChange={(evt: any) => this.setState({bankkonto_value: evt.target.value})}
                                       value={this.state.bankkonto_value}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Organisasjon" value={this.state.organisasjon}
                                         callback={(value: boolean) => this.setState({organisasjon: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.organisasjon}>
                            <MockInput label="Orgnummer:"
                                       onChange={(evt: any) => this.setState({organisasjon_orgnummer: evt.target.value})}
                                       value={this.state.organisasjon_orgnummer}/>
                            <MockInput label="Navn:"
                                       onChange={(evt: any) => this.setState({organisasjon_navn: evt.target.value})}
                                       value={this.state.organisasjon_navn}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Arbeidsforhold" value={this.state.arbeidsforhold}
                                         callback={(value: boolean) => this.setState({arbeidsforhold: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.arbeidsforhold}>
                            <div className="mock-listOfThings-tittel">Liste over arbeidsforhold som er lagt til.</div>
                            {this.settInnListeOverArbeidsforhold()}
                            <NyttArbeidsforhold
                                onLeggTilNyttArbeidsforhold={(nyttArbeidsForhold: NyttArbeidsforholdObject) => this.handleLeggTilNyttArbeidsforhold(nyttArbeidsForhold)}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Ektefelle" value={this.state.ektefelle}
                                         callback={(value: boolean) => this.setState({ektefelle: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.ektefelle}>

                            <MockInput label="Fornavn:"
                                       onChange={(evt: any) => this.setState({ektefelle_fornavn: evt.target.value})}
                                       value={this.state.ektefelle_fornavn}/>
                            <MockInput label="Mellomnavn:"
                                       onChange={(evt: any) => this.setState({ektefelle_mellomnavn: evt.target.value})}
                                       value={this.state.ektefelle_mellomnavn}/>
                            <MockInput label="Etternavn:"
                                       onChange={(evt: any) => this.setState({ektefelle_etternavn: evt.target.value})}
                                       value={this.state.ektefelle_etternavn}/>

                            <div className="mock-radiogroup">
                                <div className="mock-block-tittel">
                                    Har samme bostedsadresse:
                                </div>
                                <div className="mock-radiogroup">
                                    <Radio onChange={() => this.setState({ektefelle_medSammeBostedsadresse: true})}
                                           label='Ja' name='samme_bostedsadresse' value={'ja'} defaultChecked={true}/>
                                    <Radio onChange={() => this.setState({ektefelle_medSammeBostedsadresse: false})}
                                           label='Nei' name='samme_bostedsadresse' value={'nei'}/>
                                </div>
                            </div>
                            <div className="mock-radiogroup">
                                <div>
                                    Har kode 6 eller 7
                                </div>
                                <div className="mock-radiogroup">
                                    <Radio onChange={() => this.setState({ektefelle_medKode: ""})} label='Nei'
                                           name='diskresjonskode' value={''} defaultChecked={true}/>
                                    <Radio onChange={() => this.setState({ektefelle_medKode: "6"})} label='6'
                                           name='diskresjonskode' value={'6'}/>
                                    <Radio onChange={() => this.setState({ektefelle_medKode: "7"})} label='7'
                                           name='diskresjonskode' value={'7'}/>
                                </div>
                            </div>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Barn" value={this.state.barn}
                                         callback={(value: boolean) => this.setState({barn: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.barn}>
                            <div className="mock-listOfThings-tittel">Liste over barn som er lagt til:</div>
                            {this.settInnListeOverBarn()}
                            <NyttBarn
                                onLeggTilNyttBarn={(nyttBarn: NyttBarnObject) => this.handleLeggTilNyttBarn(nyttBarn)}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Skattetaten utbetalinger" value={this.state.harSkattetatenUtbetalinger}
                                         callback={(value: boolean) => this.setState({harSkattetatenUtbetalinger: value})}
                                         booleanText_true=" (Nå settes det her.)"
                                         booleanText_false="(Nå brukes standard verdier.)"
                    >
                        <Collapse className="mock-block-collapse" isOpened={this.state.harSkattetatenUtbetalinger}>
                            <div className="mock-listOfThings-tittel">Liste over utbetalinger som er lagt til:</div>
                            {this.settInnListeOverSkattetatenUtbetalinger()}
                            <NySkattetatenUtbetaling
                                onLeggTilNyUtbetaling={(maned: string, orgNummer: number, nyUtbetaling: NySkattetatenInntektObject, nyTrekk: NySkattetatenForskuddstrekkObject | undefined) =>
                                    this.handleLeggTilNySkattetatebUtbetaling(maned, orgNummer, nyUtbetaling, nyTrekk)}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Skal Skatteetaten feile?"
                                         value={this.state.skatt_feiler}
                                         callback={(value: boolean) => this.setState({skatt_feiler: value})}
                                         booleanText_true="Ja!" booleanText_false="Nei."
                    >
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Bostøtte utbetalinger" value={this.state.bostotteUtbetalinger}
                                         callback={(value: boolean) => this.setState({bostotteUtbetalinger: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.bostotteUtbetalinger}>
                            <div className="mock-listOfThings-tittel">Liste over utbetalinger som er lagt til:</div>
                            {this.settInnListeOverUtbetalinger()}
                            <NyBostotteUtbetaling
                                onLeggTilNyUtbetaling={(nyUtbetaling: NyUtbetalingObject) => this.handleLeggTilNyUtbetaling(nyUtbetaling)}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Bostøtte saker" value={this.state.bostotteSaker}
                                         callback={(value: boolean) => this.setState({bostotteSaker: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.bostotteSaker}>
                            <div className="mock-listOfThings-tittel">Liste over saker som er lagt til:</div>
                            {this.settInnListeOverSaker()}
                            <NyBostotteSak onLeggTilNySak={(nySak: NySakObject) => this.handleLeggTilNySak(nySak)}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Skal bostøtte feile?"
                                         value={this.state.bostotte_feiler}
                                         callback={(value: boolean) => this.setState({bostotte_feiler: value})}
                                         booleanText_true="Ja!" booleanText_false="Nei."
                    >
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Utbetalinger fra NAV" value={this.state.navUtbetaling}
                                         callback={(value: boolean) => this.setState({navUtbetaling: value})}>
                        <Collapse className="mock-block-collapse" isOpened={this.state.navUtbetaling}>
                            <div className="mock-listOfThings-tittel">Liste over utbetalinger som er lagt til:</div>
                            {this.settInnListeOverNavUtbetalinger()}
                            <NyNavUtbetaling
                                onLeggTilNyNavUtbetaling={(nyNavUtbetaling: NyNavUtbetalingObject, nyNavYtelse: NyNavYtelseObject) =>
                                    (this.handleLeggTilNyNavUtbetaling(nyNavUtbetaling, nyNavYtelse))}/>
                        </Collapse>
                    </MockDataBolkWrapper>

                    <MockDataBolkWrapper tittel="Skal utbetalinger fra NAV feile?"
                                         value={this.state.navUtbetalinger_feiler}
                                         callback={(value: boolean) => this.setState({navUtbetalinger_feiler: value})}
                                         booleanText_true="Ja!" booleanText_false="Nei."
                    >
                    </MockDataBolkWrapper>

                    <div className={"mock-bruker-go-knapp-wrapper"}>
                        <Hovedknapp
                            id="login-button"
                            spinner={this.state.loading}
                            disabled={this.state.loading}
                            onClick={() => this.start()}
                        >
                            Sett systemdata og gå til søknaden
                        </Hovedknapp>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state: State, props: any) => {
    return {
        mock_ident: state.mockData.ident
    };
})(MockBruker);


