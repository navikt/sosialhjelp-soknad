import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {REST_STATUS} from "../../nav-soknad/types";
import {State} from "../redux/reducers";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import {setLinkVisited} from "../../nav-soknad/redux/authentication/authenticationActions";
import {Redirect} from "react-router";

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
		const url = window.location.href;
		const match: RegExpMatchArray | null = url.match(/goto=\/sosialhjelp\/soknad(.+)$/);
		let here: string = "/informasjon";
		if (match && match[1]){
			here = match[1];
		}
		
		return(
			<div>
				Du har blitt redirecta tilbake til søknaden etter å ha logget inn.
				Skal nå redirectes til /sosialhjelp/soknad/informasjon
				<Redirect to={here}/>
			</div>
		)
	}
}

export default connect((state: State) => {
	return {
		linkVisited: state.authentication.linkVisited,
	};
})(Link);