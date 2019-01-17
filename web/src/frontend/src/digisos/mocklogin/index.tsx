import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";
import { tilMock } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import {getApiBaseUrl, getCookie} from "../../nav-soknad/utils/rest-utils";


export interface StateProps {
	router: any
}

type Props = StateProps & DispatchProps;

interface State {
	uid: string;
}

function mockLogin(payload: object, uid: string) {
	const url = getApiBaseUrl() + "internal/mock/tjeneste/uid";
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "POST",
		credentials: "include",
		body: JSON.stringify(payload)
	};
	return fetch(url, OPTIONS)
		.then((response: Response) => {
			return ;
		});
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
		mockLogin(uidObject, this.state.uid).then(() => {
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

