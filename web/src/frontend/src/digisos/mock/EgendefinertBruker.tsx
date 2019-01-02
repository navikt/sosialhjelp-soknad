import {connect} from "react-redux";
import * as React from "react";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {State} from "../redux/reducers";
import {Input, Radio} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import NyttArbeidsforhold, {
	ArbeidsforholdType,
	NyttArbeidsforholdObject
} from "./mockComponents/nyttArbeidsforhold";
import * as systemdatamock from "soknadsosialhjelp-systemdatamock";
import { settMockData } from "./mockRestUtils/mockRestUtils";


interface StateProps {
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
	telefonnummer: boolean;
	telefonnummer_value: string;
	bankkonto: boolean;
	bankkonto_value: string;
	organisasjon: boolean;
	organisasjon_orgnummer: string,
	organisasjon_navn: string,
	arbeidsforhold: boolean;
	arbeidsforhold_liste: NyttArbeidsforholdObject[];
}

type Props = StateProps & DispatchProps;


class EgendefinertBruker extends React.Component<Props,StateProps> {

	constructor(props: Props){
		super(props);
		this.state = {
			fornavn: "Jim",
			mellomnavn: "",
			etternavn: "Raynor",
			telefonnummer: false,
			telefonnummer_value: "99887766",
			bankkonto: false,
			bankkonto_value: "12345678903",
			organisasjon: false,
			organisasjon_orgnummer: "123",
			organisasjon_navn: "Team Liquid",
			arbeidsforhold: false,
			arbeidsforhold_liste: []
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
			a.push(<div key={key}>{ this.renderForholdRad(forhold, key) }</div>)
		});
		return (
			<div>{ a }</div>
		)
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


	start(){

		console.warn(this.state.bankkonto_value);

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

		// Sett familie

		// Sett utbetalinger


		// Send alt
		settMockData(systemdatamock.getTelefonPath(), systemdatamock.getTelefonJson());
		settMockData(systemdatamock.getFamiliePath(), systemdatamock.getFamilieJson());
		settMockData(systemdatamock.getBrukerprofilPath(), systemdatamock.getBrukerprofilJson());
		settMockData(systemdatamock.getOrganisasjonPath(), systemdatamock.getOrganisasjonJson());
		settMockData(systemdatamock.getArbeidPath(), systemdatamock.getArbeidJson());



		this.props.dispatch(tilStart());
	}

	render(){

		return(
			<div className="mock-egendefinert-bolk">
				<h2>Egendefinert Bruker</h2>

				<Input onChange={(evt: any) => this.setState({fornavn: evt.target.value})} className="mock-input-felt" label="Fornavn" value={this.state.fornavn} />
				<Input onChange={(evt: any) => this.setState({mellomnavn: evt.target.value})} className="mock-input-felt" label="Mellomnavn" value={this.state.mellomnavn} />
				<Input onChange={(evt: any) => this.setState({etternavn: evt.target.value})} className="mock-input-felt" label="Etternavn" value={this.state.etternavn} />

				{/*<div>*/}
					{/*Midlertidig Adresse:*/}
					{/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Nei})} label='Nei' name='midlertidigPostadresse' value={'nei'} defaultChecked={true} />*/}
					{/*<Radio onChange={() => this.setState({midlertidigPostadresse: Valg.Default})} label='Ja, defaultadresse' name='midlertidigPostadresse' value={'default'} />*/}
				{/*</div>*/}

				<div>
					Telefonnummer:
					<Radio onChange={() => this.setState({telefonnummer: false})} label='Nei' name='telefonnummer' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({telefonnummer: true})} label='Ja' name='telefonnummer' value={'ja'} />
				</div>
				<Collapse isOpened={this.state.telefonnummer}>
					<div className="mock-collapse-body">
						<Input onChange={(evt: any) => this.setState({telefonnummer_value: evt.target.value})} type="tel" label="" value={this.state.telefonnummer_value} />
					</div>
				</Collapse>

				<div>
					Bankkontonummer:
					<Radio onChange={() => this.setState({bankkonto: false})} label='Nei' name='bankkonto' value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({bankkonto: true})} label='Ja' name='bankkonto' value={'ja'} />
				</div>
				<Collapse isOpened={this.state.bankkonto}>
					<div className="mock-collapse-body">
						<Input onChange={(evt: any) => this.setState({bankkonto_value: evt.target.value})} label="" value={this.state.bankkonto_value} />
					</div>
				</Collapse>

				{/*Organisasjon*/}
				<div>
					Organisasjon:
					<Radio onChange={() => this.setState({organisasjon: false})} label="Nei" name="organisasjon" value={'nei'} defaultChecked={true} />
					<Radio onChange={() => this.setState({organisasjon: true})} label='Ja' name='organisasjon' value={'ja'} />
				</div>
				<Collapse isOpened={this.state.organisasjon}>
					<div className='mock-collapse-body'>
						<Input label='orgnummer' onChange={(evt:any) => this.setState({organisasjon_orgnummer: evt.target.value})} value={this.state.organisasjon_orgnummer} />
						<Input label='navn' onChange={(evt:any) => this.setState({organisasjon_navn: evt.target.value})} value={this.state.organisasjon_navn} />
					</div>
				</Collapse>


				{/*Arbeidsforhold*/}
				<div className="mock-view-bolk">
					<div>
						Arbeidsforhold:
						<Radio onChange={() => this.setState({arbeidsforhold: false})} label='Nei' name='arbeidsforhold' value={'nei'} defaultChecked={true} />
						<Radio onChange={() => this.setState({arbeidsforhold: true})} label='Ja' name='arbeidsforhold' value={'ja'} />
					</div>
					<Collapse isOpened={this.state.arbeidsforhold}>
						<div>Liste over arbeidsforhold som er lagt til. </div>
						{ this.settInnListeOverArbeidsforhold()}
						<NyttArbeidsforhold onLeggTilNyttArbeidsforhold={(nyttArbeidsForhold: NyttArbeidsforholdObject) => this.handleLeggTilNyttArbeidsforhold(nyttArbeidsForhold)}/>
					</Collapse>
				</div>


				<button onClick={() => this.start()} className="mock-egendefinert-GO">GO!</button>
			</div>
		)
	}
}



export default connect((state: State, props: any) => {
	return {

	};
})(EgendefinertBruker);


