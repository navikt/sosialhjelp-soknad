import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { State } from "../redux/reducers";
import { REST_STATUS } from "../../nav-soknad/types";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { getIntlTextOrKey, scrollToTop } from "../../nav-soknad/utils";
import Feilside from "../../nav-soknad/components/feilmeldinger/Feilside";

import Bosted from "./Bosted";

import "./start.css";

const DocumentTitle = require("react-document-title");
interface StateProps {
	soknadRestStatus: string;
	faktaRestStatus: string;
}

type Props = StateProps & InjectedIntlProps;

class Start extends React.Component<Props, {}> {
	componentDidMount() {
		scrollToTop();
	}
	render() {
		const { intl, soknadRestStatus, faktaRestStatus } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		if (
			soknadRestStatus === REST_STATUS.FEILET ||
			faktaRestStatus === REST_STATUS.FEILET
		) {
			return (
				<Feilside
					tekst={intl.formatMessage({
						id: "applikasjon.opprettsoknadfeilet"
					})}
				/>
			);
		}
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel />
					<div className="skjema-content">
						<p className="blokk-l">
							{getIntlTextOrKey(intl, "personalia.informasjon")}
						</p>
						<Bosted />
					</div>
				</span>
			</DocumentTitle>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		soknadRestStatus: state.soknad.restStatus,
		faktaRestStatus: state.fakta.restStatus
	};
})(injectIntl(Start));
