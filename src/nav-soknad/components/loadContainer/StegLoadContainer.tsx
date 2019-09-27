import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import ServerFeil from "../../containers/ServerFeil";
import {REST_STATUS} from "../../../digisos/redux/soknad/soknadTypes";

interface Props {
	restStatus: REST_STATUS;
	contentRenderer?: () => React.ReactNode;
}

const StegLoadContainer: React.FC<Props> = ({
	restStatus,
	contentRenderer,
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
	return <div>{contentRenderer ? contentRenderer() : children}</div>;
};

export default StegLoadContainer;
