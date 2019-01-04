import * as React from 'react';
import {Input, Radio} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";

interface Props {
	onLeggTilNyttBarn: (data: any) => void;
}

interface State {
	isOpened: boolean;
	ident: string;
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
	sammeBostedsadresse: boolean;
	doedsdato: boolean,
	doedsdato_value: string;
}

export interface NyttBarnObject {
	ident: string;
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
	sammeBostedsadresse: boolean;
	doedsdato: boolean;
	doedsdato_value: string;
}

export class NyttBarn extends React.Component<Props, State>{


	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			ident: "01010591736",
			fornavn: "Anakin",
			mellomnavn: "",
			etternavn: "Skywalker",
			sammeBostedsadresse: true,
			doedsdato: false,
			doedsdato_value: "2000-01-01"
		}
	}

	lagreNyttBarn(){

		const nyttBarnObject: NyttBarnObject = {
			ident: this.state.ident,
			fornavn: this.state.fornavn,
			mellomnavn: this.state.mellomnavn,
			etternavn: this.state.etternavn,
			sammeBostedsadresse: this.state.sammeBostedsadresse,
			doedsdato: this.state.doedsdato,
			doedsdato_value: this.state.doedsdato_value
		};

		this.props.onLeggTilNyttBarn(nyttBarnObject);
		this.setState({isOpened: false})
	}


	render(){
		if (this.state.isOpened) {
			return (
				<div>
					Legg til nytt barn:
					<Input onChange={(evt: any) => this.setState({ident: evt.target.value})} className="mock-input-felt" label="Fødselsnummer" value={this.state.ident} />
					<Input onChange={(evt: any) => this.setState({fornavn: evt.target.value})} className="mock-input-felt" label="Fornavn" value={this.state.fornavn} />
					<Input onChange={(evt: any) => this.setState({mellomnavn: evt.target.value})} className="mock-input-felt" label="Mellomnavn" value={this.state.mellomnavn} />
					<Input onChange={(evt: any) => this.setState({etternavn: evt.target.value})} className="mock-input-felt" label="Etternavn" value={this.state.etternavn} />
					Har samme bostedsadresse:
					<Radio label={'Ja'} name={'bostedsadresse'} value={'ja'} onChange={() => this.setState({sammeBostedsadresse: true})} defaultChecked={true}/>
					<Radio label={'Nei'} name={'bostedsadresse'} value={'nei'} onChange={() => this.setState({sammeBostedsadresse: false})}/>
					Har dødsdato:
					<Radio label={'Nei'} name={'doedsdato'} value={'nei'} onChange={() => this.setState({doedsdato: false})} defaultChecked={true}/>
					<Radio label={'Ja'} name={'doedsdato'} value={'ja'} onChange={() => this.setState({doedsdato: true})}/>
					<Collapse isOpened={this.state.doedsdato}>
						<Input onChange={(evt: any) => this.setState({doedsdato_value: evt.target.value})} label='DødsDato' value={this.state.doedsdato_value} />
					</Collapse>


					<button onClick={() => this.lagreNyttBarn()}>Ok</button>
					<button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
				</div>

			)
		}

		return (
			<button onClick={() => this.setState({isOpened: true})}>+</button>
		)
	}

}