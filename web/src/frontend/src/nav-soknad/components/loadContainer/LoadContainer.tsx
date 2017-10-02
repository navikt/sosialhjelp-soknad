import * as React from "react";
import { FormattedMessage } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";

import { REST_STATUS } from "../../types";

interface Props {
	restStatus: string;
}

const LoadContainer: React.StatelessComponent<Props> = ({
	restStatus,
	children
}) => {
	if (
		restStatus === REST_STATUS.INITIALISERT ||
		restStatus === REST_STATUS.PENDING
	) {
		return (
			<div className="application-spinner">
				<NavFrontendSpinner storrelse="xxl" />
			</div>
		);
	} else if (restStatus === REST_STATUS.FEILET) {
		return (
			<p>
				<FormattedMessage id="applikasjon.ukjentfeilunderhentdata" />
			</p>
		);
	}
	return <div>{children}</div>;
};

export default LoadContainer;
