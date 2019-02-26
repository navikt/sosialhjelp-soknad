import * as React from "react";
import {addLocaleData, IntlProvider as Provider} from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import NavFrontendSpinner from "nav-frontend-spinner";
import {connect} from "react-redux";
import {LedetekstState} from "./nav-soknad/redux/ledetekster/ledeteksterTypes";
import {DispatchProps, SoknadAppState} from "./nav-soknad/redux/reduxTypes";
import Feilside from "./nav-soknad/components/feilside/Feilside";
import {REST_STATUS} from "./nav-soknad/types";
import {authenticateUser} from "./nav-soknad/redux/authentication/authenticationActions";

addLocaleData(nb);

interface IntlProviderProps {
	children: React.ReactNode;
}

interface StateProps {
	ledetekster: LedetekstState;
	initRestStatus: REST_STATUS;
	linkVisited: boolean;
	harTilgang: boolean;
}

type Props = StateProps & IntlProviderProps & DispatchProps;


class IntlProvider extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.dispatch(authenticateUser());
	}


	render() {
		let { children } = this.props;
		const { initRestStatus, ledetekster } = this.props;
		const locale = "nb";

		if (initRestStatus === REST_STATUS.INITIALISERT ||
			initRestStatus === REST_STATUS.PENDING ||
			(!this.props.harTilgang && !this.props.linkVisited)
		) {
			children = (
				<div className="application-spinner">
					<NavFrontendSpinner type="XXL" />
				</div>
			);
		}

		if (initRestStatus === REST_STATUS.FEILET) {
			children = (
				<Feilside>
					<p>
						Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen
						senere.
					</p>
				</Feilside>
			);
		}

		return (
			<Provider messages={ledetekster.data} defaultLocale="nb" locale={locale}>
				<span>
					{children}
				</span>
			</Provider>
		);
	}
}

export default connect((state: SoknadAppState) => {
	return {
		ledetekster: state.ledetekster,
		initRestStatus: state.init.restStatus,
		linkVisited: state.authentication.linkVisited,
		harTilgang: state.tilgang.harTilgang
	};
})(IntlProvider);
