import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {Redirect} from "react-router";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {REST_STATUS} from "../../nav-soknad/types";
import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";
import {State} from "../redux/reducers";

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

	render(){

		this.props.dispatch(setLinkVisited());

		console.warn("Test start: før regex og dispatch.");
		const url: URL = new URL(window.location.href);
		let urlPath: string | null = url.searchParams.get("goto");
		const contextPath = "sosialhjelp/soknad";
		const regexp = new RegExp("/" + contextPath);
		urlPath = urlPath ? urlPath.replace(regexp,"") : "/informasjon";

		console.warn("Test start: etter regex og dispatch.");


		return(
			<div className="application-spinner">
				<Redirect to={urlPath ? urlPath : "/informasjon"}/>
			</div>
		)
	}
}

export default connect((state: State) => {
	return {
		linkVisited: state.authentication.linkVisited,
	};
})(Link);