import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../nav-soknad/redux/reduxTypes";
import {Redirect} from "react-router";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {REST_STATUS} from "../../nav-soknad/types";
import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";

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

		const url = new URL(window.location.href);
		let urlPath = url.searchParams.get("goto");
		const contextPath = "soknadsosialhjelp";
		const regexp = new RegExp("/" + contextPath);
		urlPath = urlPath.replace(regexp,"");

		return(
			<div className="application-spinner">
				<Redirect to={urlPath}/>
			</div>
		)
	}
}

export default connect((state: SoknadAppState) => {
	return {
		linkVisited: state.authentication.linkVisited,
	};
})(Link);