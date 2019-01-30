import * as React from 'react';
import {connect} from "react-redux";
import {State} from "../redux/reducers";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {SynligeFaktaProps} from "../redux/synligefakta/synligeFaktaTypes";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {setAuthenticated} from "../../nav-soknad/redux/authentication/authenticationActions";
import NavFrontendSpinner from "nav-frontend-spinner";

type Props = SynligeFaktaProps & DispatchProps & InjectedIntlProps;


class Link extends React.Component<Props, {visSpinner: boolean}> {

	constructor(props: Props){
		super(props);
		this.state = {
			visSpinner: true
		};
	}

	componentDidMount(){
		this.props.dispatch(setAuthenticated);
		const url = new URL(window.location.href);
		const goto = url.searchParams.get("goto");
		location.href = location.origin + goto;
	}

	render(){
		return(
			<div className="application-spinner">
				<NavFrontendSpinner type="XXL" />
			</div>
		)
	}
}

export default connect((state: State, {}) => {
	return {

	};
})(injectIntl(Link));
