import * as React from "react";
import { Select } from "nav-frontend-skjema";

interface Props {
	onLeggTilNyttArbeidsforhold: (data: any) => void;
}

interface State {
	isOpened: boolean,
	type: ArbeidsforholdType,
	startDato: string,
	sluttDato: string,
	stillingsProsent: string,
	navn: string,
	arbeidsgivernummer: string,
	ident: string,
	orgnummer: string
}


export enum ArbeidsforholdType {
	NAVN = "navn",
	IDENT = "ident",
	ORGANISASJON  = "organisasjon"
}

export interface NyttArbeidsforholdObject {
	"type" : string,
	"startDato": string,
	"sluttDato": string,
	"stillingsProsent": string,
	"navn": string,
	"arbeidsgivernummer": string,
	"ident": string,
	"orgnummer": string
}

class NyttArbeidsforhold extends React.Component<Props, State> {

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			type: ArbeidsforholdType.NAVN,
			startDato: "2018-01-01",
			sluttDato: "2018-02-01",
			stillingsProsent: "100",
			navn: "Historisk arbeidsgiver",
			arbeidsgivernummer: "arbeidsgivernummer",
			ident: "12345678901",
			orgnummer: "123"
		}
	}

	lagreNyttArbeidsforhold(){

		const nyttArbeidsforholdObject: NyttArbeidsforholdObject = {
			"type" : this.state.type,
			"startDato": this.state.startDato,
			"sluttDato": this.state.sluttDato,
			"stillingsProsent": this.state.stillingsProsent,
			"navn": this.state.navn,
			"arbeidsgivernummer": this.state.arbeidsgivernummer,
			"ident": this.state.ident,
			"orgnummer": this.state.orgnummer
		};

		this.props.onLeggTilNyttArbeidsforhold(nyttArbeidsforholdObject);
		this.setState({isOpened: false})
	}


	render(){
		if (this.state.isOpened) {
			return (
				<div>
					<div className="mock-newThing-tittel">Legg til nytt arbeidsforhold:</div>
					<div className="mock-newThing">
						<div>
							<label className="mock-label">Startdato: </label>
							<input onChange={(evt: any) => this.setState({startDato: evt.target.value})} className="mock-input-felt" value={this.state.startDato} />
						</div>
						<div>
							<label className="mock-label">Sluttdato: </label>
							<input onChange={(evt: any) => this.setState({sluttDato: evt.target.value})} className="mock-input-felt" value={this.state.sluttDato} />
						</div>
						<div>
							<label className="mock-label">Stillingsprosent: </label>
							<input onChange={(evt: any) => this.setState({stillingsProsent: evt.target.value})} className="mock-input-felt" value={this.state.stillingsProsent} />
						</div>

						<Select label='Velg type arbeidsforhold' onChange={(event: any) => this.setState({type: event.target.value})}>
							<option value={ArbeidsforholdType.NAVN} key={ArbeidsforholdType.NAVN}>
								Arbeidsgiver med navn og arbeidsgivernummer
							</option>
							<option value={ArbeidsforholdType.IDENT} key={ArbeidsforholdType.IDENT}>
								Arbeidsgiver med ident
							</option>
							<option value={ArbeidsforholdType.ORGANISASJON} key={ArbeidsforholdType.ORGANISASJON}>
								Arbeidsgiver med orgnummer
							</option>
						</Select>

						{ this.state.type === ArbeidsforholdType.NAVN &&
							<div>
								<div>
									<label className="mock-label">Navn: </label>
									<input onChange={(evt: any) => this.setState({navn: evt.target.value})} className="mock-input-felt" value={this.state.navn} />
								</div>
								<div>
									<label className="mock-label">Arbeidsgivernummer: </label>
									<input onChange={(evt: any) => this.setState({arbeidsgivernummer: evt.target.value})} className="mock-input-felt" value={this.state.arbeidsgivernummer} />
								</div>
							</div>
						}

						{ this.state.type === ArbeidsforholdType.IDENT &&
							<div>
								<label className="mock-label">Ident: </label>
								<input onChange={(evt: any) => this.setState({ident: evt.target.value})} className="mock-input-felt" value={this.state.ident} />
							</div>
						}

						{ this.state.type === ArbeidsforholdType.ORGANISASJON &&
							<div>
								<label className="mock-label">Orgnummer </label>
								<input onChange={(evt: any) => this.setState({orgnummer: evt.target.value})} className="mock-input-felt" value={this.state.orgnummer} />
							</div>
						}
						<button onClick={() => this.lagreNyttArbeidsforhold()}>Legg til</button>
						<button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
					</div>
				</div>

			)
		}

		return (
			<button onClick={() => this.setState({isOpened: true})}>+</button>
		)
	}
}

export default NyttArbeidsforhold;