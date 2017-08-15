import * as React from "react";
import * as PropTypes from "prop-types";
import { Router, Route } from "react-router";
import App from "../containers/App";
import Start from "../containers/Start";
import Skjema from "../soknadsskjema";

const AppRouter = ({ history }: any) => {
	return (
		<Router history={history}>
			<App>
				<Route exact={true} path="/" component={Start} />
				<Route path="/skjema" component={Skjema} />
			</App>
		</Router>
	);
};

(AppRouter as any).propTypes = {
	history: PropTypes.object.isRequired
};

export default AppRouter;
