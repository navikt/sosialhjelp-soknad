import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { State } from "../redux/reducers";
import { REST_STATUS } from "../../nav-soknad/types";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { getIntlTextOrKey, scrollToTop } from "../../nav-soknad/utils";
import ServerFeil from "../../nav-soknad/containers/ServerFeil";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import {
	resetSoknad,
	startSoknad
} from "../../nav-soknad/redux/soknad/soknadActions";

import Bosted from "./Bosted";
import { lesKommuner } from "../../nav-soknad/redux/kommuner/kommuneActions";
import { NavEnhet } from "../data/kommuner";

const DocumentTitle = require("react-document-title");

interface StateProps {
	soknadRestStatus: string;
	faktaRestStatus: string;
	startSoknadPending: boolean;
	kommuner: NavEnhet[];
	kommunerRestStatus: REST_STATUS;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Start extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.startSoknad = this.startSoknad.bind(this);
	}

	componentDidMount() {
		scrollToTop();
		this.props.dispatch(resetSoknad());
		this.props.dispatch(lesKommuner());
	}

	startSoknad(kommuneId: string, bydelId?: string) {
		this.props.dispatch(startSoknad(kommuneId, bydelId));
	}

	render() {
		const { intl, soknadRestStatus, faktaRestStatus } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		if (
			soknadRestStatus === REST_STATUS.FEILET ||
			faktaRestStatus === REST_STATUS.FEILET
		) {
			return <ServerFeil />;
		}
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel />
					<div className="skjema-content">
						<p className="blokk-l">
							{getIntlTextOrKey(intl, "personalia.informasjon")}
						</p>
						<Bosted
							onStartSoknad={this.startSoknad}
							startSoknadPending={this.props.startSoknadPending}
							kommuner={this.props.kommuner}
							kommunerRestStatus={this.props.kommunerRestStatus}
						/>
					</div>
				</span>
			</DocumentTitle>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		soknadRestStatus: state.soknad.restStatus,
		startSoknadPending: state.soknad.startSoknadPending,
		faktaRestStatus: state.fakta.restStatus,
		kommuner: state.kommuner.data,
		kommunerRestStatus: state.kommuner.restStatus
	};
})(injectIntl(Start));
