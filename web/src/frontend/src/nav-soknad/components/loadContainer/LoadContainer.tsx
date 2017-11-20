import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import ServerFeil from "../feilside/ServerFeil";
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
				<NavFrontendSpinner type="XXL" />
			</div>
		);
	} else if (restStatus === REST_STATUS.FEILET) {
		return <ServerFeil />;
	}
	return <div>{children}</div>;
};

export default LoadContainer;
