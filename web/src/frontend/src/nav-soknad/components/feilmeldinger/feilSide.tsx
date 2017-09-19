import * as React from "react";
import "./feilSide.css";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";

const DocumentTitle = require("react-document-title");

const gaTilbake = () => {
	if (history.length === 1) {
		window.location.href = "https://www.nav.no";
	} else {
		history.back();
	}
};

const FeilSide: React.StatelessComponent<{}> = ({}) => {
	return (
		<DocumentTitle title={"Feilside - " + document.location.hostname}>
			<div className="feilSide">
				<h1>OOPS, NOE GIKK GALT</h1>
				<p>Vi fant ikke siden du prøvde å åpne.</p>
				<div className="feilkode">
					<FormattedMessage id="skjema.feilmeldinger.feilkode"/> 404
				</div>
				<Knapp type="standard" htmlType="button" onClick={gaTilbake}>
					<FormattedMessage id="skjema.feilmeldinger.tilbake"/>
				</Knapp>
			</div>
		</DocumentTitle>
	);
};

export default FeilSide;
