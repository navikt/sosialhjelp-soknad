import * as React from "react";
import * as PropTypes from "prop-types";
import { Router, Route } from "react-router";
import App from "../containers/App";
import Start from "../containers/Start";
import Skjema from "../containers/Skjema";
import Vedlegg from "../containers/Vedlegg";
import Henvis from "../containers/Henvis";

const AppRouter = ({ history }: any) => {
	return (
		<Router history={history}>
			<App>
				<Route exact={true} path="/" component={Start} />
				<Route path="/skjema" component={Skjema} />
				<Route path="/vedlegg" component={Vedlegg} />
				<Route path="/henvis" component={Henvis} />
			</App>
		</Router>
	);
};

(AppRouter as any).propTypes = {
	history: PropTypes.object.isRequired
};

export default AppRouter;
