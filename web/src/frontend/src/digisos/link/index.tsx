import * as React from 'react';
import {connect} from "react-redux";
import {State} from "../redux/reducers";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {SynligeFaktaProps} from "../redux/synligefakta/synligeFaktaTypes";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import {Redirect} from "react-router";

type Props = SynligeFaktaProps & DispatchProps & InjectedIntlProps;


class Link extends React.Component<Props, {visSpinner: boolean}> {

	constructor(props: Props){
		super(props);
		this.state = {
			visSpinner: true
		};
	}

	render(){
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

export default connect((state: State, {}) => {
	return {

	};
})(injectIntl(Link));
