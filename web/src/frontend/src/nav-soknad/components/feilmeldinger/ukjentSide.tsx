import * as React from "react";
import Info from "../svg/Info";
import { Panel } from "nav-frontend-paneler";
import { FormattedMessage } from "react-intl";

const UkjentSide: React.StatelessComponent<{}> = ({}) => {
	return (
		<Panel className="skjema-infoblokk">
			<div className="skjema-infoblokk__content">
				<div className="skjema-infoblokk__icon">
					<Info />
				</div>
				<h1><FormattedMessage id="skjema.feilmeldinger.feil"/></h1>
				<FormattedMessage id="skjema.feilmeldinger.404"/>
			</div>
		</Panel>
	);
};

export default UkjentSide;
