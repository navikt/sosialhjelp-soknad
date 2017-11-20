import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import NavFrontendSpinner from "nav-frontend-spinner";
import { connect } from "react-redux";
import { LedetekstState } from "./nav-soknad/redux/ledetekster/ledeteksterTypes";
import { DispatchProps, SoknadAppState } from "./nav-soknad/redux/reduxTypes";
import Feilside from "./nav-soknad/components/feilside/Feilside";
import { hentMiljovariabler } from "./nav-soknad/redux/miljovariabler/miljovariablerActions";
import { hentTekster } from "./nav-soknad/redux/ledetekster/ledeteksterActions";
import { hentTilgang } from "./nav-soknad/redux/tilgang/tilgangActions";
import { REST_STATUS } from "./nav-soknad/types";
import { hentFeatureToggles } from "./nav-soknad/redux/featuretoggles/featureTogglesActions";

addLocaleData(nb);

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
		this.props.dispatch(hentTilgang());
		this.props.dispatch(hentTekster());
		this.props.dispatch(hentMiljovariabler());
		this.props.dispatch(hentFeatureToggles());
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
			<Provider messages={ledetekster.data} defaultLocale="nb" locale={locale}>
				{children}
			</Provider>
		);
	}
}

export default connect((state: SoknadAppState) => {
	return {
		ledetekster: state.ledetekster,
		initRestStatus: state.init.restStatus
	};
})(IntlProvider);
