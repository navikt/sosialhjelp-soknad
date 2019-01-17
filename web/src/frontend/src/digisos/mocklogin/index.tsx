import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";
import { tilMock } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import {fetchPost} from "../../nav-soknad/utils/rest-utils";


export interface StateProps {
	router: any
}

type Props = StateProps & DispatchProps;

interface State {
	uid: string;
}

class MockLogin extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			uid: ""
		}
	}

	gaaTilMockSide(){
		const uidObject = {
			uid: this.state.uid
		};
		fetchPost("internal/mock/tjeneste/uid", JSON.stringify(uidObject)).then(() => {
			console.warn("aksjfdb");
			this.props.dispatch(tilMock());
		})
	}

	render() {
		return (
			<div>
				<h2>Mock Login</h2>
				<div>Sett et tilfeldig fødselsnummer (11 siffer) som du vil logge inn på. Ikke bruk ditt eget. Bare putt inn 11 helt tilfeldige siffer.</div>
				<input value={this.state.uid} onChange={(evt: any) => this.setState({uid: evt.target.value})}  />
				<button onClick={() => this.gaaTilMockSide()}>Gå videre</button>
			</div>
		);
	}
}

export default connect((state: StateProps) => ({
	router: state.router
}))(MockLogin);

