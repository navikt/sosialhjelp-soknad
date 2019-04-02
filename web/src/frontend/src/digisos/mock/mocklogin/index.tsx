import * as React from "react";
import { connect } from "react-redux";
import {DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";
import { tilMock } from "../../../nav-soknad/redux/navigasjon/navigasjonActions";
import {fetchPost} from "../../../nav-soknad/utils/rest-utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import {settMockIdent} from "../mockReducer";


export interface StateProps {
	router: any
}

type Props = StateProps & DispatchProps;

interface State {
	uid: string;
	loading: boolean;
}

class MockLogin extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			uid: "",
			loading: false
		}
	}

	loginOgGaTilMockSide(){
		this.setState({loading: true});
		const uidObject = {
			uid: this.state.uid
		};
		this.props.dispatch(settMockIdent(this.state.uid));
		fetchPost("internal/mock/tjeneste/uid", JSON.stringify(uidObject)).then(() => {
			this.props.dispatch(tilMock());
		})
	}

	keyPress(e: any){
		if (e.key === "Enter"){
			document.getElementById("login-button").click();
		}
	}

	render() {
		return (
			<div className="mock-body">
				<div className="mock-login-wrapper">
					<div className="advarsel-block">
						DETTE ER KUN FOR TESTING! Data du legger inn her er tilgjengelig for alle. Ikke legg inn noe sensitiv informasjon!
					</div>
					<h2>Mock Login</h2>
					<div>Velg en tilfeldig ID</div>
					<input onKeyPress={this.keyPress} value={this.state.uid} onChange={(evt: any) => this.setState({uid: evt.target.value})}  />
					{ !this.state.loading &&
					<div>
						<button id="login-button" onClick={() => this.loginOgGaTilMockSide()} className="mock-egendefinert-GO">Login</button>
					</div>
					}
					{ this.state.loading &&
					<div>
						<button className="mock-egendefinert-GO-loading">Login</button>
						<NavFrontendSpinner type="XS" />
					</div>
					}
				</div>
			</div>
		);
	}
}

export default connect((state: StateProps) => ({
	router: state.router
}))(MockLogin);

