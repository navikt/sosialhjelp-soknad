import * as React from "react";
import { IntlProvider as Provider } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import { connect } from "react-redux";
import { LedetekstState } from "./nav-soknad/redux/ledetekster/ledeteksterTypes";
import { DispatchProps } from "./nav-soknad/redux/reduxTypes";
import Feilside from "./nav-soknad/components/feilside/Feilside";
import { REST_STATUS } from "./nav-soknad/types";
import {State} from "./digisos/redux/reducers";
import {initStart} from "./nav-soknad/redux/init/initActions";

interface IntlProviderProps {
	children: React.ReactNode;
}

interface StateProps {
	ledetekster: LedetekstState;
	initRestStatus: REST_STATUS;
}

type Props = StateProps & IntlProviderProps & DispatchProps;

class IntlProvider extends React.Component<Props, {}> {
	componentDidMount() {
		this.props.dispatch(initStart());
	}

	render() {
		let { children } = this.props;
		const { initRestStatus, ledetekster } = this.props;
		const locale = "nb";

		if (initRestStatus === REST_STATUS.FEILET) {
			/** I og med tekstressurser ikke er tilgjengelig, må tekster hardkodes */
			children = (
				<Feilside>
					<p>
						Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen
						senere.
					</p>
				</Feilside>
			);
		} else if (initRestStatus !== REST_STATUS.OK) {
			children = (
				<div className="application-spinner">
					<NavFrontendSpinner type="XXL" />
				</div>
			);
		}
		return (
			<Provider messages={ledetekster.data ? ledetekster.data : ""} defaultLocale="nb" locale={locale}>
				{children}
			</Provider>
		);
	}
}

export default connect((state: State) => {
	return {
		ledetekster: state.ledetekster,
		initRestStatus: state.init.restStatus
	};
})(IntlProvider);
