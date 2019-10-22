import * as React from 'react';
import {connect} from "react-redux";
import {DispatchProps} from "../redux/reduxTypes";
import {State} from "../redux/reducers";
import {Redirect} from "react-router";
import {setLinkVisited} from "../redux/soknad/soknadActions";


interface StateProps {
	linkVisited: boolean;
}

type Props = StateProps & DispatchProps;

class Link extends React.Component<Props, {}> {

	render(){

		this.props.dispatch(setLinkVisited());
		const url = window.location.href;
		const match: RegExpMatchArray | null = url.match(/goto=\/sosialhjelp\/soknad(.+?)(&error_id.*$|$)/);
		let here: string = "/informasjon";
		if (match && match[1]){
			here = match[1];
		}

		return(
			<div className="application-spinner">
				<Redirect to={here}/>
			</div>
		)
	}
}

export default connect((state: State) => {
	return {
		linkVisited: state.soknad.linkVisited,
	};
})(Link);