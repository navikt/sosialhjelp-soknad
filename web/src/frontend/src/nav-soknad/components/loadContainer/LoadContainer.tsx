import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import Feilside from "../feilside/Feilside";

import { REST_STATUS } from "../../types";

interface Props {
	restStatus: string;
}

const LoadContainer: React.StatelessComponent<Props & InjectedIntlProps> = ({
	restStatus,
	children,
	intl
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
			<Feilside>
				{intl.formatMessage({ id: "applikasjon.ukjentfeilunderhentdata" })}
			</Feilside>
		);
	}
	return <div>{children}</div>;
};

export default injectIntl(LoadContainer);
