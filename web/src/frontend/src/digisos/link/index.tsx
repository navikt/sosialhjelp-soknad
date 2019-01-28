import * as React from 'react';
import {connect} from "react-redux";
import {State} from "../redux/reducers";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {SynligeFaktaProps} from "../redux/synligefakta/synligeFaktaTypes";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import LoadContainer from "../../nav-soknad/components/loadContainer/LoadContainer";
import {REST_STATUS} from "../../nav-soknad/types";
import {hostAdresseLocal} from "../../nav-soknad/utils/rest-utils";

type Props = SynligeFaktaProps & DispatchProps & InjectedIntlProps;


class Link extends React.Component<Props, {visSpinner: boolean}> {

	constructor(props: Props){
		super(props);
		this.state = {
			visSpinner: true
		};
	}

	componentDidMount(){
		const url = new URL(window.location.href);
		const goto = url.searchParams.get("goto");
		const host = window.location.host;

		if (goto) {
			if(host === hostAdresseLocal){
				location.href = "http://" + window.location.host + goto;
			} else {
				location.href = "https://" + window.location.host + goto;
			}
		} else {
			if(host === hostAdresseLocal){
				location.href = "http://" + window.location.host + "/soknadsosialhjelp/informasjon";
			} else {
				location.href = "https://" + window.location.host + "/soknadsosialhjelp/informasjon";
			}
		}
	}

	render(){
		return(
			<LoadContainer restStatus={REST_STATUS.PENDING} />
		)
	}
}

export default connect((state: State, {}) => {
	return {

	};
})(injectIntl(Link));
