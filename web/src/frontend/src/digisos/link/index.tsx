import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../nav-soknad/redux/reduxTypes";
import {Redirect} from "react-router";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {REST_STATUS} from "../../nav-soknad/types";
import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";
import {loggFeil} from "../../nav-soknad/redux/navlogger/navloggerActions";

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

	constructor(props: Props){
		super(props);
		this.props.dispatch(setLinkVisited());
	}


	render(){
		const url = new URL(window.location.href);
		let urlPath = url.searchParams.get("goto");
		const contextPath = "sosialhjelp/soknad";
		const regexp = new RegExp("/" + contextPath);
		urlPath = urlPath.replace(regexp,"");
		const validationRegexp = new RegExp("^([a-zA-Z]*[/]*)*$")
		const isValidPath = validationRegexp.test(urlPath);

		if (!isValidPath){
			loggFeil("Ulovlig goto parameter: " + urlPath);
		}

		return(
			<div className="application-spinner">
				<Redirect to={isValidPath ? urlPath : "/serverfeil"}/>
			</div>
		)
	}
}

export default connect((state: SoknadAppState) => {
	return {
		linkVisited: state.authentication.linkVisited,
	};
})(Link);
