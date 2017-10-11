import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { getIntlTextOrKey, scrollToTop } from "../../nav-soknad/utils";

import Bosted from "./Bosted";

import "./start.css";

const DocumentTitle = require("react-document-title");

class Start extends React.Component<InjectedIntlProps, {}> {
	componentDidMount() {
		scrollToTop();
	}
	render() {
		const intl = this.props.intl;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel />
					<div className="skjema-content">
						<p className="blokk-l">
							{ getIntlTextOrKey(intl, "personalia.informasjon") }
						</p>
						<Bosted />
					</div>
				</span>
			</DocumentTitle>
		);
	}
}

export default injectIntl(Start);
