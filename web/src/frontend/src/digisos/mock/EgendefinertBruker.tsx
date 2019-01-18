import {connect} from "react-redux";
import * as React from "react";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {State} from "../redux/reducers";
import {Radio} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import NyttArbeidsforhold, {
	ArbeidsforholdType,
	NyttArbeidsforholdObject
} from "./mockComponents/nyttArbeidsforhold";
import * as systemdatamock from "soknadsosialhjelp-mocksystemdata";
import {NyttBarn, NyttBarnObject} from "./mockComponents/nyttBarn";
import MockDataBolkWrapper from "./mockComponents/mockDataBolkWrapper";
import MockInput from "./mockComponents/mockInput";
import {fetchPost} from "../../nav-soknad/utils/rest-utils";


interface StateProps {
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
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
	utbetalinger: string;
}

type Props = StateProps & DispatchProps;


class EgendefinertBruker extends React.Component<Props,StateProps> {

	constructor(props: Props){
		super(props);
		this.state = {
			fornavn: "Han",
			mellomnavn: "",
			etternavn: "Solo",
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
			utbetalinger: "ingen"
		}
	}

	handleLeggTilNyttArbeidsforhold(nyttArbeidsforhold: NyttArbeidsforholdObject){
		const arbeidsforhold_liste = this.state.arbeidsforhold_liste;
		arbeidsforhold_liste.push(nyttArbeidsforhold);
		this.setState({arbeidsforhold_liste})
	}

	settInnListeOverArbeidsforhold(){
		const a: any = [];
		this.state.arbeidsforhold_liste.forEach((forhold: NyttArbeidsforholdObject, key: number) => {
			a.push(<div className="mock-thing" key={key}>{ this.renderForholdRad(forhold, key) }</div>)
		});

		if (a.length === 0){
			return (<div className="mock-listOfThings">...</div>)
		}

		return (<div className="mock-listOfThings">{ a }</div>)
	}



	renderForholdRad(forhold: NyttArbeidsforholdObject, key: number){
		return (
			<div>
				<div>{ key + 1 }</div>
				<div>Start dato: { forhold.startDato }</div>
				<div>Slutt dato: { forhold.sluttDato }</div>
				<div>Stillingsprosent: { forhold.stillingsProsent}</div>
				<div>
					{ forhold.type === ArbeidsforholdType.NAVN && <div>Navn: { forhold.navn}, Arbeidsgivernummer: {forhold.arbeidsgivernummer}</div>}
					{ forhold.type === ArbeidsforholdType.IDENT && <div>Ident: {forhold.ident}</div>}
					{ forhold.type === ArbeidsforholdType.ORGANISASJON && <div>Orgnummer: {forhold.orgnummer}</div>}
				</div>
				<button onClick={() => {
					const list: NyttArbeidsforholdObject[] = this.state.arbeidsforhold_liste;
					list.splice(key, key);
					this.setState({arbeidsforhold_liste: list})
				}}>x</button>
			</div>
		)
	}

	handleLeggTilNyttBarn(nyttBarn: NyttBarnObject){
		const barn_liste = this.state.barn_liste;
		barn_liste.push(nyttBarn);
		this.setState({barn_liste})
	}

	settInnListeOverBarn(){
		const a: any = [];
		this.state.barn_liste.forEach((barn: NyttBarnObject, key: number) => {
			a.push(<div className="mock-thing" key={key}>{this.renderBarnRad(barn, key)} </div>)
		});

		if (a.length === 0){
			return (<div className="mock-listOfThings">...</div>)
		}

		return (
			<div className="mock-listOfThings">{ a }</div>
		)
	}

	renderBarnRad(barn: NyttBarnObject, key: number){

		return (
			<div>
				<div>{ key + 1 }</div>
				<div>Fødselsnummer: { barn.ident }</div>
				<div>Fornavn: { barn.fornavn }</div>
				<div>Mellomnavn: { barn.mellomnavn }</div>
				<div>Etternavn: { barn.etternavn }</div>
				{ barn.sammeBostedsadresse && <div>samme bostedsadresse</div>}
				{ !barn.sammeBostedsadresse && <div>ikke samme bostedsadresse</div>}
				{ barn.doedsdato && <div>Har doedsdato: {barn.doedsdato_value}</div> }
				<button onClick={() => {
					const list: NyttBarnObject[] = this.state.barn_liste;
					list.splice(key, key);
					this.setState({barn_liste: list})
				}}>x</button>
			</div>
		)
	}

