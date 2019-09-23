import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
// import {Redirect} from "react-router";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {REST_STATUS} from "../../nav-soknad/types";
// import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";
import {State} from "../redux/reducers";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";
// import {push} from "connected-react-router";

interface IntlProviderProps {
	children: React.ReactNode;
}

interface StateProps {
	ledetekster: LedetekstState;
	initRestStatus: REST_STATUS;
	linkVisited: boolean;
}

type Props = StateProps & DispatchProps & IntlProviderProps;

class Link extends React.Component<Props, {}> {

	componentDidMount(): void {

		const url: URL = new URL(window.location.href);
		let urlPath: string | null = url.searchParams.get("goto");
		const contextPath = "sosialhjelp/soknad";
		const regexp = new RegExp("/" + contextPath);
		urlPath = urlPath ? urlPath.replace(regexp,"") : "/informasjon";


		console.warn("urlPath = " + urlPath);

		this.props.dispatch(tilStart());
	}

	render(){

		this.props.dispatch(setLinkVisited());

		console.warn("Test start: før regex og dispatch.");

		return(
			<div className="application-spinner">
				Du har blitt redirecta tilbake til søknaden etter å ha logget inn.
				Skal nå redirectes til /sosialhjelp/soknad/informasjon
				{/*<Redirect to={urlPath ? urlPath : "/informasjon"}/>*/}
			</div>
		)
	}
}

export default connect((state: State) => {
	return {
		linkVisited: state.authentication.linkVisited,
	};
})(Link);