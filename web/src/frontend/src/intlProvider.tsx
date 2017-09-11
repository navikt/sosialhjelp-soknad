import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import NavFrontendSpinner from "nav-frontend-spinner";
import { connect } from "react-redux";
import { hentLedetekster } from "./digisos/redux/informasjon/informasjonActions";
import {
	ActionTypeKeys,
	LedetekstState
} from "./digisos/redux/informasjon/informasjonTypes";
import { DispatchProps } from "./nav-soknad/redux/types";

addLocaleData(nb);

interface IntlProviderProps {
	children: React.ReactNode;
}

class IntlProvider extends React.Component<
	IntlProviderProps & DispatchProps & LedetekstState
> {
	componentDidMount() {
		const visNokler = window.location.search.match(/vistekster=true/) !== null;
		this.props.dispatch(hentLedetekster(visNokler));
	}

	render() {
		let { children } = this.props;
		const { ledetekster } = this.props;
		const locale = "nb";

		if (ledetekster.status !== ActionTypeKeys.OK) {
			children = (
				<div className="application-spinner">
					<NavFrontendSpinner storrelse="xxl" />
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

export default connect((state: LedetekstState) => {
	return {
		ledetekster: state.ledetekster
	};
})(IntlProvider);