	start(){

		// Sett navn
		systemdatamock.settNavn(this.state.fornavn, this.state.mellomnavn, this.state.etternavn);

		// Sett adresse

		// Sett telefonnummer
		if (this.state.telefonnummer){
			systemdatamock.settTelefonnummer(this.state.telefonnummer_value);
		} else {
			systemdatamock.settTelefonnummer(null);
		}

		// Sett bankkonto
		if (this.state.bankkonto){
			systemdatamock.settBankkontonummer(this.state.bankkonto_value);
		} else {
			systemdatamock.settBankkontonummer(null);
		}

		// Sett organisasjon
		if (this.state.organisasjon){
			systemdatamock.settOrganisasjon(this.state.organisasjon_orgnummer, this.state.organisasjon_navn);
		} else {
			systemdatamock.clearOrganisasjon();
		}


		// Sett arbeidsforhold
		if (this.state.arbeidsforhold){
			if (this.state.arbeidsforhold_liste.length > 0){
				this.state.arbeidsforhold_liste.forEach((forhold: NyttArbeidsforholdObject, key: number) => {
					if (forhold.type === ArbeidsforholdType.NAVN){
						systemdatamock.settArbeidsforholdMedArbeidsgivernummer(forhold.startDato, forhold.sluttDato, forhold.stillingsProsent, forhold.arbeidsgivernummer, forhold.navn);
					}
					if (forhold.type === ArbeidsforholdType.IDENT){
						systemdatamock.settArbeidsforholdMedIdent(forhold.startDato, forhold.sluttDato, forhold.stillingsProsent, forhold.ident);
					}
					if (forhold.type === ArbeidsforholdType.ORGANISASJON){
						systemdatamock.settArbeidsforholdMedOrganisasjonsnummer(forhold.startDato, forhold.sluttDato, forhold.stillingsProsent, forhold.orgnummer);
					}
				})
			}
		} else {
			systemdatamock.clearArbeidsforhold();
		}

		// Sett ektefelle
		if(this.state.ektefelle){

			if (this.state.ektefelle_medKode.length > 0) {
				if (this.state.ektefelle_medKode === "6"){
					systemdatamock.settEktefelleMedKodeSeks(
						this.state.ektefelle_foedselsnummer,
						this.state.ektefelle_fornavn,
						this.state.ektefelle_mellomnavn,
						this.state.ektefelle_etternavn,
						this.state.ektefelle_foedselsdato
					)
				}
				if (this.state.ektefelle_medKode === "7"){
					systemdatamock.settEktefelleMedKodeSyv(
						this.state.ektefelle_foedselsnummer,
						this.state.ektefelle_fornavn,
						this.state.ektefelle_mellomnavn,
						this.state.ektefelle_etternavn,
						this.state.ektefelle_foedselsdato
					)
				}

			} else {
				if (this.state.ektefelle_medSammeBostedsadresse) {
					systemdatamock.settEktefelleMedSammeBostedsadresse(
						this.state.ektefelle_foedselsnummer,
						this.state.ektefelle_fornavn,
						this.state.ektefelle_mellomnavn,
						this.state.ektefelle_etternavn,
						this.state.ektefelle_foedselsdato
						)
				} else {
					systemdatamock.settEktefelleUtenSammeBostedsadresse(
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
		if(this.state.barn){
			this.state.barn_liste.forEach((barn: NyttBarnObject, key: number) => {
				if (barn.doedsdato){
					systemdatamock.settBarnMedDoedsdato(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn, barn.doedsdato_value);
				} else {
					if (barn.sammeBostedsadresse){
						systemdatamock.settBarnSameBostedsadresse(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn);
					} else {
						systemdatamock.settBarnIkkeSameBostedsadresse(barn.ident, barn.fornavn, barn.mellomnavn, barn.etternavn);
					}
				}
			})
		}

		// Sett utbetalinger
		if(this.state.utbetalinger === 'barn'){
			systemdatamock.settUtbetalingerBarnetrygd();
		}
		if(this.state.utbetalinger === 'onkel'){
			systemdatamock.settUtbetalingerOnkelSkruePenger();
		}
		if(this.state.utbetalinger === 'begge'){
			systemdatamock.settUtbetalingerBarnetrygd();
			systemdatamock.settUtbetalingerOnkelSkruePenger();
		}

		Promise.all([
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getTelefonPath(), JSON.stringify(systemdatamock.getTelefonJson())),
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getFamiliePath(), JSON.stringify(systemdatamock.getFamilieJson())),
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getBrukerprofilPath(), JSON.stringify(systemdatamock.getBrukerprofilJson())),
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getOrganisasjonPath(), JSON.stringify(systemdatamock.getOrganisasjonJson())),
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getArbeidPath(), JSON.stringify(systemdatamock.getArbeidJson())),
			fetchPost("internal/mock/tjeneste/" + systemdatamock.getUtbetalingPath(), JSON.stringify(systemdatamock.getUtbetalingJson()))
		]).then(() => {
			this.props.dispatch(tilStart());
		});
	}

	render(){

		return(
			<div className="mock-egendefinert-section">
				<h2>Egendefinert Bruker</h2>

				<MockDataBolkWrapper tittel="Personalia">
					<MockInput label="Fornavn:" onChange={(evt: any) => this.setState({fornavn: evt.target.value})} value={this.state.fornavn} />
					<MockInput label="Mellomnavn:" onChange={(evt: any) => this.setState({mellomnavn: evt.target.value})} value={this.state.mellomnavn} />
					<MockInput label="Etternavn:" onChange={(evt: any) => this.setState({etternavn: evt.target.value})} value={this.state.etternavn} />
				</MockDataBolkWrapper>

				{/*<div className="mock-data-bolk">*/}
					{/*Midlertidig Adresse:*/}
					{/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Nei})} label='Nei' name='midlertidigPostadresse' value={'nei'} defaultChecked={true} />*/}
					{/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Default})} label='Ja, defaultadresse' name='midlertidigPostadresse' value={'default'} />*/}
				{/*</div>*/}

				<MockDataBolkWrapper tittel="Telefonnummer">
					<Radio onChange={() => this.setState({telefonnummer: false})} label='Nei' name='telefonnummer' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({telefonnummer: true})} label='Ja' name='telefonnummer' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.telefonnummer}>
						<MockInput label="Telefonnummer:" onChange={(evt: any) => this.setState({telefonnummer_value: evt.target.value})} value={this.state.telefonnummer_value}/>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Bankkontonummer">
					<Radio onChange={() => this.setState({bankkonto: false})} label='Nei' name='bankkonto' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({bankkonto: true})} label='Ja' name='bankkonto' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.bankkonto}>
						<MockInput label="Bankkontonummer:" onChange={(evt: any) => this.setState({bankkonto_value: evt.target.value})} value={this.state.bankkonto_value}/>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Organisasjon">
					<Radio onChange={() => this.setState({organisasjon: false})} label="Nei" name="organisasjon" value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({organisasjon: true})} label='Ja' name='organisasjon' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.organisasjon}>
						<MockInput label="Orgnummer:" onChange={(evt:any) => this.setState({organisasjon_orgnummer: evt.target.value})} value={this.state.organisasjon_orgnummer}/>
						<MockInput label="Navn:" onChange={(evt:any) => this.setState({organisasjon_navn: evt.target.value})} value={this.state.organisasjon_navn}/>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Arbeidsforhold">
					<Radio onChange={() => this.setState({arbeidsforhold: false})} label='Nei' name='arbeidsforhold' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({arbeidsforhold: true})} label='Ja' name='arbeidsforhold' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.arbeidsforhold}>
						<div className="mock-listOfThings-tittel">Liste over arbeidsforhold som er lagt til. </div>
						{ this.settInnListeOverArbeidsforhold()}
						<NyttArbeidsforhold onLeggTilNyttArbeidsforhold={(nyttArbeidsForhold: NyttArbeidsforholdObject) => this.handleLeggTilNyttArbeidsforhold(nyttArbeidsForhold)}/>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Ektefelle">
					<Radio onChange={() => this.setState({ektefelle: false})} label='Nei' name='ektefelle' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({ektefelle: true})} label='Ja' name='ektefelle' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.ektefelle}>

						<MockInput label="Fødselsnummer:" onChange={(evt: any) => this.setState({ektefelle_foedselsnummer: evt.target.value})} value={this.state.ektefelle_foedselsnummer}/>
						<MockInput label="Fornavn:" onChange={(evt: any) => this.setState({ektefelle_fornavn: evt.target.value})} value={this.state.ektefelle_fornavn}/>
						<MockInput label="Mellomnavn:" onChange={(evt: any) => this.setState({ektefelle_mellomnavn: evt.target.value})} value={this.state.ektefelle_mellomnavn}/>
						<MockInput label="Etternavn:" onChange={(evt: any) => this.setState({ektefelle_etternavn: evt.target.value})} value={this.state.ektefelle_etternavn}/>
						<MockInput label="Fødselsdato:" onChange={(evt: any) => this.setState({ektefelle_foedselsdato: evt.target.value})} value={this.state.ektefelle_foedselsdato}/>

						<div className="mock-radiogroup">
							<div className="mock-block-tittel">
								Har samme bostedsadresse:
							</div>
							<div className="mock-radiogroup">
								<Radio onChange={() => this.setState({ektefelle_medSammeBostedsadresse: true})} label='Ja' name='samme_bostedsadresse' value={'ja'} defaultChecked={true} />
								<Radio onChange={() => this.setState({ektefelle_medSammeBostedsadresse: false})} label='Nei' name='samme_bostedsadresse' value={'nei'} />
							</div>
						</div>
						<div className="mock-radiogroup">
							<div>
								Har kode 6 eller 7
							</div>
							<div className="mock-radiogroup">
								<Radio onChange={() => this.setState({ektefelle_medKode: ""})} label='Nei' name='diskresjonskode' value={''} defaultChecked={true}/>
								<Radio onChange={() => this.setState({ektefelle_medKode: "6"})} label='6' name='diskresjonskode' value={'6'} />
								<Radio onChange={() => this.setState({ektefelle_medKode: "7"})} label='7' name='diskresjonskode' value={'7'} />
							</div>
						</div>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Barn">
					<Radio onChange={() => this.setState({barn: false})} label='Nei' name='barn' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({barn: true})} label='Ja' name='barn' value={'ja'} />
					<Collapse className="mock-block-collapse" isOpened={this.state.barn}>
						<div className="mock-listOfThings-tittel">Liste over barn som er lagt til: </div>
						{ this.settInnListeOverBarn()}
						<NyttBarn onLeggTilNyttBarn={(nyttBarn: NyttBarnObject) => this.handleLeggTilNyttBarn(nyttBarn)}/>
					</Collapse>
				</MockDataBolkWrapper>

				<MockDataBolkWrapper tittel="Utbetalinger">
					<Radio onChange={() => this.setState({utbetalinger: 'ingen'})} label={'Ingen'} name={'utbetalinger'} value={'ingen'} defaultChecked={true}/>
					<Radio onChange={() => this.setState({utbetalinger: 'barn'})} label={'Barnetrygd'} name={'utbetalinger'} value={'barnetrygd'}/>
					<Radio onChange={() => this.setState({utbetalinger: 'onkel'})} label={'Onkel Skrue Penger'} name={'utbetalinger'} value={'onkel'}/>
					<Radio onChange={() => this.setState({utbetalinger: 'begge'})} label={'Barnetrygd og Onkel Skrue Penger'} name={'utbetalinger'} value={'begge'}/>
				</MockDataBolkWrapper>

				<button onClick={() => this.start()} className="mock-egendefinert-GO">GO!</button>
			</div>
		)
	}
}



export default connect((state: State, props: any) => {
	return {

	};
})(EgendefinertBruker);


