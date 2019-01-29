import * as React from 'react';
import {connect} from "react-redux";
import {State} from "../redux/reducers";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {SynligeFaktaProps} from "../redux/synligefakta/synligeFaktaTypes";
import {DispatchProps} from "../../nav-soknad/redux/reduxTypes";
import LoadContainer from "../../nav-soknad/components/loadContainer/LoadContainer";
import {REST_STATUS} from "../../nav-soknad/types";

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
		location.href = location.origin + goto;
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
