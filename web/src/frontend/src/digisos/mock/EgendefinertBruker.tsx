import {connect} from "react-redux";
import * as React from "react";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {State} from "../redux/reducers";
import {Input, Radio} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";



interface StateProps {
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
	telefonnummer: boolean;
	telefonnummer_value: string;
	bankkonto: boolean;
	bankkonto_value: number;
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
			bankkonto_value: 12345678903
		}
	}


	render(){
		return(
			<div className="mock-egendefinert-bolk">
				<h2>Egendefinert Bruker</h2>

				<Input className="mock-input-felt" label="Fornavn" value={this.state.fornavn} />
				<Input className="mock-input-felt" label="Mellomnavn" value={this.state.etternavn} />
				<Input className="mock-input-felt" label="Etternavn" value={this.state.etternavn} />

				<div>
					Telefonnummer:
					<Radio onClick={() => this.setState({telefonnummer: false})} label='Nei' name='telefonnummer' value={'nei'} defaultChecked={true} />
					<Radio onClick={() => this.setState({telefonnummer: true})} label='Ja' name='telefonnummer' value={'ja'} />
				</div>
				<FadeCollapse isOpened={this.state.telefonnummer}>
					<div>
						<Input label="Telefonnummer" value={this.state.telefonnummer_value} />
					</div>
				</FadeCollapse>

				<div>
					Bankkontonummer:
					<Radio onClick={() => this.setState({bankkonto: false})} label='Nei' name='bankkonto' value={'nei'} defaultChecked={true} />
					<Radio onClick={() => this.setState({bankkonto: true})} label='Ja' name='bankkonto' value={'ja'} />
				</div>
				<Collapse isOpened={this.state.bankkonto}>
					<div>
						<Input label="Telefonnummer" value={this.state.bankkonto_value} />
					</div>
				</Collapse>


				<button className="mock-egendefinert-GO">GO!</button>
			</div>
		)
	}
}

export default connect((state: State, props: any) => {
	return {

	};
})(EgendefinertBruker);


